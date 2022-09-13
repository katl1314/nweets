import { HashRouter, Route, Routes } from "react-router-dom";
import { Home, Auth, Profile } from "./routes";
import Navigator from "./components/Navigator";
import styled from "styled-components";

const Router = ({ isLoggedIn }) => {
    // useState 훅 사용 => 상태 관리
    // isLoggedIn의 상태에 따라 표시되는 컴포넌트는 다르다!

    return (
        <HashRouter>
            {isLoggedIn && <Navigator children={isLoggedIn.email} />}
            <View
                children={
                    <Routes>
                        {!isLoggedIn ? (
                            // React-Router-Dom v6은 Redirect를 제공하지 않으므로 Route의 path를 *설정한다.
                            <Route path="/" element={<Auth />} />
                        ) : (
                            <>
                                <Route path="/" element={<Home />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route
                                    path="/profile/:id"
                                    element={<Profile />}
                                />
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
    width: 90%;
    padding: 1%;
`;

export default Router;
