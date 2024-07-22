export default function HorizontalMenu({ items, bottomItems }) {
    const nodes = items.map((item, index) => {
        return (
            <div key={index} className={`menu-item ${item.isActive ? "menu-active" : ''}`}>
                {item.element}
            </div>
        );
    });

    const bottomNodes = bottomItems.map((item, index) => {
        return (
            <div key={index}
                 className={`menu-item ${item.isRadius ? "menu-radius" : ''}`}
                 onClick={item.onClick ? item.onClick : undefined}
            >
                {item.element}
            </div>
        );
    });

    return (
        <menu className="menu">
            <div className="top">
                { nodes }
            </div>
            <div className="bottom">
                { bottomNodes }
            </div>
        </menu>
    );
}