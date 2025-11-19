// app/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="page">
      <div className="page-inner">
        {/* NAVBAR */}
        <header className="nav">
          <div className="nav-left">
            <div className="logo-wrap">
              <Image
                src="/sixtyscan-logo.png"
                alt="SixtyScan logo"
                width={44}
                height={44}
                className="logo-img"
              />
              <div className="logo-text">
                <span className="logo-title">SixtyScan</span>
                <span className="logo-sub">
                  นวัตกรรมคัดกรองโรคพาร์กินสันจากเสียงพูด
                </span>
              </div>
            </div>
          </div>

          <nav className="nav-links">
            <a href="#about">เกี่ยวกับเรา</a>
            <a href="#awards">รางวัล / ความร่วมมือ</a>
            <a href="#contact">ติดต่อเรา</a>
          </nav>
        </header>

        {/* HERO */}
        <section className="hero">
          <div className="hero-grid">
            {/* Left side text */}
            <div className="hero-text">
              <p className="pill">
                ตรวจเช็คความเสี่ยงจากเสียงของคุณ ภายในไม่กี่นาที
              </p>

              <h1 className="hero-title">
                ตรวจเช็คโรคพาร์กินสันล่วงหน้า{" "}
                <span className="hero-highlight">ด้วยเสียงพูดของคุณ</span>
              </h1>

              <p className="hero-desc">
                บันทึกเสียงสั้น ๆ แล้วให้ SixtyScan วิเคราะห์ด้วยปัญญาประดิษฐ์
                เพื่อช่วยประเมินความเสี่ยงเบื้องต้นของโรคพาร์กินสัน
                ผ่านหน้าเว็บที่ใช้งานง่าย เหมาะสำหรับผู้สูงอายุ
              </p>

              <div className="hero-actions">
                <Link href="/login" className="btn-primary">
                  เริ่มตรวจเสียง (เข้าสู่ระบบด้วย Google)
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
                  sizes="(max-width: 768px) 100vw, 480px"
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
          <p className="section-desc bigger">
            ขั้นตอนง่าย ๆ 3 ข้อ
          </p>

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

        {/* ABOUT / STORY */}
        <section id="about" className="section section-alt">
          <h2 className="section-title large">เกี่ยวกับ SixtyScan</h2>
          <p className="section-desc bigger">
            SixtyScan เกิดจากแรงบันดาลใจจากผู้ป่วยพาร์กินสันใกล้ตัวเรา
            เราอยากให้คนทั่วไปเข้าถึงการประเมินความเสี่ยงได้เร็วและสะดวกขึ้น
            ผ่านการใช้เสียงพูดที่ทุกคนมีอยู่แล้ว
          </p>
        </section>

        {/* AWARDS / PARTNERS */}
        <section id="awards" className="section">
          <h2 className="section-title large">รางวัลและความร่วมมือ</h2>
          <p className="section-desc bigger">
            โครงการได้รับการสนับสนุนจากเวทีด้านนวัตกรรมสุขภาพและแพทย์ผู้เชี่ยวชาญ
          </p>

          <div className="partner-grid">
            <div className="partner-card">
              <p className="partner-title big">AI Builder 2025</p>
              <p className="partner-text">
                นวัตกรรมด้านสุขภาพที่ใช้ AI เพื่อช่วยสังคม
              </p>
            </div>

            <div className="partner-card">
              <p className="partner-title big">
                MED CMU Health Innovation Center (MedCHIC)
              </p>
              <p className="partner-text">
                ได้รับคำปรึกษาจากทีมแพทย์และผู้เชี่ยวชาญด้านประสาทวิทยา
              </p>
            </div>

            <div className="partner-card partner-logo-card">
              <Image
                src="/tamdai-logo.png"
                alt="TamDai logo"
                width={190}
                height={70}
                className="partner-logo"
              />
              <p className="partner-text">
                พัฒนาโดยทีมเยาวชนร่วมกับ TamDai ภายใต้แนวคิด
                ใช้เทคโนโลยีเพื่อช่วยให้ผู้คนเข้าถึงโอกาสที่ดีขึ้น
              </p>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section section-alt">
          <h2 className="section-title large">ติดต่อเรา</h2>

          <div className="contact-grid">
            <div className="contact-card">
              <p className="contact-label big">ที่อยู่</p>
              <p className="contact-text bigger">
                121/11 อาคารอีคิวสแควร์ ถนนเชียงใหม่–ฮอด ตำบลป่าแดด
                อำเภอเมืองเชียงใหม่ จังหวัดเชียงใหม่ 50100
              </p>
            </div>

            <div className="contact-card">
              <p className="contact-label big">โทรศัพท์</p>
              <p className="contact-phone">064-9506228</p>
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
