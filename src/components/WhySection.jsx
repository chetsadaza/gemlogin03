import { useRef } from 'react';
import imgDefault from '../assets/images/1.png';
import imgHover from '../assets/images/2.png';

const TiltSwapCard = () => {
    const cardRef = useRef(null);

    return (
        <div
            ref={cardRef}
            className="bento-card span-2 bento-tilt reveal reveal-delay"
        >
            <div className="bento-tilt-media" aria-label="3D hover preview">
                <img className="bento-tilt-img img-a" src={imgDefault} alt="Preview 1" />
                <img className="bento-tilt-img img-b" src={imgHover} alt="Preview 2" />
                <div className="bento-tilt-glare" aria-hidden="true" />
            </div>
        </div>
    );
};

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
                <div className="bento-card privacy-card reveal reveal-delay-2">
                    <div className="card-icon"><i className="fas fa-shield-alt"></i></div>
                    <h3>ความเป็นส่วนตัว</h3>
                    <p>ปกป้องสูงสุด ใช้เทคโนโลยี anti-detection ที่ทรงพลัง พร้อมข้อมูลอุปกรณ์จริงเพื่อเปลี่ยนพารามิเตอร์อย่างปลอดภัย</p>
                    <a href="#" className="learn-more">เรียนรู้เพิ่มเติม <i className="fas fa-chevron-right"></i></a>
                </div>
                <TiltSwapCard />
            </div>
        </section>
    );
};

export default WhySection;
