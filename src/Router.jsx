import { HashRouter, Route, Routes } from "react-router-dom";
import { Home, Auth, Profile } from "routes";
import Navigator from "components/Navigator";
import styled from "styled-components";

const Router = ({ isLoggedIn, userObj, refreshUser }) => {
    // useState 훅 사용 => 상태 관리
    // isLoggedIn의 상태에 따라 표시되는 컴포넌트는 다르다!

    return (
        <HashRouter>
            {isLoggedIn && <Navigator userObj={userObj} />}
            <View
                children={
                    <Content>
                        <Routes>
                            {!isLoggedIn ? (
                                // React-Router-Dom v6은 Redirect를 제공하지 않으므로 Route의 path를 *설정한다.
                                <Route path="/" element={<Auth />} />
                            ) : (
                                <>
                                    <Route
                                        path="/"
                                        element={<Home userObj={userObj} />}
                                    />
                                    <Route
                                        path="/profile"
                                        element={
                                            <Profile
                                                userObj={userObj}
                                                refreshUser={refreshUser}
                                            />
                                        }
                                    />
                                    {/* <Route
                                    path="/profile/:id"
                                    element={<Profile />}
                                /> */}
                                </>
                            )}
                        </Routes>
                    </Content>
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

const Content = styled.div`
    max-width: 890px;
    width: 100%;
    margin: 0 auto;
    margin-top: 80;
    display: flex;
    justify-content: center;
`;

export default Router;
