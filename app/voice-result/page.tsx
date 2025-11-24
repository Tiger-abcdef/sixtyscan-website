"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/supabaseClient";
import jsPDF from "jspdf";

function generateResultPdf(percent: number, label: string) {
  // Tier logic for advice + level + diagnosis
  let level: string;
  let diagnosis: string;
  let adviceLines: string[];

  if (percent <= 50) {
    level = "ระดับต่ำ (Low)";
    diagnosis = "ไม่เป็นพาร์กินสัน";
    adviceLines = [
      "ถ้าไม่มีอาการ: ควรตรวจปีละครั้ง (ไม่บังคับ)",
      "ถ้ามีอาการเล็กน้อย: ตรวจปีละ 2 ครั้ง",
      "ถ้ามีอาการเตือน: ตรวจ 2–4 ครั้งต่อปี",
    ];
  } else if (percent <= 75) {
    level = "ปานกลาง (Moderate)";
    diagnosis = "เป็นพาร์กินสัน (ความเสี่ยงปานกลาง)";
    adviceLines = [
      "ควรพบแพทย์เฉพาะทางระบบประสาทเพื่อตรวจเพิ่มเติม",
      "บันทึกอาการประจำวัน เช่น การสั่น การเดิน การทรงตัว",
      "หากได้รับยา: บันทึกผลข้างเคียงและการตอบสนองต่อยา",
    ];
  } else {
    level = "สูง (High)";
    diagnosis = "เป็นพาร์กินสัน (ความเสี่ยงสูง)";
    adviceLines = [
      "ควรพบแพทย์เฉพาะทางโดยเร็วที่สุดเพื่อตรวจยืนยัน",
      "บันทึกอาการทุกวันและเตรียมข้อมูลไปพบแพทย์",
      "หากได้รับยา: ติดตามผลอย่างละเอียดและปรึกษาแพทย์สม่ำเสมอ",
    ];
  }

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("SixtyScan – ผลการวิเคราะห์เสียง", 105, 20, { align: "center" });

  doc.setFontSize(13);
  doc.text(`สรุปผล: ${diagnosis}`, 20, 35);
  doc.text(`ระดับความเสี่ยง: ${level}`, 20, 45);
  doc.text(`เปอร์เซ็นต์ความเสี่ยงจากเสียง: ${percent}%`, 20, 55);
  doc.text(`ประเภทผลลัพธ์ (โมเดล): ${label}`, 20, 65);

  doc.setFontSize(14);
  doc.text("คำแนะนำเบื้องต้น", 20, 80);

  doc.setFontSize(12);
  const yStart = 90;
  const wrappedLines: string[] = [];
  adviceLines.forEach((line) => {
    const split = doc.splitTextToSize(line, 170);
    wrappedLines.push(...split, "");
  });
  doc.text(wrappedLines, 25, yStart);

  doc.setFontSize(9);
  doc.text(
    "หมายเหตุ: ผลลัพธ์นี้เป็นเพียงการคัดกรองเบื้องต้นจากเสียงพูด ไม่ใช่การวินิจฉัยทางการแพทย์",
    20,
    280
  );

  doc.save(`SixtyScan-result-${percent}.pdf`);
}

function VoiceResultInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();

  const [percent, setPercent] = useState<number | null>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const [hasSaved, setHasSaved] = useState(false);

  useEffect(() => {
    const p = searchParams.get("percent");
    const l = searchParams.get("label");
    const s = searchParams.get("source");

    if (p !== null) {
      const n = Number(p);
      setPercent(Number.isNaN(n) ? null : n);
    }
    if (l !== null) setLabel(l);
    if (s !== null) setSource(s);
  }, [searchParams]);

  // Save to Supabase when coming from a fresh prediction
  useEffect(() => {
    if (hasSaved) return;
    if (source !== "predict") return;
    if (percent === null || label === null) return;
    if (!session?.user?.email) return;

    const saveResult = async () => {
      try {
        const { error } = await supabase.from("test_results").insert({
          user_email: session.user?.email ?? null,
          percent,
          label,
        });

        if (error) {
          console.error("Failed to save test result:", error.message);
          return;
        }

        setHasSaved(true);
      } catch (err) {
        console.error("Unexpected error saving test result:", err);
      }
    };

    saveResult();
  }, [session?.user?.email, percent, label, source, hasSaved]);

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

  // ----- status + advice logic -----
  const isParkinson = label === "Parkinson";

  const statusText = isParkinson
    ? "มีความเสี่ยงของโรคพาร์กินสัน"
    : "ไม่พบความเสี่ยงของโรคพาร์กินสันอย่างมีนัยสำคัญ";

  // new tiering
  let level: string;
  let diagnosis: string;
  let adviceBoxColor: string;
  let adviceTextColor: string;
  let adviceList: string[];

  if (percent <= 50) {
    level = "ระดับต่ำ (Low)";
    diagnosis = "ไม่เป็นพาร์กินสัน";
    adviceBoxColor = "#e6f9e6";
    adviceTextColor = "#166534";
    adviceList = [
      "ถ้าไม่มีอาการ: ควรตรวจปีละครั้ง (ไม่บังคับ)",
      "ถ้ามีอาการเล็กน้อย: ตรวจปีละ 2 ครั้ง",
      "ถ้ามีอาการเตือน: ตรวจ 2–4 ครั้งต่อปี",
    ];
  } else if (percent <= 75) {
    level = "ปานกลาง (Moderate)";
    diagnosis = "เป็นพาร์กินสัน (ความเสี่ยงปานกลาง)";
    adviceBoxColor = "#fff7e6";
    adviceTextColor = "#92400e";
    adviceList = [
      "พบแพทย์เฉพาะทางระบบประสาทเพื่อตรวจเพิ่มเติม",
      "บันทึกอาการประจำวันเพื่อใช้ประกอบการวินิจฉัย",
      "หากได้รับยา: บันทึกผลข้างเคียงและการตอบสนองต่อยา",
    ];
  } else {
    level = "สูง (High)";
    diagnosis = "เป็นพาร์กินสัน (ความเสี่ยงสูง)";
    adviceBoxColor = "#ffe6e6";
    adviceTextColor = "#b91c1c";
    adviceList = [
      "พบแพทย์เฉพาะทางโดยเร็วที่สุดเพื่อตรวจยืนยัน",
      "บันทึกอาการทุกวันและเตรียมข้อมูลไปพบแพทย์",
      "หากได้รับยา: ติดตามผลอย่างละเอียดและปรึกษาแพทย์สม่ำเสมอ",
    ];
  }

  const barWidth = Math.min(Math.max(percent, 0), 100);

  const handleDownload = () => {
    if (percent == null || label == null) return;
    generateResultPdf(percent, label);
  };

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
        {/* header */}
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
          {/* per your request, no long descriptive paragraph here */}
        </header>

        {/* main result */}
        <section
          style={{
            marginBottom: "1.8rem",
            padding: "1.6rem 1.7rem",
            borderRadius: "1.2rem",
            backgroundColor: isParkinson ? "#fef2f2" : "#ecfdf3",
            border: `1px solid ${isParkinson ? "#fecaca" : "#bbf7d0"}`,
          }}
        >
          <p
            style={{
              fontSize: "1.4rem",
              fontWeight: 800,
              color: isParkinson ? "#b91c1c" : "#15803d",
              marginBottom: "0.5rem",
            }}
          >
            {statusText}
          </p>
          <p
            style={{
              fontSize: "1.05rem",
              color: "#334155",
              marginBottom: "0.2rem",
            }}
          >
            {level}
          </p>
          <p
            style={{
              fontSize: "1rem",
              color: "#475569",
            }}
          >
            โอกาสประมาณ {percent}%
          </p>
        </section>

        {/* probability bar */}
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

        {/* advice + buttons + download */}
        <section
          style={{
            padding: "1.6rem 1.7rem",
            borderRadius: "1.2rem",
            backgroundColor: adviceBoxColor,
            border: "1px solid rgba(148,163,184,0.5)",
          }}
        >
          <h2
            style={{
              fontSize: "1.3rem",
              fontWeight: 800,
              color: adviceTextColor,
              marginBottom: "0.9rem",
            }}
          >
            ข้อแนะนำเบื้องต้น
          </h2>

          <ul
            style={{
              fontSize: "1.1rem",
              color: "#111827",
              lineHeight: 1.9,
              paddingLeft: "1.4rem",
            }}
          >
            {adviceList.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <div
            style={{
              marginTop: "1.6rem",
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
            <button
              type="button"
              onClick={handleDownload}
              style={{
                borderRadius: "9999px",
                padding: "0.8rem 1.8rem",
                fontSize: "0.95rem",
                fontWeight: 700,
                border: "1px solid #0f172a",
                backgroundColor: "#0f172a",
                color: "white",
                cursor: "pointer",
              }}
            >
              ดาวน์โหลดผลลัพธ์ (PDF)
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function VoiceResultPage() {
  return (
    <Suspense
      fallback={
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
          กำลังโหลดผลการวิเคราะห์...
        </main>
      }
    >
      <VoiceResultInner />
    </Suspense>
  );
}
