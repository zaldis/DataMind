import { styled } from "styled-components";

import Icon from "./Icon";


const StyledButton = styled.button`
    padding: 1rem 2rem;
    font-weight: 600;
    text-transform: uppercase;
    border-radius: 0.25rem;
    cursor: pointer; 
    color: ${({$theme}) => {
        if ($theme === "dark") return "white";
        return "black";
    }};
    background-color: ${({$theme}) => {
        if ($theme === "dark") return "#7071f3";
        return "#ffffff";
    }};
`;

const RowFlex = styled.div`
    display: flex;
    align-items: center;
`;


interface ButtonProps {
    onClick: () => void;
    theme?: "dark" | "light";
    icon?: object;
    className?: string;
}


const Button: React.FC<ButtonProps> = ({ onClick, icon, theme, className, children }) => {
    if (!theme) theme = "light";
    if (!icon)
        return (
            <StyledButton type="button" $theme={theme} className={className} onClick={onClick}>
                {children}
            </StyledButton>
        );

    return (
        <StyledButton $theme={theme} className={className} onClick={onClick}>
            <RowFlex>
                <Icon src={icon} alt="plus sign"/>
                <div style={{marginLeft: "10px"}}>{children}</div>
            </RowFlex>
        </StyledButton>
    );
}

export default Button;
