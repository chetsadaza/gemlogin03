import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Cloud from './pages/Cloud/Cloud';

function App() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Scroll to top on route change (unless there is a hash link)
        if (!window.location.hash) {
            window.scrollTo(0, 0);
        }

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
    }, [pathname]);

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cloud" element={<Cloud />} />
        </Routes>
    );
}

export default App;
