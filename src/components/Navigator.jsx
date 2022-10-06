import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
// FontAwesomeIcon의 size
// ["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"].
const Navigator = ({ userObj: { displayName, photoURL } }) => {
    return (
        <NavWrap>
            <WrapNavUl>
                <Li>
                    <NavLink to="/">
                        <FontAwesomeIcon
                            icon={faTwitter}
                            color={"04AAFF"}
                            size="2xl"
                        />
                        Home
                    </NavLink>
                </Li>
                <Li>
                    <NavLink to="/profile" style={{ marginRight: 10 }}>
                        <div>
                            <FontAwesomeIcon
                                icon={faUser}
                                color={"04AAFF"}
                                size="2xl"
                            />
                            {displayName}'s Profile
                        </div>
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
