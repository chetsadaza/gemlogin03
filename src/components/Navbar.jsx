import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
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

    // Close mobile menu on route change
    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);

    const handleNavClick = (e, targetId) => {
        e.preventDefault();
        setMenuOpen(false);
        
        if (isHomePage) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        } else {
            navigate('/');
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
        <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
            <div className="nav-content">
                <Link to="/" className="logo">Gem<span>Login</span></Link>
                
                {/* Desktop nav */}
                <div className="nav-links">
                    <a href="#why" onClick={(e) => handleNavClick(e, '#why')}>ทำไมต้องเรา</a>
                    <a href="#features" onClick={(e) => handleNavClick(e, '#features')}>ฟีเจอร์หลัก</a>
                    <a href="#technology" onClick={(e) => handleNavClick(e, '#technology')}>เทคโนโลยี</a>
                    <a href="#cross-device" onClick={(e) => handleNavClick(e, '#cross-device')}>ข้ามอุปกรณ์</a>
                </div>
                <a href="https://app.gemlogin.io/" className="btn-primary nav-cta-desktop" target="_blank" rel="noopener noreferrer">เริ่มต้นใช้งานฟรี</a>

                {/* Hamburger button */}
                <button
                    className={`hamburger ${menuOpen ? 'active' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                >
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </button>
            </div>

            {/* Mobile menu overlay */}
            <div className={`mobile-menu-overlay ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(false)}></div>

            {/* Mobile menu */}
            <div className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
                <a href="#why" onClick={(e) => handleNavClick(e, '#why')}>ทำไมต้องเรา</a>
                <a href="#features" onClick={(e) => handleNavClick(e, '#features')}>ฟีเจอร์หลัก</a>
                <a href="#technology" onClick={(e) => handleNavClick(e, '#technology')}>เทคโนโลยี</a>
                <a href="#cross-device" onClick={(e) => handleNavClick(e, '#cross-device')}>ข้ามอุปกรณ์</a>
                <a href="https://app.gemlogin.io/" className="btn-primary mobile-cta" target="_blank" rel="noopener noreferrer">เริ่มต้นใช้งานฟรี</a>
            </div>
        </nav>
    );
};

export default Navbar;
