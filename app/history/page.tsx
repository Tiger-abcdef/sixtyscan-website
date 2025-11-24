"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/supabaseClient";
import jsPDF from "jspdf";

type TestRow = {
  id: number;
  created_at: string;
  percent: number;
  label: string;
};

// helper: create a PDF from one test row (same logic as result page tiers)
function downloadTestAsPdf(test: TestRow) {
  const { percent, label, created_at, id } = test;

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
      "พบแพทย์เฉพาะทางระบบประสาทเพื่อตรวจเพิ่มเติม",
      "บันทึกอาการประจำวันเพื่อใช้ประกอบการวินิจฉัย",
      "หากได้รับยา: บันทึกผลข้างเคียงและการตอบสนองต่อยา",
    ];
  } else {
    level = "สูง (High)";
    diagnosis = "เป็นพาร์กินสัน (ความเสี่ยงสูง)";
    adviceLines = [
      "พบแพทย์เฉพาะทางโดยเร็วที่สุดเพื่อตรวจยืนยัน",
      "บันทึกอาการทุกวันและเตรียมข้อมูลไปพบแพทย์",
      "หากได้รับยา: ติดตามผลอย่างละเอียดและปรึกษาแพทย์สม่ำเสมอ",
    ];
  }

  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text("SixtyScan – ประวัติผลการตรวจเสียง", 105, 20, { align: "center" });

  // Basic info
  doc.setFontSize(12);
  doc.text(`การตรวจเสียง #${id}`, 20, 32);
  doc.text(
    `วันที่ทดสอบ: ${new Date(created_at).toLocaleString("th-TH")}`,
    20,
    40
  );
  doc.text(`เปอร์เซ็นต์ความเสี่ยง: ${percent}%`, 20, 48);
  doc.text(`ประเภทผลลัพธ์ (โมเดล): ${label}`, 20, 56);
  doc.text(`ระดับความเสี่ยง: ${level}`, 20, 64);
  doc.text(`สรุปผล: ${diagnosis}`, 20, 72);

  // Advice
  doc.setFontSize(14);
  doc.text("คำแนะนำเบื้องต้น", 20, 88);

  doc.setFontSize(12);
  const wrapped: string[] = [];
  adviceLines.forEach((line) => {
    const split = doc.splitTextToSize(line, 170);
    wrapped.push(...split, "");
  });
  doc.text(wrapped, 25, 98);

  // Footer note
  doc.setFontSize(9);
  doc.text(
    "หมายเหตุ: ผลลัพธ์นี้เป็นเพียงการคัดกรองเบื้องต้นจากเสียงพูด ไม่ใช่การวินิจฉัยทางการแพทย์",
    20,
    285
  );

  doc.save(`SixtyScan-history-${id}.pdf`);
}

