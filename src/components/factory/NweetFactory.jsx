import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid"; // firebase storage는 구분하기 위한 id를 자동생성하지 않기 때문에 uuid를 이용하자.
import { storageService } from "fbase";
import { DatabaseService } from "service/NweetsFactory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NweetFactory = ({ userObj: { uid, displayName } }) => {
    const [nweet, setNweet] = useState(""); // nweet
    const [attachment, setAttachment] = useState(""); // 파일 정보

    const fileRef = useRef();

    const handlerSubmit = async (event) => {
        event.preventDefault();
        // 파이어베이스 데이터베이스에 값을 전달하는것은 비동기로 처리해야함. (서버 통신)
        // firebase.firestore().collection().add는 promise객체를 반환함.
        // firebase.storage().ref().child함수를 사용하게 되면 폴더, 파일이름을 설정할 수 있다. (base64)
        let data = { nweet, uid, displayName, attachmentUrl: "" };
        if (attachment) {
            // 파일 업로드
            const uuid = uuidv4();
            const attachmentRef = storageService.ref().child(`${uid}/${uuid}`);
            const response = await attachmentRef.putString(
                attachment,
                "data_url"
            );

            // storage에 저장된 파일을 불러오기
            const attachmentUrl = await response.ref.getDownloadURL(); // image url
            data = { ...data, attachmentUrl: attachmentUrl };
        }
        await DatabaseService.addNweet(data);

        initState();
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
    const handlerImageClear = () => {
        if (attachment) {
            setAttachment(""); // 빈문자열로 변경함.
            // input file 삭제
            fileRef.current.value = "";
        }
    };

    const initState = () => {
        // 상태값 초기화
        setNweet("");
        setAttachment("");
    };

    return (
        <div>
            <form onSubmit={handlerSubmit} className="factoryForm">
                <div className="factoryInput__container">
                    <input
                        type="text"
                        value={nweet}
                        className="factoryInput__input"
                        onChange={handlerChangeNweet} // change시 이벤트 핸들로 호출.
                        placeholder="What's on your mind?" // hint
                        maxLength={120} // 최대 120자까지 입력함.
                    />
                    <input
                        type="submit"
                        value="&rarr;"
                        className="factoryInput__arrow"
                    />
                </div>
                <div style={{ margin: "10px 0" }}>
                    <label
                        htmlFor="uploadImage"
                        className="factoryInput__label"
                    >
                        <span>Add Photo</span>
                        <FontAwesomeIcon icon={faPlus} />
                    </label>
                    <input
                        type="file"
                        ref={fileRef}
                        name="uploadImage"
                        id="uploadImage"
                        accept="image/*" // 허용할 파일 형태
                        onChange={handlerFileChange}
                        style={{ display: "none" }}
                    />
                </div>
                <div style={{ margin: "10px 0" }}>
                    {/* src 어프리뷰트에 이미지파일 base64로 인코딩된 데이터도 가능 */}
                    {attachment ? (
                        <img
                            src={attachment}
                            alt="업로드 이미지"
                            width="100"
                            height="100"
                        />
                    ) : (
                        <div
                            style={{
                                width: "100px",
                                height: "100px",
                                border: "1px solid",
                            }}
                        >
                            <span
                                style={{
                                    display: "inline-block",
                                    margin: "42% auto",
                                    width: "100%",
                                    textAlign: "center",
                                    boxSizing: "border-box",
                                }}
                            >
                                No Image
                            </span>
                        </div>
                    )}

                    <div
                        className="factoryForm__clear"
                        onClick={handlerImageClear}
                    >
                        <span>clear</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default NweetFactory;
