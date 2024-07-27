import React from 'react';

export default function Toggle({ option1Caption, option2Caption, option1Value, option2Value, value, onChange }) {
    const handleToggle = () => {
        onChange(value === option1Value ? option2Value : option1Value);
    };

    return (
        <div className="toggle">
            <button className={`toggle-button ${value === option1Value ? 'active' : ''}`} onClick={handleToggle}>
                {option1Caption}
            </button>
            <button className={`toggle-button ${value === option2Value ? 'active' : ''}`} onClick={handleToggle}>
                {option2Caption}
            </button>
        </div>
    );
}