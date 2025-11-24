// app/about/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="page">
      <div className="page-inner">
        {/* NAVBAR – same style as homepage */}
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
            <Link href="/">หน้าแรก</Link>
            <Link href="/contact">ติดต่อเรา</Link>
            <Link href="/history">ประวัติการตรวจ</Link>
          </nav>
        </header>

        {/* MAIN ABOUT CARD – intro + awards in one neat layout */}
        <section className="section section-alt about-hero">
          <div
            style={{
              maxWidth: "960px",
              margin: "0 auto",
              padding: "1.75rem 1.9rem 2rem",
              borderRadius: "1.6rem",
              backgroundColor: "rgba(248,250,252,0.96)",
              boxShadow: "0 24px 60px rgba(15,23,42,0.18)",
              border: "1px solid rgba(148,163,184,0.45)",
            }}
          >
            <h1
              className="section-title about-title"
              style={{ textAlign: "center", marginBottom: "1.4rem" }}
            >
              เกี่ยวกับเรา
            </h1>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1.6fr) minmax(0, 1.4fr)",
                gap: "1.75rem",
                alignItems: "flex-start",
              }}
            >
              {/* LEFT: story / inspiration */}
              <div>
                <p className="about-text main">
                  แรงบันดาลใจของ{" "}
                  <span className="highlight">SixtyScan.life</span>{" "}
                  เริ่มจากคนใกล้ตัวที่บ้านของเรา ที่เป็นผู้ป่วยโรคพาร์กินสัน
                  ทำให้เห็นถึงความยากลำบากของท่านและผู้ที่เกี่ยวข้องทุกคน
                  จึงเกิดคำถามว่า&nbsp;
                  <span className="highlight">
                    “ถ้าช่วยให้ผู้คนเข้าถึงการรักษาได้เร็ว
                    จะช่วยสังคมได้มากแค่ไหน”
                  </span>
                </p>

                <p className="about-text">
                  ด้วยความตั้งใจนั้น จึงนำความคิดไปปรึกษาคุณครู
                  และได้รวมทีมกันใช้เทคโนโลยีปัญญาประดิษฐ์
                  พัฒนาเป็นเครื่องมือคัดกรองความเสี่ยงจากเสียงพูดที่ใช้งานได้จริง
                  เข้าใจง่าย และเข้าถึงได้จากที่บ้าน
                </p>
              </div>

              {/* RIGHT: awards / collaboration */}
              <div
                style={{
                  padding: "1.1rem 1.25rem",
                  borderRadius: "1.2rem",
                  backgroundColor: "#e5f0ff",
                  border: "1px solid rgba(148,163,184,0.55)",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#0f172a",
                    marginBottom: "0.75rem",
                  }}
                >
                  รางวัลและความร่วมมือ
                </h2>

                <p className="about-text" style={{ marginBottom: "0.6rem" }}>
                  จากแนวคิดนี้ เราได้รับรางวัลจาก{" "}
                  <span className="highlight">AI Builder 2025</span>{" "}
                  และปัจจุบันเรามีโอกาสทำงานร่วมกับแพทย์ผู้เชี่ยวชาญด้านประสาทวิทยา
                </p>

                <p className="about-text">
                  ได้แก่{" "}
                  <span className="highlight">นพ.ณัฐฏ์ กล้าผจญ</span> และ{" "}
                  <span className="highlight">ผศ.นพ.สุรัตน์ ตันประเวช</span>{" "}
                  จาก{" "}
                  <span className="highlight">
                    MED CMU Health Innovation Center (MedCHIC)
                    มหาวิทยาลัยเชียงใหม่
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* DOCTOR PHOTOS – in its own clean card */}
        <section className="section">
          <div
            style={{
              maxWidth: "960px",
              margin: "0 auto",
              padding: "1.75rem 1.9rem 2.1rem",
              borderRadius: "1.6rem",
              backgroundColor: "#f1f5f9",
              boxShadow: "0 18px 45px rgba(15,23,42,0.12)",
              border: "1px solid rgba(148,163,184,0.4)",
            }}
          >
            <h2
              className="section-title large"
              style={{ textAlign: "center", marginBottom: "1.4rem" }}
            >
              ทีมแพทย์ที่ให้คำปรึกษา
            </h2>

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
          </div>
        </section>

        <footer className="footer">
          <p>© {new Date().getFullYear()} SixtyScan.com</p>
        </footer>
      </div>
    </main>
  );
}
