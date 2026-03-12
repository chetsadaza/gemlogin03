const Features = () => {
    return (
        <section id="features" className="feature-section inverse">
            <div className="feature-container">
                <div className="feature-text reveal">
                    <div className="badge-small">Smart Management</div>
                    <h2>Smart Account Manager</h2>
                    <p>จัดการหลายบัญชีข้ามอุปกรณ์ได้อย่างง่ายดายพร้อมการควบคุมเต็มรูปแบบ</p>
                    <ul className="feature-list">
                        <li><i className="fas fa-check-circle"></i> <strong>จัดระเบียบข้อมูล:</strong> เก็บเป็นโฟลเดอร์ต่างๆ เพื่อการจัดการที่ง่าย</li>
                        <li><i className="fas fa-check-circle"></i> <strong>สลับบัญชียืดหยุ่น:</strong> เปลี่ยนข้อมูลบัญชีได้อย่างรวดเร็วระหว่างใช้งาน</li>
                        <li><i className="fas fa-check-circle"></i> <strong>Multithread:</strong> รันอย่างมีประสิทธิภาพ จัดการ tasks พร้อมกัน</li>
                    </ul>
                </div>
                <div className="feature-visual reveal reveal-delay">
                    <div className="glass-card">
                        <div className="account-item">
                            <div className="acc-avatar"></div>
                            <div className="acc-info">
                                <h4>Account 01</h4>
                                <span>Active - Thread 1</span>
                            </div>
                            <div className="status-indicator"></div>
                        </div>
                        <div className="account-item">
                            <div className="acc-avatar yellow"></div>
                            <div className="acc-info">
                                <h4>Account 02</h4>
                                <span>Waiting</span>
                            </div>
                            <div className="status-indicator yellow"></div>
                        </div>
                        <div className="account-item">
                            <div className="acc-avatar purp"></div>
                            <div className="acc-info">
                                <h4>Account 03</h4>
                                <span>Active - Thread 2</span>
                            </div>
                            <div className="status-indicator"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
