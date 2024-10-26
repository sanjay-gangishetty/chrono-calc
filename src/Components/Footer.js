// src/components/Footer.js
import React from 'react';
import { useSpring, animated } from 'react-spring';

function Footer() {
    const fadeIn = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 1000 }
    });

    return (
        <animated.footer style={fadeIn} className="footer">
            <p>Built with ❤️ and ☕ by <a href="https://github.com/sanjay-gangishetty" target="_blank" rel="noopener noreferrer">Sanjay</a> &copy; 2024 Date Calculator</p>
        </animated.footer>
    );
}

export default Footer;
