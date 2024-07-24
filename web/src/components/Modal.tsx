export default function Modal({ header, content, isActive= false }) {
    const modalCSS = `modal ${isActive ? "modal-active" : ""}`;

    return (
        <div className={modalCSS}>
            <div className="modal-content">
                <div className="modal-content__header">{ header }</div>
                <div className="modal-content__fields">{ content }</div>
            </div>
        </div>
    );
}
