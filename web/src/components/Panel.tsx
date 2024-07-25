import { styled } from "styled-components";


const BasePanel = styled.div`
    background-color: #e6e8ec;
    padding: 10px;
    border-radius: 10px;
`;


export default function Panel({children}) {
    return <BasePanel>{children}</BasePanel>
}
