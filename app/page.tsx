// app/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="page">
      <div className="page-inner">
        {/* NAVBAR */}
        <header
          className="nav"
          style={{
            borderBottom: "4px solid #1e293b",
            boxShadow: "0 3px 6px rgba(15, 23, 42, 0.15)",
            paddingBottom: "16px",
            marginBottom: "24px",
            backgroundColor: "#f9fbff",
          }}
        >
          <div className="nav-left">
            <div className="logo-wrap">
              <Image
                src="/sixtyscan-logo.png"
                alt="SixtyScan logo"
                width={56}
                height={56}
                className="logo-img"
              />
              <div className="logo-text">
                <span className="logo-title">SixtyScan</span>
              </div>
            </div>
          </div>

          <nav className="nav-links">
            <Link href="/about">เกี่ยวกับเรา</Link>
            <Link href="/contact">ติดต่อเรา</Link>
          </nav>
        </header>

        {/* HERO */}
        <section className="hero">
          <div className="hero-grid">
            {/* Left side text */}
            <div className="hero-text">
              {/* pill removed per request */}

              <h1 className="hero-title">
                ตรวจเช็คโรคพาร์กินสันล่วงหน้า{" "}
                <span className="hero-highlight">ด้วยเสียงพูดของคุณ</span>
              </h1>

             <p className="hero-desc">
                บันทึกเสียง แล้วให้ SixtyScan ประเมินความเสี่ยงเบื้องต้นของโรคพาร์กินสัน ภายใน 3 นาที
             </p>

              <div className="hero-actions">
                <Link href="/login" className="btn-primary">
                  เริ่มตรวจเสียง 
                </Link>

                <a href="#how-it-works" className="btn-secondary">
                  ดูวิธีการทำงาน
                </a>
              </div>

              <div className="hero-badges">
                <div className="badge">
                  สำหรับการคัดกรองเบื้องต้นเท่านั้น
                  ไม่ใช่การวินิจฉัยทางการแพทย์
                </div>
              </div>
            </div>

            {/* Right side image */}
            <div className="hero-image-wrap">
              <div className="hero-image-card">
                <Image
                  src="/hero-voice.png"
                  alt="Voice analysis illustration"
                  fill
                  className="hero-image"
                  sizes="(max-width: 768px) 100vw, 520px"
                />
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="section">
          <h2 className="section-title large">
            SixtyScan ทำงานอย่างไร
          </h2>

          {/* subtitle removed per request */}

          <div className="cards-grid cards-grid-large">
            <div className="card simple-card">
              <span className="step-number">1</span>
              <p className="step-title">บันทึกเสียงสั้น ๆ</p>
            </div>

            <div className="card simple-card">
              <span className="step-number">2</span>
              <p className="step-title">วิเคราะห์ด้วย AI</p>
            </div>

            <div className="card simple-card">
              <span className="step-number">3</span>
              <p className="step-title">แสดงผลความเสี่ยงเบื้องต้น</p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <p>© {new Date().getFullYear()} SixtyScan.life</p>
          <p className="footer-small">
            ผลลัพธ์จากระบบนี้เป็นเพียงการประเมินเบื้องต้น
            กรุณาปรึกษาแพทย์ผู้เชี่ยวชาญสำหรับคำแนะนำด้านสุขภาพ
          </p>
        </footer>
      </div>
    </main>
  );
}
