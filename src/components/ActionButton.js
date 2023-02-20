import React from 'react';

function ActionButton(props) {
    const { role, label = "Vote", onAction } = props;

    function handleClick() {
        onAction(role);
    }

    return (
        <button className="ActionButton" onClick={handleClick}>
            {label}
        </button>
    );
}

export default ActionButton;
