"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function VoiceResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [percent, setPercent] = useState<number | null>(null);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const p = searchParams.get("percent");
    const l = searchParams.get("label");

    if (p !== null) {
      const n = Number(p);
      setPercent(Number.isNaN(n) ? null : n);
    }
    if (l !== null) {
      setLabel(l);
    }
  }, [searchParams]);

  if (percent === null || label === null) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#e2ecff",
          padding: "5rem 1.5rem 3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.1rem",
          fontWeight: 600,
          color: "#475569",
        }}
      >
        ไม่พบผลการวิเคราะห์ กรุณากลับไปทดสอบเสียงใหม่อีกครั้ง
      </main>
    );
  }

  const isParkinson = label === "Parkinson";

  const statusText = isParkinson
    ? "มีความเสี่ยงของโรคพาร์กินสัน"
    : "ไม่พบความเสี่ยงของโรคพาร์กินสันอย่างมีนัยสำคัญ";

  const riskLevel =
    percent >= 80
      ? "ระดับความเสี่ยงสูง"
      : percent >= 50
      ? "ระดับความเสี่ยงปานกลาง"
      : "ระดับความเสี่ยงต่ำ";

  const barWidth = Math.min(Math.max(percent, 0), 100);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#e2ecff",
        padding: "5rem 1.5rem 3rem",
      }}
    >
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          backgroundColor: "rgba(248,250,252,0.96)",
          borderRadius: "1.9rem",
          padding: "2.4rem 2.6rem 2.5rem",
          boxShadow: "0 30px 80px rgba(15,23,42,0.25)",
          border: "1px solid rgba(148,163,184,0.4)",
        }}
      >
        {/* Header */}
        <header style={{ marginBottom: "1.9rem" }}>
          <h1
            style={{
              fontSize: "2.1rem",
              fontWeight: 900,
              color: "#0f172a",
            }}
          >
            ผลการวิเคราะห์เสียงจาก SixtyScan
          </h1>
          <p
            style={{
              marginTop: "0.7rem",
              fontSize: "1rem",
              color: "#475569",
              lineHeight: 1.8,
            }}
          >
            ระบบได้วิเคราะห์เสียงพูดและเสียงสระทั้งหมดของคุณแล้ว
            โดยใช้แบบจำลองปัญญาประดิษฐ์ที่เทรนจากข้อมูลผู้ป่วยพาร์กินสัน
            ผลลัพธ์ด้านล่างเป็นการประเมินโอกาสการเป็นโรคพาร์กินสันจากเสียงเท่านั้น
          </p>
        </header>

        {/* Main result */}
        <section
          style={{
            marginBottom: "1.8rem",
            padding: "1.4rem 1.5rem",
            borderRadius: "1.2rem",
            backgroundColor: isParkinson ? "#fef2f2" : "#ecfdf3",
            border: `1px solid ${isParkinson ? "#fecaca" : "#bbf7d0"}`,
          }}
        >
          <p
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              color: isParkinson ? "#b91c1c" : "#15803d",
              marginBottom: "0.5rem",
            }}
          >
            {statusText}
          </p>
          <p
            style={{
              fontSize: "0.95rem",
              color: "#475569",
            }}
          >
            {riskLevel} (โอกาสประมาณ {percent}%)
          </p>
        </section>

        {/* Probability bar */}
        <section style={{ marginBottom: "2rem" }}>
          <p
            style={{
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "#0f172a",
              marginBottom: "0.6rem",
            }}
          >
            ค่าความน่าจะเป็นจากเสียง (Voice-based probability)
          </p>
          <div
            style={{
              width: "100%",
              height: "1.1rem",
              borderRadius: "9999px",
              backgroundColor: "#e5e7eb",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                width: `${barWidth}%`,
                height: "100%",
                borderRadius: "9999px",
                background:
                  "linear-gradient(90deg,#22c55e,#16a34a,#15803d,#b91c1c)",
                transition: "width 0.4s ease",
              }}
            />
          </div>
          <div
            style={{
              marginTop: "0.45rem",
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.8rem",
              color: "#6b7280",
            }}
          >
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </section>

        {/* Advice */}
        <section
          style={{
            padding: "1.4rem 1.5rem",
            borderRadius: "1.2rem",
            backgroundColor: "#f9fafb",
            border: "1px solid #e5e7eb",
          }}
        >
          <h2
            style={{
              fontSize: "1.05rem",
              fontWeight: 700,
              color: "#0f172a",
              marginBottom: "0.7rem",
            }}
          >
            ข้อแนะนำเบื้องต้น
          </h2>
          <ul
            style={{
              fontSize: "0.95rem",
              color: "#4b5563",
              lineHeight: 1.8,
              paddingLeft: "1.2rem",
            }}
          >
            <li>
              ผลลัพธ์นี้เป็นเพียงการคัดกรองเบื้องต้นจากเสียงพูด
              ไม่สามารถใช้ยืนยันการวินิจฉัยโรคได้ 100%
            </li>
            <li>
              หากคุณมีอาการสั่น เกร็ง เคลื่อนไหวช้าหรือผิดปกติ
              ควรปรึกษาแพทย์ผู้เชี่ยวชาญด้านระบบประสาทโดยตรง
            </li>
            <li>
              ควรเก็บผลการทดสอบนี้ไว้เป็นข้อมูลประกอบ
              และสามารถทดสอบซ้ำในอนาคตเพื่อติดตามความเปลี่ยนแปลงของเสียงได้
            </li>
          </ul>

          <div
            style={{
              marginTop: "1.4rem",
              display: "flex",
              gap: "0.9rem",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={() => router.push("/voice-testing")}
              style={{
                borderRadius: "9999px",
                border: "none",
                padding: "0.85rem 1.8rem",
                fontSize: "0.95rem",
                fontWeight: 700,
                cursor: "pointer",
                color: "white",
                backgroundColor: "#4f46e5",
                boxShadow: "0 14px 26px rgba(79,70,229,0.35)",
              }}
            >
              กลับไปทดสอบเสียงอีกครั้ง
            </button>
            <button
              type="button"
              onClick={() => router.push("/")}
              style={{
                borderRadius: "9999px",
                padding: "0.8rem 1.6rem",
                fontSize: "0.9rem",
                fontWeight: 500,
                border: "1px solid rgba(148,163,184,0.9)",
                backgroundColor: "white",
                color: "#475569",
                cursor: "pointer",
              }}
            >
              กลับไปหน้าแรก
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
