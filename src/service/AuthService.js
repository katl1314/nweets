import { authService } from "fbase";

export const authStateChanged = (setLoggedIn, setUserObj, setInit) => {
    authService.onAuthStateChanged((user) => {
        if (user) {
            // 만약 로그인이 되어 있으면 user정보를 setLoggedIn의 인자로 전달. => 사이즈를 줄이기 위해 boolean타입으로 대체함.
            setLoggedIn(true);
            const { uid, displayName } = user;
            // 리액트는 state와 props의 내용물이 많으면 조그만 변화를 인식하지 못하기 때문에, 값을 최대한 줄여보자.
            setUserObj({
                uid,
                displayName,
                updateProfile: (args) => user.updateProfile(args),
            }); // 로그인이 되었으면 유저정보를 저장함.
        } else {
            // 로그인이 되어있지 않으면 false를 인자로 전달.
            setLoggedIn(false);
        }
        // setInit에 true가 발생하면 Initializing...문구를 삭제한다.
        setInit(true); // 처음 useEffect가 발생하면 setInit에 true전달.
    });
};

export const logout = () => {
    // firebase auth에서 로그아웃은 다음과 같이 처리한다.
    // firebase.auth().signOut();
    authService.signOut();
};
