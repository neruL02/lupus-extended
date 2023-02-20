// Action.js

import React from 'react';

function Action() {
    const role = 'Villager';

    function handleClick() {
        console.log(`Action button clicked for ${role}`);
    }

    if (role === 'Villager') {
        return (
            <button onClick={handleClick}>Vote to Kill</button>
        );
    } else if (role === 'Seer') {
        return (
            <button onClick={handleClick}>Reveal Player's Role</button>
        );
    } else if (role === 'Doctor') {
        return (
            <button onClick={handleClick}>Choose Player to Save</button>
        );
    } else {
        return null;
    }
}

export default Action;
