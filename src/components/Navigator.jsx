import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Navigator = ({ userObj: { displayName, photoURL } }) => {
    return (
        <NavWrap>
            <WrapNavUl>
                <Li>
                    <NavLink to="/">Home</NavLink>
                </Li>
                <Li>
                    <NavLink to="/profile">
                        {photoURL && (
                            <img src={photoURL} alt="profile image"></img>
                        )}
                        <div>{displayName}'s Profile</div>
                    </NavLink>
                </Li>
            </WrapNavUl>
        </NavWrap>
    );
};

const NavWrap = styled.div`
    width: 10%;
    & > p {
        text-align: center;
    }
`;

const WrapNavUl = styled.ul`
    list-style-type: none;
    padding: 0px;
    text-align: center;
`;

const Li = styled.li`
    padding: 10px 0px;
    & > a.active {
        color: red;
    }
`;

export default Navigator;
