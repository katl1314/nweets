import { dbService } from "fbase";
import { useEffect } from "react";
import { useState } from "react";
import Nweet from "components/Nweet";
const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState(""); // nweet 입력
    const [nweets, setNweets] = useState([]); // nweet 저장

    const handlerSubmit = async (event) => {
        event.preventDefault();
        // 파이어베이스 데이터베이스에 값을 전달하는것은 비동기로 처리해야함.
        // firebase.firestore().collection().add는 promise객체를 반환함.
        await dbService.collection("nweets").add({
            text: nweet,
            createAt: Date.now(), // 현재 시간을 밀리세컨드로 반환함.
            uid: userObj.uid, // 유저 uid
        });
        setNweet("");
    };

    const handlerChangeNweet = (event) => {
        // jsx에서 input컴포넌트에 value를 설정하고, key를 입력하면 입력이 되지 않는다.
        // 이는 onChange 이벤트 핸들러에서 입력한 값을 event.target.value으로 추출하여 useState 반환된 배열 중 두번째 인자로 값을 업데이트해야함.
        setNweet(event.target.value);
    };

    // 두번째 인자가 빈배열이면 처음 렌더링시 발생함.
    useEffect(() => {
        // useEffect훅의 콜백함수는 async-await를 사용할 수 없음.
        // firebase의 firestore에 저장된 데이터를 실시간으로 가져온다.
        // firebase.firestore().collection(컬렉션명).orderBy(fieldName, orderByType).onSnapshot(callback)
        dbService
            .collection("nweets")
            .orderBy("createAt", "desc") // firebase 컬렉션 조회시 정렬 기준 및 정렬 방식을 설정한다.
            .onSnapshot((snapshot) => {
                // onSnapshot은 firebase에 데이터가 갱신되면 자동으로 호출함.
                // 반환한 배열을 가지고 다시 갱신한다.
                // snapshot.docs는 firestore에 저장된 데이터를 배열 형태로...
                const nweetsArray = snapshot.docs.map((document) => {
                    const newObject = { ...document.data(), id: document.id };
                    return newObject;
                });
                setNweets(nweetsArray);
            });
    }, []);
    const liNweets = nweets.map(({ text, createAt, id, uid }) => {
        return (
            <Nweet
                key={id}
                nweetObj={{ text, createAt, id, uid }}
                isOwner={userObj.uid === uid}
            />
        );
    });
    return (
        <div>
            <form onSubmit={handlerSubmit}>
                <input
                    type="text"
                    value={nweet}
                    onChange={handlerChangeNweet} // change시 이벤트 핸들로 호출.
                    placeholder="What's on your mind?" // hint
                    maxLength={120} // 최대 120자까지 입력함.
                />
                <input type="submit" value="Nweet" />
            </form>
            <div>{liNweets}</div>
        </div>
    );
};

export default Home;
