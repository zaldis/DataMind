import { styled } from "styled-components";


const MenuLayoutBase = styled.div`
    display: flex;
`;

const MenuLayoutMenuSection = styled.div``;

const MenuLayoutContentSection = styled.div`
    width: 100%;
`;


interface MenuLayoutProps {
    header: React.ReactElement;
    menu: React.ReactElement;
    body: React.ReactElement;
}


const MenuLayout: React.FC<MenuLayoutProps> = ({header, menu, body}) => {
    return (
        <MenuLayoutBase>
            <MenuLayoutMenuSection>
                { menu }
            </MenuLayoutMenuSection>
            <MenuLayoutContentSection>
                { header }
                <div style={{ margin: "30px" }}>
                    { body }
                </div>
            </MenuLayoutContentSection>
        </MenuLayoutBase>
    );
}

export default MenuLayout;
