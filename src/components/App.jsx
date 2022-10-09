import Router from "Router";
import styled from "styled-components";
import { useState, createContext, useEffect } from "react";
import * as AuthService from "service/AuthService";
import { authService } from "fbase";
import useUser from "hooks/useUser";

export const MyContext = createContext();
function App() {
    // firebase.auth().currentUser가 null이면 미로그인 상태
    const [init, setInit] = useState(false);
    const [{ isLoggedIn, userObj }, handlerLoggedIn, handlerUserObj] = useUser();

    const refreshUser = () => {
        // firebase에 저장된 사용자 정보는 firebase.auth().currentUser를 통해 반환가능.
        const { uid, displayName, photoURL } = authService.currentUser;
        handlerUserObj({
            uid,
            displayName,
            photoURL,
            updateProfile: (args) =>
                authService.currentUser.updateProfile(args),
        });
    };

    useEffect(() => {
        // 로그인 완료 여부 authService.currentUser를 통해 확인 가능.
        AuthService.authStateChanged(handlerLoggedIn, handlerUserObj, setInit);
    }, []);

    return (
        <>
            {!init ? (
                <p>Initializing...</p>
            ) : (
                <WrapApp>
                    <Router
                        isLoggedIn={isLoggedIn}
                        userObj={userObj}
                        refreshUser={refreshUser}
                    />
                </WrapApp>
            )}

            <Footer />
        </>
    );
}

// 컴포넌트에서 변수를 사용하기 위해서는 중괄를 이용하자.
const Footer = () => {
    return <footer>&copy; {new Date().getFullYear()} Nuitter</footer>;
};

const WrapApp = styled.div`
    display: flex;
    justify-content: center;
`;

export default App;
