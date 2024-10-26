// src/components/DateCalculator.js
import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

function DateCalculator({ onNewCalculation }) {
    const [initialDate, setInitialDate] = useState('');
    const [duration, setDuration] = useState(0);
    const [unit, setUnit] = useState('days'); // Added state for units
    const [calculatedDate, setCalculatedDate] = useState(null);
    const [error, setError] = useState(null);

    const buttonAnimation = useSpring({
        transform: 'scale(1)',
        from: { transform: 'scale(0.9)' },
        config: { tension: 150, friction: 10 }
    });

    const errorAnimation = useSpring({
        opacity: error ? 1 : 0,
        transform: error ? 'translateY(0)' : 'translateY(-10px)',
        config: { tension: 200, friction: 20 }
    });

    const calculateDate = () => {
        // Validate input
        if (!initialDate || duration === '') {
            setError('Please enter both a date and the number of days/weeks to add.');
            return;
        }

        setError(null); // Clear any existing error

        const startDate = new Date(initialDate);
        const daysToAdd = unit === 'weeks' ? parseInt(duration, 10) * 7 : parseInt(duration, 10); // Convert weeks to days
        startDate.setDate(startDate.getDate() + daysToAdd);
        const newDate = startDate.toDateString();
        setCalculatedDate(newDate);

        const calculation = {
            initialDate,
            duration: `${duration} ${unit}`,
            result: newDate
        };

        // Save to localStorage
        const savedCalculations = JSON.parse(localStorage.getItem('calculations')) || [];
        savedCalculations.unshift(calculation); // Add new calculation to start
        localStorage.setItem('calculations', JSON.stringify(savedCalculations));

        // Notify parent component of the new calculation
        onNewCalculation();
    };

    return (
        <div className="date-calculator">
            <h2>Add Days/Weeks to Date</h2>
            {error && (
                <animated.div style={errorAnimation} className="alert-box">
                    <span className="close-btn" onClick={() => setError(null)}>
                        &times;
                    </span>
                    <p>{error}</p>
                </animated.div>
            )}
            <div className="input-group">
                <label>Initial Date:</label>
                <input
                    type="date"
                    value={initialDate}
                    onChange={(e) => setInitialDate(e.target.value)}
                />
            </div>
            <div className="input-group">
                <label>Duration:</label>
                <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                </select>
                <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                />
            </div>

            <animated.button style={buttonAnimation} onClick={calculateDate}>
                Calculate
            </animated.button>

            {calculatedDate && (
                <p className="result">New Date: {calculatedDate}</p>
            )}
        </div>
    );
}

export default DateCalculator;
