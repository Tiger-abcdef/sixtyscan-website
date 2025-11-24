// app/contact/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function ContactPage() {
  return (
    <main className="page">
      <div className="page-inner">
        {/* ⬅ FIXED HEADER — MATCHES HOME PAGE */}
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
            <Link href="/about">เกี่ยวกับเรา</Link>
            <Link href="/history">ประวัติการตรวจ</Link> {/* keep consistency */}
          </nav>
        </header>

        {/* PAGE CONTENT */}
        <section className="section section-alt contact-page">
          <h1 className="section-title large">ติดต่อเรา</h1>

          <div className="contact-grid contact-grid-large">
            <div className="contact-card">
              <p className="contact-label big">ที่อยู่</p>
              <p className="contact-text bigger strong">
                121/11 อาคารอีคิวสแควร์ ถนนเชียงใหม่–ฮอด ตำบลป่าแดด
                อำเภอเมืองเชียงใหม่ จังหวัดเชียงใหม่ 50100
              </p>
            </div>

            <div className="contact-card">
              <p className="contact-label big">โทรศัพท์</p>
              <p className="contact-phone contact-phone-big">064-9506228</p>
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