export default function HistoryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [tests, setTests] = useState<TestRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // รอจนกว่า NextAuth จะโหลดสถานะเสร็จก่อน
    if (status === "loading") return;

    const userEmail = session?.user?.email;

    // ถ้าไม่ล็อกอิน ให้แจ้งเตือนและไม่โหลดประวัติ
    if (!userEmail) {
      setLoading(false);
      setError("กรุณาลงชื่อเข้าใช้เพื่อดูประวัติการตรวจเสียงของคุณ");
      setTests([]);
      return;
    }

    const loadHistory = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from("test_results")
          .select("id, created_at, percent, label")
          .eq("user_email", userEmail) // userEmail ถูกตรวจแล้วว่ามีค่าแน่นอน
          .order("created_at", { ascending: false })
          .limit(50);

        if (error) {
          console.error("Supabase error loading history:", error);
          setError("ไม่สามารถโหลดประวัติการตรวจได้ กรุณาลองใหม่อีกครั้ง");
          setTests([]);
        } else {
          setTests(data ?? []);
        }
      } catch (err) {
        console.error("Unexpected error loading history:", err);
        setError("เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง");
        setTests([]);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, [status, session]);

  const renderContent = () => {
    if (loading) {
      return (
        <div
          style={{
            padding: "2rem 1.5rem",
            borderRadius: "1.2rem",
            backgroundColor: "#f9fafb",
            border: "1px solid #e5e7eb",
            fontSize: "1rem",
            color: "#4b5563",
            textAlign: "center",
          }}
        >
          กำลังโหลดประวัติการตรวจเสียงของคุณ...
        </div>
      );
    }

    if (error) {
      return (
        <div
          style={{
            padding: "1.4rem 1.6rem",
            borderRadius: "1.2rem",
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#b91c1c",
            fontSize: "0.98rem",
            lineHeight: 1.7,
          }}
        >
          {error}
        </div>
      );
    }

    if (tests.length === 0) {
      return (
        <div
          style={{
            padding: "1.4rem 1.6rem",
            borderRadius: "1.2rem",
            backgroundColor: "#f9fafb",
            border: "1px solid #e5e7eb",
            fontSize: "0.98rem",
            color: "#4b5563",
            lineHeight: 1.8,
          }}
        >
          คุณยังไม่มีประวัติการตรวจเสียงในระบบ
          <br />
          ลองเริ่มการตรวจครั้งแรกได้ที่ปุ่ม{" "}
          <span style={{ fontWeight: 600 }}>“เริ่มตรวจเสียง”</span> บนหน้าแรก
        </div>
      );
    }

    return (
      <div
        style={{
          marginTop: "1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.9rem",
        }}
      >
        {tests.map((test) => {
          const d = new Date(test.created_at);
          const dateStr = d.toLocaleDateString("th-TH", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
          const timeStr = d.toLocaleTimeString("th-TH", {
            hour: "2-digit",
            minute: "2-digit",
          });

          const isParkinson = test.label === "Parkinson";
          const badgeColor = isParkinson ? "#b91c1c" : "#15803d";
          const badgeBg = isParkinson ? "#fee2e2" : "#dcfce7";

          return (
            // changed from <button> to <div> so we can put a download button inside
            <div
              key={test.id}
              onClick={() =>
                router.push(
                  `/voice-result?percent=${encodeURIComponent(
                    test.percent
                  )}&label=${encodeURIComponent(test.label)}`
                )
              }
              style={{
                width: "100%",
                textAlign: "left",
                borderRadius: "1.2rem",
                border: "1px solid #e5e7eb",
                backgroundColor: "white",
                padding: "1rem 1.3rem",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "0.75rem",
                boxShadow: "0 10px 25px rgba(15,23,42,0.08)",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(-1px)";
                el.style.boxShadow = "0 16px 32px rgba(15,23,42,0.12)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "0 10px 25px rgba(15,23,42,0.08)";
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "#0f172a",
                    marginBottom: "0.2rem",
                  }}
                >
                  การตรวจเสียง #{test.id}
                </div>
                <div style={{ fontSize: "0.85rem", color: "#6b7280" }}>
                  {dateStr} · {timeStr}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <div
                  style={{
                    padding: "0.25rem 0.7rem",
                    borderRadius: "9999px",
                    backgroundColor: badgeBg,
                    color: badgeColor,
                    fontSize: "0.85rem",
                    fontWeight: 600,
                  }}
                >
                  {isParkinson ? "มีความเสี่ยงพาร์กินสัน" : "ไม่พบความเสี่ยงชัดเจน"}
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "#0f172a",
                    fontWeight: 600,
                    minWidth: "70px",
                    textAlign: "right",
                  }}
                >
                  {test.percent}%
                </div>
                {/* NEW: download button, stops click from navigating */}
                <button
                  type="button"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    downloadTestAsPdf(test);
                  }}
                  style={{
                    padding: "0.3rem 0.9rem",
                    borderRadius: "9999px",
                    border: "1px solid #0f172a",
                    backgroundColor: "#0f172a",
                    color: "white",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  ดาวน์โหลด
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
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
        <h1
          style={{
            fontSize: "2.1rem",
            fontWeight: 900,
            color: "#0f172a",
            marginBottom: "0.9rem",
          }}
        >
          ประวัติการตรวจเสียงของคุณ
        </h1>

        <p
          style={{
            fontSize: "1rem",
            color: "#475569",
            lineHeight: 1.8,
            marginBottom: "0.5rem",
          }}
        >
          ดูประวัติการตรวจเสียง สถานะความเสี่ยง และสามารถกดที่แต่ละรายการ
          เพื่อกลับไปดูผลลัพธ์ฉบับเต็มได้อีกครั้ง
        </p>

        {renderContent()}
      </div>
    </main>
  );
}
