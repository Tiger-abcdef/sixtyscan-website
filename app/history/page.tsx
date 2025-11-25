"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/supabaseClient";
import html2canvas from "html2canvas";

type TestRow = {
  id: number;
  created_at: string;
  percent: number;
  label: string;
};

export default function HistoryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [tests, setTests] = useState<TestRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // keep refs for each row card (old behavior)
  const rowRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // NEW: refs for hidden "result page" preview per row
  const resultRefs = useRef<Record<number, HTMLDivElement | null>>({});

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

  const handleDownloadRow = async (testId: number) => {
    // ใช้ layout ของหน้า result ที่ซ่อนอยู่ ถ้าไม่มีให้ fallback เป็นแถวเดิม
    const el =
      resultRefs.current[testId] !== undefined &&
      resultRefs.current[testId] !== null
        ? resultRefs.current[testId]
        : rowRefs.current[testId];

    if (!el) return;

    try {
      const canvas = await html2canvas(el, { scale: 2 });
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `SixtyScan-result-${testId}.png`;
      link.click();
    } catch (err) {
      console.error("Failed to generate PNG for history row:", err);
    }
  };

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
            // wrapper div (click -> go to full result)
            <div
              key={test.id}
              ref={(el) => {
                rowRefs.current[test.id] = el;
              }}
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
                position: "relative", // for the hidden preview positioning
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
                    fontSize: "1rem", // made percentage a bit bigger
                    color: "#0f172a",
                    fontWeight: 700,
                    minWidth: "70px",
                    textAlign: "right",
                  }}
                >
                  {test.percent}%
                </div>
                {/* Download PNG button */}
                <button
                  type="button"
                  onClick={(ev) => {
                    ev.stopPropagation(); // don’t navigate
                    handleDownloadRow(test.id);
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

              {/* Hidden "result page" preview for this test, used only for download */}
              <div
                ref={(el) => {
                  resultRefs.current[test.id] = el;
                }}
                style={{
                  position: "absolute",
                  left: "-9999px",
                  top: 0,
                  width: "900px",
                  padding: "2.5rem 2.7rem 2.3rem",
                  borderRadius: "1.9rem",
                  backgroundColor: "#e2ecff",
                  fontFamily:
                    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                  color: "#0f172a",
                }}
              >
                <div
                  style={{
                    maxWidth: "960px",
                    margin: "0 auto",
                    backgroundColor: "rgba(248,250,252,0.96)",
                    borderRadius: "1.9rem",
                    padding: "2.3rem 2.4rem 2.2rem",
                    boxShadow: "0 30px 80px rgba(15,23,42,0.25)",
                    border: "1px solid rgba(148,163,184,0.4)",
                  }}
                >
                  <h1
                    style={{
                      fontSize: "2rem",
                      fontWeight: 900,
                      marginBottom: "1rem",
                    }}
                  >
                    ผลการวิเคราะห์เสียง #{test.id}
                  </h1>

                  <p
                    style={{
                      fontSize: "1rem",
                      color: "#475569",
                      lineHeight: 1.8,
                      marginBottom: "1.2rem",
                    }}
                  >
                    ผลลัพธ์นี้แสดงความน่าจะเป็นของความเสี่ยงโรคพาร์กินสันจากเสียงที่คุณตรวจในครั้งนั้น
                  </p>

                  <div
                    style={{
                      marginBottom: "1.4rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <div
                      style={{
                        padding: "0.35rem 0.9rem",
                        borderRadius: "9999px",
                        backgroundColor: badgeBg,
                        color: badgeColor,
                        fontSize: "0.95rem",
                        fontWeight: 700,
                      }}
                    >
                      {isParkinson
                        ? "พบความเสี่ยงต่อโรคพาร์กินสัน"
                        : "ไม่พบความเสี่ยงชัดเจน"}
                    </div>
                    <div
                      style={{
                        fontSize: "1.6rem",
                        fontWeight: 800,
                      }}
                    >
                      {test.percent}%
                    </div>
                  </div>

                  {/* Simple horizontal bar visual */}
                  <div
                    style={{
                      width: "100%",
                      height: "18px",
                      borderRadius: "9999px",
                      background:
                        "linear-gradient(to right, #22c55e, #eab308, #ef4444)",
                      overflow: "hidden",
                      marginBottom: "1.1rem",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${Math.min(Math.max(test.percent, 0), 100)}%`,
                        backgroundColor: "rgba(15,23,42,0.15)",
                      }}
                    />
                  </div>

                  <p
                    style={{
                      fontSize: "0.95rem",
                      color: "#4b5563",
                      lineHeight: 1.7,
                    }}
                  >
                    ค่าที่แสดงเป็นการประเมินจากแบบจำลอง AI ของ SixtyScan
                    ซึ่งไม่สามารถใช้แทนการวินิจฉัยของแพทย์ได้ หากผลลัพธ์แสดงความเสี่ยง
                    ควรนำผลนี้ไปปรึกษาแพทย์ผู้เชี่ยวชาญเพื่อทำการตรวจเพิ่มเติม
                  </p>
                </div>
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
