import { authService, firebaseInstance } from "fbase";
import AuthForm from "components/factory/AuthForm";
const Auth = () => {
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
            await authService.signInWithPopup(provider);
            // 로그인을 성공하면 데이터를 반환함.
            // {operationType: 'signIn', credential: OAuthCredential, additionalUserInfo: GoogleAdditionalUserInfo, user: User}
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <AuthForm />
            <div>
                <button name="google" onClick={handlerClickSocialLogin}>
                    Continue with Google
                </button>
                <button name="github" onClick={handlerClickSocialLogin}>
                    Continue with GitHub
                </button>
            </div>
        </>
    );
};

export default Auth;
