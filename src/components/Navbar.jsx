import { useState, useEffect } from 'react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

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

    const scrollToSection = (e, targetId) => {
        e.preventDefault();
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for navbar height
                behavior: 'smooth'
            });
        }
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-content">
                <a href="#" className="logo">Gem<span>Login</span></a>
                <div className="nav-links">
                    <a href="#why" onClick={(e) => scrollToSection(e, '#why')}>ทำไมต้องเรา</a>
                    <a href="#features" onClick={(e) => scrollToSection(e, '#features')}>ฟีเจอร์หลัก</a>
                    <a href="#technology" onClick={(e) => scrollToSection(e, '#technology')}>เทคโนโลยี</a>
                    <a href="#cross-device" onClick={(e) => scrollToSection(e, '#cross-device')}>ข้ามอุปกรณ์</a>
                </div>
                <a href="https://app.gemlogin.io/" className="btn-primary" target="_blank" rel="noopener noreferrer">เริ่มต้นใช้งานฟรี</a>
            </div>
        </nav>
    );
};

export default Navbar;
