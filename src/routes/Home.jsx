import { DatabaseService } from "service/NweetsFactory";
import { useEffect, useState } from "react";
import Nweet from "components/Nweet";
import NweetFactory from "components/factory/NweetFactory";

const Home = ({ userObj: { uid, displayName } }) => {
    const [nweets, setNweets] = useState([]); // nweet리스트 (database에서 조회함.)

    useEffect(() => {
        // useEffect훅의 콜백함수는 async-await를 사용할 수 없음.
        // firebase의 firestore에 저장된 데이터를 실시간으로 가져온다.
        const findCollectionCallback = (snapshot) => {
            const nweetsArray = snapshot.docs.map((document) => {
                const newObject = { ...document.data(), id: document.id };
                return newObject;
            });
            setNweets(nweetsArray);
        };
        DatabaseService.findNweets("nweets", findCollectionCallback);
    }, []);

    const liNweets = nweets.map(
        ({ text, createAt, id, uid: nweetUid, attachmentUrl, displayName }) => {
            return (
                <Nweet
                    key={id}
                    nweetObj={{
                        text,
                        createAt,
                        id,
                        attachmentUrl,
                        displayName,
                    }}
                    isOwner={uid === nweetUid}
                />
            );
        }
    );

    return (
        <div>
            <NweetFactory userObj={{ uid, displayName }} />
            <div>{liNweets}</div>
        </div>
    );
};

export default Home;
