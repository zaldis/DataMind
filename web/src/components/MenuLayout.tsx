import { styled } from "styled-components";


const MenuLayoutBase = styled.div`
    display: flex;
`;

const MenuLayoutMenuSection = styled.div``;

const MenuLayoutContentSection = styled.div`
    width: 100%;
`;


export default function MenuLayout({header, menu, body}) {
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
