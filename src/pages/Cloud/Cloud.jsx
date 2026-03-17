import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Cloud = () => {
    return (
        <>
            <Navbar />
            
            {/* Cloud Hero Section */}
            <section className="hero" style={{ paddingTop: '120px', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
                <div className="container">
                    <div className="hero-content" style={{ textAlign: 'center', margin: '0 auto' }}>
                        <div className="badge reveal">
                            <i className="fa-solid fa-cloud"></i> GemLogin Cloud
                        </div>
                        <h1 className="reveal" style={{ animationDelay: '0.1s' }}>
                            ระบบคลาวด์ <span className="highlight">ทรงพลัง</span><br />
                            ที่พร้อมขับเคลื่อนบอทของคุณ
                        </h1>
                        <p className="hero-subtitle reveal" style={{ animationDelay: '0.2s' }}>
                            รันบอทได้ต่อเนื่อง 24/7 ไม่ต้องเปิดคอมพิวเตอร์ทิ้งไว้ จัดการทุกอย่างผ่าน Dashboard เดียว
                        </p>
                        <div className="hero-buttons reveal" style={{ justifyContent: 'center', animationDelay: '0.3s' }}>
                            <a href="#" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                <i className="fa-solid fa-rocket"></i> เริ่มต้นใช้งาน Cloud
                            </a>
                            <a href="/" className="btn btn-secondary">
                                กลับหน้าหลัก
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Cloud;
