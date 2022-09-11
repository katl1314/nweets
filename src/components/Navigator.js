import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Navigator = () => {
    return (
        <WrapNav>
            <Li>
                <NavLink to="/">Auth</NavLink>
            </Li>
            <Li>
                <NavLink to="/">Home</NavLink>
            </Li>
        </WrapNav>
    );
};

const WrapNav = styled.ul`
    list-style-type: none;
    width: 20%;
`;

const Li = styled.li`
    padding: 10px 20px;

    & > a.active {
        color: red;
    }
`;

export default Navigator;
