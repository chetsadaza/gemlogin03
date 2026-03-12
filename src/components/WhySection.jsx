const WhySection = () => {
    return (
        <section id="why" className="why-section">
            <div className="section-header reveal">
                <h2>ทำไมต้อง <span className="gradient-text">GemLogin</span></h2>
                <p>โซลูชัน Automation ครบวงจร สร้างแอปพลิเคชันบนมือถือโดยไม่ต้องเขียนโปรแกรม</p>
            </div>

            <div className="bento-grid">
                <div className="bento-card reveal">
                    <div className="card-icon"><i className="fas fa-store"></i></div>
                    <h3>Marketplace</h3>
                    <p>แอปพลิเคชันพร้อมใช้งาน เข้าถึงแอปพลิเคชันที่พัฒนาโดยชุมชนของเรา ทุก automation ที่คุณต้องการมีใน Marketplace</p>
                    <a href="#" className="learn-more">เรียนรู้เพิ่มเติม <i className="fas fa-chevron-right"></i></a>
                </div>
                <div className="bento-card highlight reveal reveal-delay">
                    <div className="card-icon"><i className="fas fa-hand-pointer"></i></div>
                    <h3>ลากและวาง</h3>
                    <p>ไม่ต้องเขียนโปรแกรม สร้างแอปพลิเคชัน automation ด้วยการลากและวางอย่างง่าย การเขียน automation บนมือถือไม่เคยง่ายขนาดนี้</p>
                    <div className="drag-demo">
                        <div className="drag-item">Module 1</div>
                        <div className="drag-target">Drop Here</div>
                    </div>
                    <a href="#" className="learn-more mt-auto">เรียนรู้เพิ่มเติม <i className="fas fa-chevron-right"></i></a>
                </div>
                <div className="bento-card reveal reveal-delay-2">
                    <div className="card-icon"><i className="fas fa-shield-alt"></i></div>
                    <h3>ความเป็นส่วนตัว</h3>
                    <p>ปกป้องสูงสุด ใช้เทคโนโลยี anti-detection ที่ทรงพลัง พร้อมข้อมูลอุปกรณ์จริงเพื่อเปลี่ยนพารามิเตอร์อย่างปลอดภัย</p>
                    <a href="#" className="learn-more">เรียนรู้เพิ่มเติม <i className="fas fa-chevron-right"></i></a>
                </div>
            </div>
        </section>
    );
};

export default WhySection;
