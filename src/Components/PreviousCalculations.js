// src/components/PreviousCalculations.js
import React, { useEffect, useState } from 'react';

function PreviousCalculations() {
    const [calculations, setCalculations] = useState([]);

    // Load calculations from localStorage on component mount
    useEffect(() => {
        loadCalculations();
    }, []);

    const loadCalculations = () => {
        const savedCalculations = JSON.parse(localStorage.getItem('calculations')) || [];
        setCalculations(savedCalculations);
    };

    const clearCalculations = () => {
        localStorage.removeItem('calculations'); // Clear localStorage
        setCalculations([]); // Clear state
    };

    return (
        <div className="previous-calculations">
            <div className="header-container">
                <h2>Previous Calculations</h2>
                <button className="clear-btn" onClick={clearCalculations}>
                    Clear All
                </button>
            </div>
            {calculations.length === 0 ? (
                <p>No previous calculations found.</p>
            ) : (
                <ul className="calculations-list">
                    {calculations.map((calc, index) => (
                        <li key={index} className="calculation-item">
                            <div className="calculation-detail">
                                <strong>Initial Date:</strong> {calc.initialDate}
                            </div>
                            <div className="calculation-detail">
                                <strong>Duration:</strong> {calc.duration}
                            </div>
                            <div className="calculation-detail">
                                <strong>Resulting Date:</strong> {calc.result}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default PreviousCalculations;
