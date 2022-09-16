const Nweet = ({ nweetObj, children, isOwner }) => {
    // isOwner: 해당 아이디로 작성된 게시물만 버튼이 표시됨.
    return (
        <div style={{ margin: "10px" }}>
            <h4 style={{ margin: 0 }}>내용: {nweetObj.text}</h4>
            <span>작성일: {new Date(nweetObj.createAt).toLocaleString()}</span>
            {isOwner && <div>{children}</div>}
        </div>
    );
};

export default Nweet;
