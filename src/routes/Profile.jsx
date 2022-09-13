import { authService } from "fbase";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Optional Param사용시 해당 값을 반환한다. useParams
    const handlerLogout = () => {
        // firebase auth에서 로그아웃은 다음과 같이 처리한다.
        authService.signOut();
        navigate("/");
    };
    return (
        <div>
            Profile
            <button onClick={handlerLogout}>Logout</button>
        </div>
    );
};

export default Profile;
