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
                width={40}
                height={40}
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
                ตรวจเช็คความเสี่ยงเบื้องต้นจากเสียงของคุณ ภายในไม่กี่นาที
              </p>

              <h1 className="hero-title">
                ตรวจเช็คโรคพาร์กินสันล่วงหน้า{" "}
                <span className="hero-highlight">ด้วยเสียงพูดของคุณ</span>
              </h1>

              <p className="hero-desc">
                SixtyScan ใช้ปัญญาประดิษฐ์วิเคราะห์เสียงของคุณจากการออกเสียงง่าย ๆ
                เช่น สระยาว คำว่า “Pa-Ta-Ka” และประโยคตัวอย่าง
                เพื่อช่วยประเมินความเสี่ยงของโรคพาร์กินสันในระยะเริ่มต้น
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
                  พัฒนาเพื่อช่วยคัดกรองเบื้องต้น ไม่ใช่การวินิจฉัยทางการแพทย์
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
          <h2 className="section-title">SixtyScan ทำงานอย่างไร</h2>
          <p className="section-desc">
            ระบบจะให้คุณอ่านประโยคตัวอย่าง ออกเสียงสระ และพูด &quot;Pa-Ta-Ka&quot;
            จากนั้นแบบจำลอง AI จะเปลี่ยนเสียงเป็นสเปกโตรแกรมและวิเคราะห์รูปแบบเสียง
          </p>

          <div className="cards-grid">
            <div className="card">
              <h3>1. บันทึกเสียงสั้น ๆ</h3>
              <p>
                ผู้ใช้พูดตามตัวอย่างสั้น ๆ ประมาณ 6–8 วินาทีต่อรายการ
                ผ่านไมโครโฟนของโทรศัพท์หรือคอมพิวเตอร์
              </p>
            </div>

            <div className="card">
              <h3>2. วิเคราะห์ด้วย AI</h3>
              <p>
                SixtyScan แปลงเสียงเป็นสเปกโตรแกรมและดึงคุณลักษณะเสียง
                เพื่อนำเข้าโมเดล AI ที่ผ่านการฝึกจากข้อมูลเสียงของผู้ป่วยพาร์กินสัน
                และคนทั่วไป
              </p>
            </div>

            <div className="card">
              <h3>3. แสดงผลความเสี่ยงเบื้องต้น</h3>
              <p>
                ระบบจะแสดงผลว่า &quot;มีแนวโน้มเป็นพาร์กินสัน&quot; หรือ
                &quot;ไม่น่าจะเป็น&quot; พร้อมเปอร์เซ็นต์ความมั่นใจและคำแนะนำเบื้องต้น
              </p>
            </div>
          </div>
        </section>

        {/* ABOUT / STORY */}
        <section id="about" className="section section-alt">
          <h2 className="section-title">เกี่ยวกับ SixtyScan</h2>
          <p className="section-desc">
            แรงบันดาลใจของ SixtyScan.life เริ่มจากคนใกล้ตัวที่บ้านของเรา
            ที่เป็นผู้ป่วยโรคพาร์กินสัน ทำให้เห็นถึงความยากลำบากของท่านและผู้ที่เกี่ยวข้อง
            จึงเกิดคำถามว่า &quot;ถ้าช่วยให้ผู้ป่วยเข้าถึงการตรวจและรักษาได้เร็วกว่านี้
            จะช่วยสังคมได้มากแค่ไหน&quot;
          </p>

          <p className="section-desc">
            ด้วยความตั้งใจนั้น จึงนำความคิดไปปรึกษาคุณครูและทีมแพทย์
            พัฒนาเป็นนวัตกรรมคัดกรองความเสี่ยงจากเสียงพูด
            เพื่อให้ผู้คนเข้าถึงการประเมินเบื้องต้นได้ง่ายขึ้น
          </p>
        </section>

        {/* AWARDS / PARTNERS */}
        <section id="awards" className="section">
          <h2 className="section-title">รางวัลและความร่วมมือ</h2>
          <p className="section-desc">
            จากแนวคิดนี้ SixtyScan ได้รับรางวัลและมีโอกาสทำงานร่วมกับหน่วยงานทางการแพทย์
            และนวัตกรรมด้านสุขภาพ
          </p>

          <div className="partner-grid">
            <div className="partner-card">
              <p className="partner-title">AI Builder 2025</p>
              <p className="partner-text">
                โครงการได้รับการคัดเลือกในเวที AI Builder 2025
                ในฐานะนวัตกรรมด้านสุขภาพที่ใช้ AI เพื่อช่วยสังคม
              </p>
            </div>

            <div className="partner-card">
              <p className="partner-title">
                MED CMU Health Innovation Center (MedCHIC)
              </p>
              <p className="partner-text">
                ได้รับคำปรึกษาจากทีมแพทย์และผู้เชี่ยวชาญด้านประสาทวิทยา
                เพื่อออกแบบแนวทางการใช้งานที่เหมาะสมทางการแพทย์
              </p>
            </div>

            <div className="partner-card partner-logo-card">
              <Image
                src="/tamdai-logo.png"
                alt="TamDai logo"
                width={180}
                height={60}
                className="partner-logo"
              />
              <p className="partner-text">
                พัฒนาโดยทีมเยาวชนร่วมกับ TamDai ภายใต้แนวคิด
                ใช้เทคโนโลยีเพื่อช่วยให้ผู้คนเข้าถึงการเรียนรู้และสุขภาพที่ดีขึ้น
              </p>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section section-alt">
          <h2 className="section-title">ติดต่อเรา</h2>

          <div className="contact-grid">
            <div className="contact-card">
              <p className="contact-label">ที่อยู่</p>
              <p className="contact-text">
                121/11 อาคารอีคิวสแควร์ ถนนเชียงใหม่–ฮอด ตำบลป่าแดด
                อำเภอเมืองเชียงใหม่ จังหวัดเชียงใหม่ 50100
              </p>
            </div>

            <div className="contact-card">
              <p className="contact-label">โทรศัพท์</p>
              <p className="contact-phone">064-9506228</p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <p>© {new Date().getFullYear()} SixtyScan.life — สำหรับการศึกษาและวิจัยเท่านั้น</p>
          <p className="footer-small">
            ผลลัพธ์จากระบบนี้ไม่ใช่การวินิจฉัยทางการแพทย์
            กรุณาปรึกษาแพทย์ผู้เชี่ยวชาญก่อนตัดสินใจเกี่ยวกับสุขภาพของท่าน
          </p>
        </footer>
      </div>
    </main>
  );
}
