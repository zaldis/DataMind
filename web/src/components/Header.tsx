import { styled } from "styled-components";

import headerLogo from '/header-logo.svg'


const BaseHeader = styled.header`
    height: 56px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    box-shadow: 0 2px 8px 0 rgba(2, 29, 61, 0.12);
    background-color: #fff;
    padding: 0 0 0 32px;
    margin-bottom: 30px;
`;


export default function Header() {
    return (
        <BaseHeader>
            <img src={headerLogo} alt="header" />
        </BaseHeader>
    )
}
