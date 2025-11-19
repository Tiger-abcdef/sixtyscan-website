// app/page.tsx

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #111827, #020617)",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          width: "100%",
        }}
      >
        {/* Logo + Name */}
        <div style={{ marginBottom: "2rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.5rem 1rem",
              borderRadius: "999px",
              backgroundColor: "rgba(15,23,42,0.9)",
              border: "1px solid rgba(148,163,184,0.4)",
              fontSize: "0.9rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "999px",
                background:
                  "conic-gradient(from 180deg at 50% 50%, #38bdf8, #22c55e, #a855f7, #38bdf8)",
                marginRight: "0.5rem",
              }}
            />
            SixtyScan · Early Parkinson Risk Check
          </div>
        </div>

        {/* Hero text */}
        <h1
          style={{
            fontSize: "2.75rem",
            lineHeight: 1.1,
            marginBottom: "1rem",
          }}
        >
          Detect Parkinson&#39;s{" "}
          <span style={{ color: "#38bdf8" }}>early</span>  
          through simple voice analysis.
        </h1>

        <p
          style={{
            fontSize: "1.1rem",
            lineHeight: 1.6,
            color: "#cbd5f5",
            maxWidth: "700px",
            marginBottom: "2rem",
          }}
        >
          SixtyScan analyzes short recordings of your speech to look for subtle
          changes that may be associated with Parkinson&#39;s disease. Designed
          for research and pre-screening support — not as a replacement for a
          doctor or official diagnosis.
        </p>

        {/* Call to action buttons */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            marginBottom: "2.5rem",
          }}
        >
          <a
            href="#coming-soon"
            style={{
              padding: "0.9rem 1.6rem",
              borderRadius: "999px",
              background:
                "linear-gradient(to right, #38bdf8, #22c55e, #a855f7)",
              color: "white",
              fontWeight: 600,
              textDecoration: "none",
              fontSize: "1rem",
            }}
          >
            Start Voice Check (coming soon)
          </a>

          <a
            href="#about"
            style={{
              padding: "0.9rem 1.6rem",
              borderRadius: "999px",
              border: "1px solid rgba(148,163,184,0.6)",
              color: "#e5e7eb",
              fontWeight: 500,
              textDecoration: "none",
              fontSize: "1rem",
            }}
          >
            Learn more about the project
          </a>
        </div>

        {/* Info cards */}
        <section
          id="about"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              padding: "1.25rem",
              borderRadius: "1rem",
              backgroundColor: "rgba(15,23,42,0.9)",
              border: "1px solid rgba(55,65,81,0.8)",
            }}
          >
            <h2 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
              How it works
            </h2>
            <p style={{ fontSize: "0.95rem", color: "#cbd5f5", lineHeight: 1.5 }}>
              You read a short sentence, sustain vowels, and say &quot;Pa-Ta-Ka&quot;.
              Our AI model converts your voice into spectrograms and analyzes
              acoustic patterns.
            </p>
          </div>

          <div
            style={{
              padding: "1.25rem",
              borderRadius: "1rem",
              backgroundColor: "rgba(15,23,42,0.9)",
              border: "1px solid rgba(55,65,81,0.8)",
            }}
          >
            <h2 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
              What you get
            </h2>
            <p style={{ fontSize: "0.95rem", color: "#cbd5f5", lineHeight: 1.5 }}>
              A Parkinson / non-Parkinson risk indication, probability score,
              and easy-to-read explanation — created for educational and
              research use.
            </p>
          </div>

          <div
            style={{
              padding: "1.25rem",
              borderRadius: "1rem",
              backgroundColor: "rgba(15,23,42,0.9)",
              border: "1px solid rgba(55,65,81,0.8)",
            }}
          >
            <h2 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
              Important notice
            </h2>
            <p style={{ fontSize: "0.95rem", color: "#cbd5f5", lineHeight: 1.5 }}>
              SixtyScan does not provide medical diagnosis or treatment.
              Always consult a neurologist or qualified doctor for any health
              decisions.
            </p>
          </div>
        </section>

        {/* Coming soon section */}
        <section
          id="coming-soon"
          style={{
            padding: "1.15rem 1.25rem",
            borderRadius: "1rem",
            background:
              "linear-gradient(to right, rgba(56,189,248,0.12), rgba(168,85,247,0.12))",
            border: "1px solid rgba(56,189,248,0.4)",
          }}
        >
          <p
            style={{
              fontSize: "0.95rem",
              color: "#e5e7eb",
              lineHeight: 1.5,
            }}
          >
            Full interactive voice test, user accounts, and optional QR-code
            donations are in development. This site is an early preview of the
            SixtyScan project.
          </p>
        </section>

        {/* Footer */}
        <footer
          style={{
            marginTop: "2.5rem",
            fontSize: "0.8rem",
            color: "#9ca3af",
          }}
        >
          © {new Date().getFullYear()} SixtyScan. Built as a research and
          student innovation project.
        </footer>
      </div>
    </main>
  );
}
