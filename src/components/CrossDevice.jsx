const CrossDevice = () => {
    return (
        <section id="cross-device" className="cross-device-section">
            <div className="section-header reveal">
                <h2>Automation <span className="gradient-text">ข้ามอุปกรณ์</span></h2>
                <p>รวมและใช้อุปกรณ์ต่างๆ ที่คุณมีอยู่อย่างไร้รอยต่อ เชี่ยวชาญใน 30 นาที</p>
            </div>

            <div className="device-grid reveal reveal-delay">
                <div className="device-card">
                    <i className="fas fa-server"></i>
                    <h3>BoxPhoneFarm</h3>
                </div>
                <div className="device-card">
                    <i className="fas fa-mobile-alt"></i>
                    <h3>Phone Emulator</h3>
                </div>
                <div className="device-card">
                    <i className="fas fa-cloud"></i>
                    <h3>Cloud Phone</h3>
                </div>
            </div>

            <div className="platform-support reveal">
                <p>รองรับหลายแพลตฟอร์ม</p>
                <div className="social-icons">
                    <i className="fab fa-facebook"></i>
                    <i className="fab fa-tiktok"></i>
                    <i className="fab fa-instagram"></i>
                    <i className="fab fa-x-twitter"></i>
                </div>
            </div>

            <div className="modules-banner reveal">
                <div className="banner-content">
                    <h2>50+ Modules</h2>
                    <p>พร้อมใช้งานบน Store ทันที</p>
                    <a href="https://gemlogin.io/download" className="btn-primary mt-4" target="_blank" rel="noopener noreferrer">
                        ไปที่ Store
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CrossDevice;
