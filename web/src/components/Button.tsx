import { styled } from "styled-components";

import Icon from "./Icon";


const StyledButton = styled.button`
    padding: 1rem 2rem;
    font-weight: 600;
    text-transform: uppercase;
    border-radius: 0.25rem;
    cursor: pointer; 
    color: ${({$style}) => {
        if ($style === "dark") return "white";
        return "black";
    }};
    background-color: ${({$style}) => {
        if ($style === "dark") return "#7071f3";
        return "#ffffff";
    }};
`;

const RowFlex = styled.div`
    display: flex;
    align-items: center;
`;


export default function Button({ onClick, icon, style, className, children }) {
    if (!icon)
        return (
            <StyledButton type="button" $style={style} onClick={onClick}>
                {children}
            </StyledButton>
        );

    return (
        <StyledButton $style={style} onClick={onClick}>
            <RowFlex>
                <Icon src={icon} alt="plus sign"/>
                <div style={{marginLeft: "10px"}}>{children}</div>
            </RowFlex>
        </StyledButton>
    );
}
