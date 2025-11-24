"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function VoiceResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [percent, setPercent] = useState<number | null>(null);

  useEffect(() => {
    const p = searchParams.get("percent");
    if (p) setPercent(Number(p));
  }, [searchParams]);

  const handleDownloadPDF = async () => {
    const resultElement = document.getElementById("result-section");
    if (!resultElement) return;

    const canvas = await html2canvas(resultElement, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("SixtyScan_Result.pdf");
  };

  if (percent === null) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#e2ecff",
          padding: "5rem 1.5rem 3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.2rem",
          fontWeight: 600,
          color: "#475569",
        }}
      >
        กำลังโหลดผลการวิเคราะห์...
      </main>
    );
  }

  // ----------------------------
  // STREAMLIT LOGIC RECREATED
  // ----------------------------

  let level = "";
  let label = "";
  let diagnosis = "";
  let boxColor = "";
  let advice = "";

  if (percent <= 50) {
    level = "ระดับต่ำ (Low)";
    label = "Non Parkinson";
    diagnosis = "ไม่เป็นพาร์กินสัน";
    boxColor = "#e6f9e6";
    advice = `
        <ul style="font-size: 1.25rem; line-height: 1.6;">
          <li>ถ้าไม่มีอาการ: ควรตรวจปีละครั้ง (ไม่บังคับ)</li>
          <li>ถ้ามีอาการเล็กน้อย: ตรวจปีละ 2 ครั้ง</li>
          <li>ถ้ามีอาการเตือน: ตรวจ 2–4 ครั้งต่อปี</li>
        </ul>
      `;
  } else if (percent <= 75) {
    level = "ปานกลาง (Moderate)";
    label = "Parkinson";
    diagnosis = "เป็นพาร์กินสัน";
    boxColor = "#fff7e6";
    advice = `
        <ul style="font-size: 1.25rem; line-height: 1.6;">
          <li>พบแพทย์เฉพาะทางระบบประสาท</li>
          <li>บันทึกอาการประจำวัน</li>
          <li>หากได้รับยา: บันทึกผลข้างเคียง</li>
        </ul>
      `;
  } else {
    level = "สูง (High)";
    label = "Parkinson";
    diagnosis = "เป็นพาร์กินสัน";
    boxColor = "#ffe6e6";
    advice = `
        <ul style="font-size: 1.25rem; line-height: 1.6%;">
          <li>พบแพทย์เฉพาะทางโดยเร็วที่สุด</li>
          <li>บันทึกอาการทุกวัน</li>
          <li>หากได้รับยา: ติดตามผลอย่างละเอียด</li>
        </ul>
      `;
  }

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
          maxWidth: "900px",
          margin: "0 auto",
          backgroundColor: "rgba(248,250,252,0.95)",
          borderRadius: "1.75rem",
          padding: "2.25rem 2.5rem 2.5rem",
          boxShadow: "0 30px 80px rgba(15,23,42,0.25)",
          border: "1px solid rgba(148,163,184,0.4)",
        }}
      >
        {/* Header */}
        <h1
          style={{
            fontSize: "2.2rem",
            fontWeight: 800,
            color: "#0f172a",
            textAlign: "center",
            marginBottom: "1.2rem",
          }}
        >
          ผลการวิเคราะห์เสียง SixtyScan
        </h1>

        {/* Result Box */}
        <div
          id="result-section"
          style={{
            backgroundColor: boxColor,
            padding: "2rem",
            borderRadius: "1.25rem",
            fontSize: "1.3rem",
            color: "#000000",
            marginTop: "1rem",
          }}
        >
          <div
            style={{
              textAlign: "center",
              fontSize: "2rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            {label}
          </div>

          <p>
            <b>ระดับความน่าจะเป็น:</b> {level}
          </p>

          <p>
            <b>ความน่าจะเป็นของพาร์กินสัน:</b> {percent}%
          </p>

          {/* Probability bar */}
          <div
            style={{
              height: "38px",
              background:
                "linear-gradient(to right, green, yellow, orange, red)",
              borderRadius: "6px",
              margin: "1rem 0",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: `${percent}%`,
                top: 0,
                bottom: 0,
                width: "4px",
                backgroundColor: "black",
              }}
            />
          </div>

          <p>
            <b>ผลการวิเคราะห์:</b> {diagnosis}
          </p>

          <p>
            <b>คำแนะนำ</b>
          </p>

          <div
            dangerouslySetInnerHTML={{
              __html: advice,
            }}
          />
        </div>

        {/* Buttons */}
        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={() => router.push("/voice-testing")}
            style={{
              borderRadius: "9999px",
              padding: "0.8rem 1.6rem",
              fontSize: "0.95rem",
              border: "1px solid #cbd5e1",
              backgroundColor: "white",
              cursor: "pointer",
            }}
          >
            ⬅ กลับไปหน้าอัดเสียง
          </button>

          <button
            onClick={handleDownloadPDF}
            style={{
              borderRadius: "9999px",
              padding: "0.8rem 1.6rem",
              fontSize: "0.95rem",
              backgroundColor: "#059669",
              color: "white",
              cursor: "pointer",
              boxShadow: "0 12px 24px rgba(34,197,94,0.35)",
            }}
          >
            ดาวน์โหลดผลลัพธ์เป็น PDF
          </button>

          <button
            onClick={() => router.push("/")}
            style={{
              borderRadius: "9999px",
              padding: "0.8rem 1.6rem",
              fontSize: "0.95rem",
              backgroundColor: "#4f46e5",
              color: "white",
              cursor: "pointer",
              boxShadow: "0 12px 24px rgba(79,70,229,0.35)",
            }}
          >
            กลับหน้าแรก
          </button>
        </div>
      </div>
    </main>
  );
}
