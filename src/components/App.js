import Router from "Router";
import styled from "styled-components";
import { useState, createContext, useEffect } from "react";
import { authService } from "fbase";

export const MyContext = createContext();
function App() {
    // firebase.auth().currentUser가 null이면 미로그인 상태
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [init, setInit] = useState(false);
    // useEffect : 특정한 시점에 콜백함수를 실행하는 Hook
    // useEffect의 두번째 인자를 통해 배열이 공백이면 최초 한번 실행
    // 배열에 state가 정의되어 있으면 state가 update될때 실행함.
    useEffect(() => {
        // 로그인 완료 여부 authService.currentUser를 통해 확인 가능.
        authService.onAuthStateChanged((user) => {
            if (user) {
                // 만약 로그인이 되어 있으면 user정보를 setLoggedIn의 인자로 전달.
                setLoggedIn(user);
            } else {
                // 로그인이 되어있지 않으면 false를 인자로 전달.
                setLoggedIn(false);
            }
            // setInit에 true가 발생하면 Initializing...문구를 삭제한다.
            setInit(true); // 처음 useEffect가 발생하면 setInit에 true전달.
        });
    }, []);
    return (
        <>
            {!init && <p>Initializing...</p>}
            <WrapApp>
                <Router isLoggedIn={isLoggedIn} />
            </WrapApp>
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
`;

export default App;
