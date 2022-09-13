import { dbService } from "fbase";
import { useEffect } from "react";
import { useState } from "react";

const Home = () => {
    const [nweet, setNweet] = useState(""); // nweet 입력
    const [nweets, setNweets] = useState([]); // nweet 저장
    const [isState, setState] = useState(false);
    const handlerSubmit = async (event) => {
        event.preventDefault();
        // 파이어베이스 데이터베이스에 값을 전달하는것은 비동기로 처리해야함.
        // firebase.firestore().collection().add는 promise객체를 반환함.
        await dbService.collection("nweets").add({
            text: nweet,
            createAt: Date.now(), // 현재 시간을 밀리세컨드로 반환함.
        });
        setNweet("");
    };

    const handlerChangeNweet = (event) => {
        // jsx에서 input컴포넌트에 value를 설정하고, key를 입력하면 입력이 되지 않는다.
        // 이는 onChange 이벤트 핸들러에서 입력한 값을 event.target.value으로 추출하여 useState 반환된 배열 중 두번째 인자로 값을 업데이트해야함.
        setNweet(event.target.value);
    };

    // useEffect(handler, []) : 두번째 인자가 빈배열이면 처음 렌더링시 발생함.
    useEffect(() => {
        // useEffect훅의 콜백함수는 async-await를 사용할 수 없음.
        getNweets();
    }, []);

    useEffect(() => {
        console.log(isState);
    }, [isState]);

    const getNweets = async () => {
        const data = await dbService.collection("nweets").get();
        data.forEach((nweet) => {
            // 실제 데이터 nweet.data()
            const newNweet = { ...nweet.data(), id: nweet.id };
            // prev : 이전 nweets 배열 데이터
            // 새로운 데이터를 배열 앞에 추가한다.
            setNweets((prev) => [newNweet, ...prev]);
        });
    };
    const liNweets = nweets.map(({ text, createAt, id }) => {
        return (
            <li key={id}>
                <div>텍스트:{text}</div>
                <div>생성날짜:{new Date(createAt).toLocaleString()}</div>
            </li>
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
            <button
                onClick={() => {
                    setState((prev) => !prev);
                }}
            >
                테스트
            </button>
            <ul>{liNweets}</ul>
        </div>
    );
};

export default Home;
