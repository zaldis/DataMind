import { styled } from "styled-components";


const StyledPanel = styled.div`
    background-color: #e6e8ec;
    padding: 10px;
    border-radius: 10px;
`;


const Panel: React.FC = ({children}) => {
    return <StyledPanel>{children}</StyledPanel>
}

export default Panel;
