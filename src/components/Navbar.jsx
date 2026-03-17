import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleNavClick = (e, targetId) => {
        e.preventDefault();
        
        if (isHomePage) {
            // If on home page, scroll to section
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        } else {
            // If on another page, navigate to home page and then scroll (though standard behavior might just jump, we'll navigate first)
            navigate('/');
            // Add a slight delay to allow the page to render before scrolling
            setTimeout(() => {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-content">
                <Link to="/" className="logo">Gem<span>Login</span></Link>
                <div className="nav-links">
                    <a href="#why" onClick={(e) => handleNavClick(e, '#why')}>ทำไมต้องเรา</a>
                    <a href="#features" onClick={(e) => handleNavClick(e, '#features')}>ฟีเจอร์หลัก</a>
                    <a href="#technology" onClick={(e) => handleNavClick(e, '#technology')}>เทคโนโลยี</a>
                    <a href="#cross-device" onClick={(e) => handleNavClick(e, '#cross-device')}>ข้ามอุปกรณ์</a>
                </div>
                <a href="https://app.gemlogin.io/" className="btn-primary" target="_blank" rel="noopener noreferrer">เริ่มต้นใช้งานฟรี</a>
            </div>
        </nav>
    );
};

export default Navbar;
