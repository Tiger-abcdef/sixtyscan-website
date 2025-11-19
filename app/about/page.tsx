// app/about/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="page">
      <div className="page-inner">
        {/* TOP NAV (simple back to home) */}
        <header className="nav">
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

          <nav className="nav-links">
            <Link href="/">หน้าแรก</Link>
            <Link href="/contact">ติดต่อเรา</Link>
          </nav>
        </header>

        {/* ABOUT SECTION */}
        <section className="section section-alt about-hero">
          <h1 className="section-title about-title">
            เกี่ยวกับเรา
          </h1>

          <p className="about-text main">
            แรงบันดาลใจของ <span className="highlight">SixtyScan.life</span>{" "}
            เริ่มจากคนใกล้ตัวที่บ้านของเรา ที่เป็นผู้ป่วยโรคพาร์กินสัน
            ทำให้เห็นถึงความยากลำบากของท่านและผู้ที่เกี่ยวข้องทุกคน
            จึงเกิดคำถามว่า&nbsp;
            <span className="highlight">
              “ถ้าช่วยให้ผู้คนเข้าถึงการรักษาได้เร็ว จะช่วยสังคมได้มากแค่ไหน”
            </span>
          </p>

          <p className="about-text">
            ด้วยความตั้งใจนั้น จึงนำความคิดไปปรึกษาคุณครู
            และได้รวมทีมกันใช้เทคโนโลยีปัญญาประดิษฐ์
            พัฒนาเป็นเครื่องมือคัดกรองความเสี่ยงจากเสียงพูดที่ใช้งานได้จริง
            เข้าใจง่าย และเข้าถึงได้จากที่บ้าน
          </p>
        </section>

        {/* AWARDS / COLLAB SECTION */}
        <section className="section">
          <div className="section-alt about-awards">
            <p className="about-text">
              จากแนวคิดนี้ เราได้รับรางวัลจาก{" "}
              <span className="highlight">AI Builder 2025</span>{" "}
              และปัจจุบันเรามีโอกาสทำงานร่วมกับแพทย์ผู้เชี่ยวชาญด้านประสาทวิทยา
            </p>

            <p className="about-text">
              ได้แก่{" "}
              <span className="highlight">นพ.ณัฐฏ์ กล้าผจญ</span>{" "}
              และ{" "}
              <span className="highlight">ผศ.นพ.สุรัตน์ ตันประเวช</span>{" "}
              จาก{" "}
              <span className="highlight">
                MED CMU Health Innovation Center (MedCHIC) มหาวิทยาลัยเชียงใหม่
              </span>
            </p>
          </div>
        </section>

        {/* DOCTOR PHOTOS */}
        <section className="section">
          <h2 className="section-title large">ทีมแพทย์ที่ให้คำปรึกษา</h2>

          <div className="about-photos">
            <div className="about-photo-card">
              <div className="about-photo-wrap">
                <Image
                  src="/doctor-1.jpg"
                  alt="ทีมแพทย์ที่ให้คำปรึกษา 1"
                  fill
                  className="about-photo-img"
                  sizes="(max-width: 768px) 100vw, 360px"
                />
              </div>
              <p className="about-photo-caption">
                การขอคำปรึกษาจากแพทย์ด้านประสาทวิทยา (Jul 2025)
              </p>
            </div>

            <div className="about-photo-card">
              <div className="about-photo-wrap">
                <Image
                  src="/doctor-2.jpg"
                  alt="ทีมแพทย์ที่ให้คำปรึกษา 2"
                  fill
                  className="about-photo-img"
                  sizes="(max-width: 768px) 100vw, 360px"
                />
              </div>
              <p className="about-photo-caption">
                การทำงานร่วมกับทีมแพทย์และผู้เชี่ยวชาญด้านสมอง
              </p>
            </div>
          </div>
        </section>

        <footer className="footer">
          <p>© {new Date().getFullYear()} SixtyScan.life</p>
        </footer>
      </div>
    </main>
  );
}
