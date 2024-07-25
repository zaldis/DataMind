import { styled } from "styled-components";


const Menu = styled.menu`
    width: 84px;
    height: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    background-color: #2f2f66;
    margin: 0;
    padding: 0;
`;

const MenuTopSection = styled.div`
    align-self: stretch;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 20px;
`;

const MenuBottomSection = styled.div`
    margin-bottom: 20px;
`;

const MenuItem = styled.div`
    width: 48px;
    height:48px;
    margin-left: 18px;
    margin-right: 18px;
    margin-bottom: 5px;
    color: #fff;
    padding: 12px;
    cursor: pointer;
    background-color: ${
        ({$isActive, $isCircle}) => {
            if ($isActive) return "#12ffe2";
            if ($isCircle) return "#7071f3";
        }
    };
    border-radius: ${({$isActive, $isCircle}) => $isActive || $isCircle ? "30px" : "none"};
    display: flex;
    flex-direction: column;
    justify-content: center;
`;


export default function HorizontalMenu({ items, bottomItems }) {
    const nodes = items.map((item, index) => {
        return (
            <MenuItem key={index} $isActive={item.isActive}>
                {item.element}
            </MenuItem>
        );
    });

    const bottomNodes = bottomItems.map((item, index) => {
        return (
            <MenuItem key={index}
                      $isCircle={item.isCircle}
                      onClick={item.onClick}
            >
                {item.element}
            </MenuItem>
        );
    });

    return (
        <Menu>
            <MenuTopSection>
                { nodes }
            </MenuTopSection>
            <MenuBottomSection>
                { bottomNodes }
            </MenuBottomSection>
        </Menu>
    );
}