import { dbService } from "fbase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nweet from "components/Nweet";
import * as AuthService from "service/AuthService";

const Profile = ({ userObj, refreshUser }) => {
    const navigate = useNavigate();
    const [myNweet, setMyNweet] = useState([]);
    const [displayName, setDisplayName] = useState(userObj.displayName);
    useEffect(() => {
        // 렌더링 이후 발생할 함수
        getMyNweet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getMyNweet = async () => {
        const { uid } = userObj;
        await dbService
            .collection("nweets")
            .where("uid", "==", uid) // 조건(key, condition, value)
            .onSnapshot((snapshot) => {
                snapshot.docs.forEach((document) => {
                    setMyNweet((prev) => [
                        ...prev,
                        { ...document.data(), id: document.id },
                    ]);
                });
            });
    };

    const handlerLogout = () => {
        if (window.confirm("정말 로그아웃 하시겠습니까 ? ")) {
            AuthService.logout();
            // Login화면으로 리다이렉트
            navigate("/");
        }
    };

    const handlerDisplayChange = (event) => {
        const {
            target: { value },
        } = event;
        setDisplayName(value);
    };

    const updateProfile = async (event) => {
        event.preventDefault();

        if (userObj.displayName === displayName) {
            return;
        }
        // 프로필 정보 변경 userObj.updateProfile({ displayName, photoURL })
        // await userObj.updateProfile은 리턴값이 undefined
        await userObj.updateProfile({ displayName });
        refreshUser(); // 새 데이터로 변경한다.
    };

    // Nweets컴포넌트 재활용.
    const liNweets = myNweet.map(
        ({ text, createAt, id, uid, attachmentUrl, displayName }) => {
            return (
                <Nweet
                    key={id}
                    nweetObj={{
                        text,
                        createAt,
                        id,
                        uid,
                        attachmentUrl,
                        displayName,
                    }}
                    isOwner={userObj.uid === uid}
                />
            );
        }
    );

    return (
        <div>
            Profile
            <div>
                <form id="form" onSubmit={updateProfile}>
                    <img
                        src={userObj.photoURL}
                        alt="프로필이미지"
                        width={50}
                        height={50}
                    />
                    <input
                        type="text"
                        name="displayName"
                        id="displayName"
                        value={displayName}
                        onChange={handlerDisplayChange}
                    />
                    <input type="submit" value="Update Submit" />
                </form>
            </div>
            <button onClick={handlerLogout}>Logout</button>
            {liNweets}
        </div>
    );
};

export default Profile;
