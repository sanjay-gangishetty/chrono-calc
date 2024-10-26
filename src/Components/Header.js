// src/components/Header.js
import React from 'react';
import { useSpring, animated } from 'react-spring';

function Header() {
    const slideIn = useSpring({
        from: { transform: 'translate3d(-100%,0,0)' },
        to: { transform: 'translate3d(0,0,0)' },
        config: { tension: 120, friction: 14 }
    });

    return (
        <animated.header style={slideIn} className="header">
            <h1>Chrono Calc</h1>
        </animated.header>
    );
}

export default Header;
