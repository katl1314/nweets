import { authService, firebaseInstance } from "fbase";
import AuthForm from "components/factory/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faGoogle,
    faGithub,
} from "@fortawesome/free-brands-svg-icons"; // google, github 아이콘

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
        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                size="4x"
                color="#04AAFF"
                style={{ marginBottom: 30 }}
            />
            <AuthForm />
            <div className="authBtns">
                <button
                    name="google"
                    className="authBtn"
                    onClick={handlerClickSocialLogin}
                >
                    <FontAwesomeIcon size="xl" icon={faGoogle} />
                </button>
                <button
                    name="github"
                    className="authBtn"
                    onClick={handlerClickSocialLogin}
                >
                    <FontAwesomeIcon size="xl" icon={faGithub} />
                </button>
            </div>
        </div>
    );
};

export default Auth;
