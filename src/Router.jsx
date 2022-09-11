import { HashRouter, Route, Routes } from "react-router-dom";
import { Home, Auth } from "./routes";
import Navigator from "./components/Navigator";
import styled from "styled-components";

const Router = ({ isLoggedIn }) => {
    // useState 훅 사용 => 상태 관리
    // isLoggedIn의 상태에 따라 표시되는 컴포넌트는 다르다!
    return (
        <HashRouter>
            <Navigator />
            <View
                children={
                    <Routes>
                        {!isLoggedIn ? (
                            <Route path="/" element={<Auth />} exact />
                        ) : (
                            <>
                                <Route path="/" element={<Home />} exact />
                            </>
                        )}
                    </Routes>
                }
            />
        </HashRouter>
    );
};

const View = ({ children }) => {
    return <WrapView>{children}</WrapView>;
};

const WrapView = styled.div`
    width: 80%;
    padding: 1%;
`;

export default Router;
