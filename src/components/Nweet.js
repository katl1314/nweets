import { dbService } from "fbase";
import { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
    const [isEditing, setEditing] = useState(false); // 수정 여부
    const [newNweet, setNewNweet] = useState(nweetObj.text); // 갱신 값. (기존값이 보이기 위함.)
    // isOwner: 해당 아이디로 작성된 게시물만 버튼이 표시됨.
    const handlerDeleteNweet = async () => {
        // 트윗 삭제
        // firebase.firestore().doc(`컬렉션경로/id`).delete();
        if (window.confirm("정말 삭제하겠습니까?")) {
            await dbService.doc(`/nweets/${nweetObj.id}`).delete();
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

    const handlerSaveEdit = async () => {
        // 수정 사항 변경
        if (window.confirm("정말로 저장하시겠습니까?")) {
            const updateData = {
                text: newNweet,
                createAt: new Date(nweetObj.createAt).toLocaleDateString(),
                uid: nweetObj.uid,
            };

            await dbService.doc(`/nweets/${nweetObj.id}`).update(updateData);
            toggleEditingForm();
        }
    };
    return (
        <div style={{ margin: "10px" }}>
            <h4 style={{ margin: 0 }}>내용: {nweetObj.text}</h4>
            <span>작성일: {new Date(nweetObj.createAt).toLocaleString()}</span>
            {isOwner && (
                <div>
                    <button key="delete" onClick={handlerDeleteNweet}>
                        Delete Nweet
                    </button>
                    ,
                    <button key="edit" onClick={handlerEditNweet}>
                        Edit Nweet
                    </button>
                    ,
                </div>
            )}
            {isEditing && (
                <EditForm
                    newNweet={newNweet}
                    handlerChange={changeEditValue}
                    handlerSaveEdit={handlerSaveEdit}
                />
            )}
        </div>
    );
};

const EditForm = ({ newNweet, handlerChange, handlerSaveEdit }) => {
    // input에 required를 설정하여 해당 필드는 필수로 입력해야 하도록 설정함.
    return (
        <div>
            <input
                type="text"
                value={newNweet}
                onChange={handlerChange}
                required
            ></input>
            <button onClick={handlerSaveEdit}>저장</button>
        </div>
    );
};

export default Nweet;
