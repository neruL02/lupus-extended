import React from 'react';
import ActionButton from './ActionButton';

function ActionPanel(props) {
    const { phase, role, onAction } = props;

    let actionButton;
    if (phase === 'day') {
        actionButton = <ActionButton role={role} onAction={onAction} />;
    } else if (phase === 'night') {
        switch (role) {
            case 'wolf':
                actionButton = <ActionButton role={role} onAction={onAction} />;
                break;
            case 'seer':
                actionButton = <ActionButton role={role} onAction={onAction} label="Reveal" />;
                break;
            case 'doctor':
                actionButton = <ActionButton role={role} onAction={onAction} label="Save" />;
                break;
            default:
                actionButton = null;
                break;
        }
    }

    return (
        <div className="ActionPanel">
            {actionButton}
        </div>
    );
}

export default ActionPanel;
