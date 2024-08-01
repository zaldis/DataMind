import { styled } from "styled-components";


const StyledModal = styled.div`
    display: ${({$isActive}) => $isActive ? "block" : "none"};
    position: fixed;
    z-index: 1;
    padding-top: 30vh;
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.4);
`;

const ModalContent = styled.div`
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    border-radius: 10px;
    width: 40%;
`;

const ModalContentHeader = styled.div`
    font-size: 20px;
    font-weight: 500;
`;


interface ModalProps {
    isActive: boolean;
    header: React.ReactElement;
    content: React.ReactElement;
}


const Modal: React.FC<ModalProps> = ({ header, content, isActive= false }) => {
    return (
        <StyledModal $isActive={isActive}>
            <ModalContent>
                <ModalContentHeader>{ header }</ModalContentHeader>
                <div>{ content }</div>
            </ModalContent>
        </StyledModal>
    );
}

export default Modal;
