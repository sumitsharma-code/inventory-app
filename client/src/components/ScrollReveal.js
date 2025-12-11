import React, { useRef, useEffect, useState } from 'react';
import './LandingPage.css'; // Ensure CSS is available

const ScrollReveal = ({ children, threshold = 0.1, delay = '0s' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold });

        const currentRef = domRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [threshold]);

    return (
        <div
            ref={domRef}
            className={`scroll-reveal ${isVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: delay }}
        >
            {children}
        </div>
    );
};

export default ScrollReveal;
