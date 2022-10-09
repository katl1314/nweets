import { dbService } from "fbase";

export const addNweet = ({ nweet, uid, attachmentUrl, displayName }) => {
    dbService.collection("nweets").add({
        text: nweet,
        createAt: Date.now(), // 현재 시간을 밀리세컨드로 반환함.
        uid, // 유저 uid
        attachmentUrl, // image base64인코딩 데이터 저장.
        displayName,
    });
};

export const findNweets = (collection, callback) => {
    // onSnapshot은 firebase에 데이터가 갱신되면 자동으로 호출함.
    // 반환한 배열을 가지고 다시 갱신한다.
    // snapshot.docs는 firestore에 저장된 데이터를 배열 형태로...
    dbService
        .collection(collection)
        .orderBy("createAt", "desc") // firebase 컬렉션 조회시 정렬 기준 및 정렬 방식을 설정한다.
        .onSnapshot((snapshot) => callback(snapshot)); // onSnapshot이벤트는 실시간으로 서버에 변경된 데이터를 조회함.
};
