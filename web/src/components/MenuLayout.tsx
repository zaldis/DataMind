export default function MenuLayout({header, menu, body}) {
    return (
        <div className="menu-layout">
            <div className="menu-layout__menu">
                { menu }
            </div>
            <div className="menu-layout__content">
                { header }
                <div className="container">
                    { body }
                </div>
            </div>
        </div>
    );
}
