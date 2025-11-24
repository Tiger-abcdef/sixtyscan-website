"use client";

export default function HistoryPage() {
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
            marginBottom: "1.5rem",
          }}
        >
          ประวัติการตรวจเสียงของคุณ
        </h1>

        <p
          style={{
            fontSize: "1rem",
            color: "#475569",
            lineHeight: 1.8,
            marginBottom: "1rem",
          }}
        >
          หน้านี้จะแสดงรายการการตรวจทั้งหมดของคุณ พร้อมวันที่ เวลา
          และผลการวิเคราะห์จากระบบ SixtyScan
        </p>

        <div
          style={{
            marginTop: "1.5rem",
            padding: "1.2rem 1.4rem",
            borderRadius: "1.2rem",
            backgroundColor: "#f9fafb",
            border: "1px solid #e5e7eb",
            fontSize: "0.95rem",
            color: "#4b5563",
          }}
        >
          ขณะนี้ยังไม่ได้เชื่อมต่อฐานข้อมูล
          ขั้นตอนถัดไปเราจะเชื่อมต่อกับ Supabase
          เพื่อดึงวันที่และเวลาของการตรวจแต่ละครั้งมาแสดงที่นี่
          และเมื่อคลิกที่รายการ ระบบจะแสดงผลลัพธ์ของการตรวจครั้งนั้น
        </div>
      </div>
    </main>
  );
}
