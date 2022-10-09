import { useState } from "react";

const useUser = () => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [userObj, setUserObj] = useState(null); // 누가 트윗을 작성하였는지 저장을 목적

    const handlerLoggedIn = (isLoggedIn) => {
        setLoggedIn(isLoggedIn);
    };

    const handlerUserObj = ({ uid, displayName, photoURL, updateProfile }) => {
        setUserObj({ uid, displayName, photoURL, updateProfile });
    };

    return [{ isLoggedIn, userObj }, handlerLoggedIn, handlerUserObj];
};

export default useUser;
