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

export default EditForm;
