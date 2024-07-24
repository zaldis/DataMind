export default function Button({ onClick, icon, className, children }) {
    if (!icon)
        return (
            <button type="button" className={`button ${className}`} onClick={onClick}>
                {children}
            </button>
        );

    return (
        <button className="button purple" onClick={onClick}>
            <div style={{display: "flex"}}>
                <img src={icon} alt="plus sign"/>
                <div style={{marginLeft: "10px"}}>{ children }</div>
            </div>
        </button>
    );
}
