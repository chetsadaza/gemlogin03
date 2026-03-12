import { useEffect, useRef, useState } from 'react';

const Technology = () => {
    const editorRef = useRef(null);
    const [typedText, setTypedText] = useState('');
    const fullText = `{
  "device": {
    "model": "Samsung Galaxy S23 Ultra",
    "os": "Android 14"
  },
  "network": {
    "ip": "Hidden"
  },
  "status": "Secure"
}`;

    useEffect(() => {
        let isTyping = false;
        let index = 0;
        let timeoutId = null;

        const type = () => {
            if (index < fullText.length) {
                setTypedText(fullText.substring(0, index + 1));
                index++;
                timeoutId = setTimeout(type, Math.random() * 30 + 20); // Random delay
            }
        };

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting && !isTyping) {
                    isTyping = true;
                    // Start typing shortly after it comes into view
                    setTimeout(type, 600);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        if (editorRef.current) {
            observer.observe(editorRef.current);
        }

        return () => {
            observer.disconnect();
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, []);

    return (
        <section id="technology" className="feature-section">
            <div className="feature-container row-reverse">
                <div className="feature-text reveal hide-right">
                    <div className="badge-small">Anti-Detect</div>
                    <h2>เทคโนโลยี Anonymous</h2>
                    <p>ใช้เทคโนโลยีขั้นสูงเพื่อปกปิดตัวตนบนอินเทอร์เน็ตอย่างสมบูรณ์</p>
                    <div className="tech-grid">
                        <div className="tech-card">
                            <i className="fas fa-infinity glow-icon"></i>
                            <h4>พารามิเตอร์ไม่จำกัด</h4>
                        </div>
                        <div className="tech-card">
                            <i className="fas fa-microchip glow-icon"></i>
                            <h4>ข้อมูลฮาร์ดแวร์ที่ไม่ซ้ำใคร</h4>
                        </div>
                        <div className="tech-card">
                            <i className="fas fa-user-secret glow-icon"></i>
                            <h4>เหมือนผู้ใช้จริงอย่างแท้จริง</h4>
                        </div>
                    </div>
                </div>
                <div className="feature-visual reveal hide-left">
                    <div className="code-editor-glass" ref={editorRef}>
                        <div className="dash-header">
                            <span className="dot red"></span>
                            <span className="dot yellow"></span>
                            <span className="dot green"></span>
                        </div>
                        <pre>
                            <code>
                                {typedText}
                                <span className="cursor"></span>
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Technology;
