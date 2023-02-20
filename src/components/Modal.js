

// Modal component
function Modal(props) {
    const { title, content, buttons } = props;

    return (
        <div className="Modal">
            <div className="Modal-content">
                <ModalTitle title={title} />
                <ModalContent content={content} />
                <ModalButtons buttons={buttons} />
            </div>
        </div>
    );
}

// ModalTitle component
function ModalTitle(props) {
    const { title } = props;

    return (
        <div className="Modal-title">
            {title}
        </div>
    );
}

// ModalContent component
function ModalContent(props) {
    const { content } = props;

    return (
        <div className="Modal-content">
            {content}
        </div>
    );
}

// ModalButtons component
function ModalButtons(props) {
    const { buttons } = props;

    return (
        <div className="Modal-buttons">
            {buttons.map(button => (
                <button key={button.label} onClick={button.onClick}>
                    {button.label}
                </button>
            ))}
        </div>
    );
}
export default Modal;
