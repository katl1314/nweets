import { dbService, storageService } from "fbase";
import { useEffect, useState, useRef } from "react";
import Nweet from "components/Nweet";
import { v4 as uuidv4 } from "uuid"; // firebase storage는 구분하기 위한 id를 자동생성하지 않기 때문에 uuid를 이용하자.

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState(""); // nweet 입력
    const [nweets, setNweets] = useState([]); // nweet 저장
    const [attachment, setAttachment] = useState(""); // 파일 정보

    const fileRef = useRef();

    const handlerSubmit = async (event) => {
        event.preventDefault();
        // 파이어베이스 데이터베이스에 값을 전달하는것은 비동기로 처리해야함.
        // firebase.firestore().collection().add는 promise객체를 반환함.
        // storage를 사용하게되면 아래 로직은 더이상 사용하지 않는다.
        /* await dbService.collection("nweets").add({
            text: nweet,
            createAt: Date.now(), // 현재 시간을 밀리세컨드로 반환함.
            uid: userObj.uid, // 유저 uid
        });
        setNweet(""); */
        // firebase.storage().ref().child함수를 사용하게 되면 폴더, 파일이름을 설정할 수 있다.
        const uuid = uuidv4();
        // 파일 업로드
        const attachmentRef = storageService
            .ref()
            .child(`${userObj.uid}/${uuid}`);
        const response = await attachmentRef.putString(attachment, "data_url");
        console.log(response);

        // 파일을 불러오기
        // await response.ref.getDownloadURL();
    };

    const handlerChangeNweet = (event) => {
        // jsx에서 input컴포넌트에 value를 설정하고, key를 입력하면 입력이 되지 않는다.
        // 이는 onChange 이벤트 핸들러에서 입력한 값을 event.target.value으로 추출하여 useState 반환된 배열 중 두번째 인자로 값을 업데이트해야함.
        setNweet(event.target.value);
    };

    // image file change
    const handlerFileChange = (event) => {
        // event.target.files : 업로드한 파일리스트를 반환함.

        const { files } = event.target;
        // Array.prototype.slice.call(files)
        // Array.from(files)
        // [...files]
        [...files].forEach((file) => {
            const reader = new FileReader();
            // 파일 리더의 상태에 따라 발생하는 이벤트 핸들러
            reader.onloadend = (event) => {
                // event.isTrusted : 사용자 행위에 의해 이벤트 발생 여부
                const {
                    currentTarget: { result },
                } = event;
                // 이미지 파일을 base64로 인코딩함.
                setAttachment(result);
            };
            // File을 읽을 경우
            reader.readAsDataURL(file);
        });
    };

    // 이미지 파일 삭제
    const handlrImageClear = () => {
        if (attachment) {
            setAttachment(""); // 빈문자열로 변경함.
            // input file 삭제
            fileRef.current.value = "";
        }
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
                <div>
                    <input
                        type="text"
                        value={nweet}
                        onChange={handlerChangeNweet} // change시 이벤트 핸들로 호출.
                        placeholder="What's on your mind?" // hint
                        maxLength={120} // 최대 120자까지 입력함.
                    />
                    {/* input file type : 파일 업로드가능
                    accept는 업로드할 파일 타입을 설정할 수 있음.
                 */}
                    <input
                        type="file"
                        ref={fileRef}
                        name="uploadImage"
                        id="uploadImage"
                        accept="image/*"
                        onChange={handlerFileChange}
                    />
                </div>
                {/* src 어프리뷰트에 이미지파일 base64로 인코딩된 데이터도 가능 */}
                <div>
                    <img
                        src={attachment}
                        alt="업로드 이미지"
                        width="100"
                        height="100"
                    />
                    <button type="button" onClick={handlrImageClear}>
                        clear
                    </button>
                </div>
                <input type="submit" value="Nweet" />
            </form>
            <div>{liNweets}</div>
        </div>
    );
};

export default Home;
