import { useState } from "react";
import { authService } from "fbase";

const AuthForm = () => {
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
            const email = event.target.email.value;
            const password = event.target.password.value;
            if (newAccount) {
                // create newAccount
                // 패스워드는 6자리 이상: FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password).
                // 이미 계정을 가지고 있으면 에러 발생: Firebase: The email address is already in use by another account. (auth/email-already-in-use).
                await authService.createUserWithEmailAndPassword(
                    email,
                    password
                );
            } else {
                // sign-in(로그인)
                await authService.signInWithEmailAndPassword(email, password);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const handlerToggle = () => {
        // Not연산자를 클릭시 true -> false, false -> true으로 변경한다.
        setNewAccount(!newAccount);
    };

    return (
        <>
            <form onSubmit={handlerLogin} className="container">
                <div>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="email"
                        value={email}
                        onChange={handlerChange}
                        className="authInput"
                    />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password"
                        value={password}
                        onChange={handlerChange}
                        className="authInput"
                    />
                </div>
                <div>
                    <input
                        type="submit"
                        value={newAccount ? "Create Account" : "Login"}
                        className="authSubmit authInput"
                    />
                </div>
                {error && <p className="authError">{error}</p>}
                <span onClick={handlerToggle} className="authSwitch">
                    {newAccount ? "Sign in" : "Create Account"}
                </span>
            </form>
        </>
    );
};

export default AuthForm;
