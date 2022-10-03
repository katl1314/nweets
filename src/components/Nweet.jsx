import { dbService, storageService } from "fbase";
import { useState } from "react";
import styled from "styled-components";

const Nweet = ({
    nweetObj: { text, createAt, id, attachmentUrl, displayName },
    isOwner,
}) => {
    const [isEditing, setEditing] = useState(false); // 수정 여부
    const [newNweet, setNewNweet] = useState(text); // 갱신 값. (기존값이 보이기 위함.)
    // isOwner: 해당 아이디로 작성된 게시물만 버튼이 표시됨.
    const handlerDeleteNweet = async () => {
        // 트윗 삭제
        // firebase.firestore().doc(`컬렉션경로/id`).delete();
        // firebase.storage().refFromURL(image url).delete();
        if (window.confirm("정말 삭제하겠습니까?")) {
            // 데이터베이스 삭제
            await dbService.doc(`/nweets/${id}`).delete();
            if (attachmentUrl) {
                // 특정 스토리지 경로의 파일 삭제 (불필요한 자료가 쌓이면 과금요소.)
                await storageService.refFromURL(attachmentUrl).delete();
            }
        }
    };

    const toggleEditingForm = () => {
        setEditing((prev) => !prev);
    };
    const handlerEditNweet = () => {
        // 트윗 수정
        toggleEditingForm();
    };

    const changeEditValue = (event) => {
        setNewNweet(event.target.value);
    };

    const handlerSaveEdit = async (event) => {
        event.preventDefault(); // 이벤트 기본 동작 제어
        // 수정 사항 변경
        if (window.confirm("정말로 저장하시겠습니까?")) {
            const updateData = {
                text: newNweet,
                createAt: new Date(createAt).toLocaleDateString(),
            };

            await dbService.doc(`/nweets/${id}`).update(updateData);
            toggleEditingForm();
        }
    };
    return (
        <NweetWrap>
            <div>
                <div>
                    <img
                        src={attachmentUrl}
                        alt="이미지"
                        width={50}
                        height={50}
                    ></img>
                </div>
                <div>
                    <h4 style={{ margin: 0 }}>내용: {text}</h4>
                    <p style={{ margin: 0 }}>
                        작성일: {new Date(createAt).toLocaleString()}
                    </p>
                    <p style={{ margin: 0 }}>작성자: {displayName}</p>
                </div>
            </div>
            {isOwner && (
                <div>
                    <button key="delete" onClick={handlerDeleteNweet}>
                        Delete Nweet
                    </button>
                    <button key="edit" onClick={handlerEditNweet}>
                        Edit Nweet
                    </button>
                </div>
            )}
            {isEditing && (
                <EditForm
                    newNweet={newNweet}
                    handlerChange={changeEditValue}
                    handlerSaveEdit={handlerSaveEdit}
                />
            )}
        </NweetWrap>
    );
};

const EditForm = ({ newNweet, handlerChange, handlerSaveEdit }) => {
    // input에 required를 설정하여 해당 필드는 필수로 입력해야 하도록 설정함.
    // required를 사용하려면 form으로 감싸야한다.
    return (
        <div>
            <form onSubmit={handlerSaveEdit}>
                <input
                    type="text"
                    value={newNweet}
                    onChange={handlerChange}
                    required
                ></input>
                <button type="submit">저장</button>
            </form>
        </div>
    );
};

const NweetWrap = styled.div`
    margin: 10px;
    & > div {
        display: flex;
    }
`;

export default Nweet;
