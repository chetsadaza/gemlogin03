import { useEffect, useRef } from 'react';

const Hero = () => {
    const viewerRef = useRef(null);

    useEffect(() => {
        const viewer = viewerRef.current;

        const handleWheel = (e) => {
            e.stopPropagation();
        };

        if (viewer) {
            viewer.addEventListener('wheel', handleWheel, { capture: true, passive: true });
        }

        const timer = setTimeout(() => {
            if (viewer && viewer.shadowRoot) {
                const canvas = viewer.shadowRoot.querySelector('canvas');
                if (canvas) {
                    canvas.style.backgroundColor = 'transparent';
                }
                const logo = viewer.shadowRoot.querySelector('#logo');
                if (logo) {
                    logo.remove();
                }
            }
        }, 2000);

        return () => {
            if (viewer) {
                viewer.removeEventListener('wheel', handleWheel, { capture: true });
            }
            clearTimeout(timer);
        };
    }, []);

    return (
        <>
            {/* Spline Full Screen Background */}
            <div className="hero-spline-bg">
                <spline-viewer
                    ref={viewerRef}
                    background="transparent"
                    url="https://prod.spline.design/4yi5BXGV3AuPgoVN/scene.splinecode"
                ></spline-viewer>
                <div className="spline-overlay"></div>
            </div>

            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>

            <header className="hero">
                <div className="hero-content reveal">
                    <div className="badge">🚀 No-Code Mobile Automation Platform</div>
                    <h1 className="gradient-text">สร้าง workflow อัตโนมัติ<br />ด้วยการลากและวาง</h1>
                    <p className="hero-subtitle">ไม่ต้องเขียนโค้ด ก็สร้างแอปพลิเคชัน automation บนมือถือได้อย่างมืออาชีพ</p>
                    <div className="hero-cta">
                        <a href="https://manual.gemlogin.io/" className="btn-primary btn-large" target="_blank" rel="noopener noreferrer">
                            สำรวจฟีเจอร์ <i className="fas fa-arrow-right"></i>
                        </a>
                        <a href="https://www.youtube.com/watch?v=CROjBmJA6rc" className="btn-secondary btn-large" target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-play"></i> ดูวิดีโอสาธิต
                        </a>
                    </div>
                </div>
                {/* Right side empty spacer to push text left */}
                <div className="hero-spacer"></div>
            </header>
        </>
    );
};

export default Hero;
