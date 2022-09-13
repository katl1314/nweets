import { useState } from "react";
import { authService, firebaseInstance } from "fbase";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState(""); // 에러 처리 위한 상태값.
    const handlerChange = (event) => {
        // React에서 초기값을 설정하면 반드시 state를 업데이트 해야함.
        const { name, value } = event.target; // 객체 디스트럭처링하여 name, value추출
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const handlerLogin = async (event) => {
        // event.target중 id가 email, password인 DOM 추출
        event.preventDefault(); // 이벤트 기본 동작 제어
        try {
            let data;
            const email = event.target.email.value;
            const password = event.target.password.value;
            if (newAccount) {
                // create newAccount
                // 패스워드는 6자리 이상: FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password).
                // 이미 계정을 가지고 있으면 에러 발생: Firebase: The email address is already in use by another account. (auth/email-already-in-use).
                // nogoso3@gmail.com, 123456
                data = await authService.createUserWithEmailAndPassword(
                    email,
                    password
                );
            } else {
                // log in
                data = await authService.signInWithEmailAndPassword(
                    email,
                    password
                );
            }
            console.log(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const handlerToggle = () => {
        // Not연산자를 클릭시 true -> false, false -> true으로 변경한다.
        setNewAccount(!newAccount);
    };

    // 소셜 로그인
    const handlerClickSocialLogin = async (event) => {
        try {
            const type = event.target.name;
            // 소셜 로그인을 위해 firebase를 export함.

            let provider;
            if (type === "google") {
                // 구글 소셜 로그인을 위한 provider
                provider = new firebaseInstance.auth.GoogleAuthProvider();
            } else if (type === "github") {
                // 깃허브 소셜 로그인을 위한 provider
                provider = new firebaseInstance.auth.GithubAuthProvider();
            }
            // signWithPopup함수를 호출하여 소셜 로그인을 완성한다.
            // authService.signInWithPopup은 비동기 작업이므로 async-await으로 처리하자.
            // firebase.auth().signInWithPopup
            const data = await authService.signInWithPopup(provider);
            // 로그인을 성공하면 데이터를 반환함.
            // {operationType: 'signIn', credential: OAuthCredential, additionalUserInfo: GoogleAdditionalUserInfo, user: User}
            console.log(data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <form onSubmit={handlerLogin}>
                <h1 style={{ fontSize: "30px", fontWeight: "bold" }}>Login</h1>
                <div>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="email"
                        value={email}
                        onChange={handlerChange}
                    />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password"
                        value={password}
                        onChange={handlerChange}
                    />
                    <input
                        type="submit"
                        value={newAccount ? "Create Account" : "Login"}
                    />
                </div>
                {error && <p>{error}</p>}
            </form>
            <span onClick={handlerToggle}>
                {newAccount ? "Sign in" : "Create Account"}
            </span>
            <div>
                <button name="google" onClick={handlerClickSocialLogin}>
                    Continue with Google
                </button>
                <button name="github" onClick={handlerClickSocialLogin}>
                    Continue with GitHub
                </button>
            </div>
        </div>
    );
};

export default Auth;
