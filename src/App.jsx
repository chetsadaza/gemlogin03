import { useEffect } from 'react';
import Home from './pages/Home';

function App() {
    useEffect(() => {
        // Scroll Reveal Animation Initialization
        const revealElements = document.querySelectorAll('.reveal');

        const revealOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const revealOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                } else {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, revealOptions);

        revealElements.forEach(el => {
            revealOnScroll.observe(el);
        });

        // Trigger animations for elements already in viewport on load
        setTimeout(() => {
            document.querySelectorAll('.reveal').forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                    el.classList.add('active');
                }
            });
        }, 100);

        return () => {
            revealOnScroll.disconnect();
        };
    }, []);

    return <Home />;
}

export default App;
