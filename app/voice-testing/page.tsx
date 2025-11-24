"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type RecordingKey =
  | "aa"
  | "ee"
  | "eu"
  | "uu"
  | "ai"
  | "am"
  | "ao"
  | "pataka"
  | "sentence";

type RecordingMap = Partial<Record<RecordingKey, Blob | null>>;

interface VoiceRecorderCardProps {
  title: string;
  subtitle?: string;
  required?: boolean;
  onChange: (blob: Blob | null) => void;
}

function VoiceRecorderCard({
  title,
  subtitle,
  required = true,
  onChange,
}: VoiceRecorderCardProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };

      recorder.onstop = () => {
        if (timerRef.current) {
          window.clearInterval(timerRef.current);
          timerRef.current = null;
        }
        stream.getTracks().forEach((t) => t.stop());

        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        onChange(blob);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setDuration(0);

      timerRef.current = window.setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error(err);
      setError("ไม่สามารถเข้าถึงไมโครโฟนได้ กรุณาตรวจสอบการตั้งค่าเบราว์เซอร์");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }
    setIsRecording(false);
  };

  const handleDelete = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setDuration(0);
    onChange(null);
  };

  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return (
    <section
      style={{
        backgroundColor: "white",
        borderRadius: "1.5rem",
        padding: "1.75rem 1.9rem",
        boxShadow: "0 18px 40px rgba(15,23,42,0.06)",
        border: "1px solid rgba(148,163,184,0.3)",
        display: "flex",
        flexDirection: "column",
        gap: "0.9rem",
      }}
    >
      {/* header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "1.25rem",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: 800,
              color: "#0f172a",
            }}
          >
            {title}
          </h3>
          {subtitle && (
            <p
              style={{
                marginTop: "0.4rem",
                fontSize: "1rem",
                color: "#475569",
                lineHeight: 1.7,
              }}
            >
              {subtitle}
            </p>
          )}
          {required && (
            <p
              style={{
                marginTop: "0.3rem",
                fontSize: "0.9rem",
                color: "#64748b",
              }}
            >
              กรุณาบันทึกเสียงให้ยาวประมาณ{" "}
              <span style={{ fontWeight: 600 }}>5–8 วินาที</span> ต่อเนื่อง
              และชัดเจน
            </p>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            minWidth: "190px",
          }}
        >
          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            style={{
              borderRadius: "9999px",
              border: "none",
              padding: "0.75rem 1.6rem",
              fontSize: "0.95rem",
              fontWeight: 700,
              cursor: "pointer",
              color: "white",
              backgroundColor: isRecording ? "#ef4444" : "#4f46e5",
              boxShadow: "0 16px 26px rgba(79,70,229,0.35)",
              transition: "background-color 0.15s ease, transform 0.1s ease",
            }}
          >
            {isRecording ? "หยุดบันทึก" : "เริ่มบันทึกเสียง"}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={!audioUrl && !isRecording}
            style={{
              borderRadius: "9999px",
              padding: "0.65rem 1.6rem",
              fontSize: "0.85rem",
              fontWeight: 500,
              border: "1px solid rgba(148,163,184,0.9)",
              backgroundColor: "white",
              color: "#475569",
              cursor: !audioUrl && !isRecording ? "not-allowed" : "pointer",
              opacity: !audioUrl && !isRecording ? 0.45 : 1,
            }}
          >
            ลบเสียง
          </button>
        </div>
      </div>

      {/* status + audio */}
      <div
        style={{
          marginTop: "0.75rem",
          paddingTop: "0.9rem",
          borderTop: "1px solid rgba(226,232,240,1)",
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "0.9rem",
            fontSize: "0.9rem",
            color: "#64748b",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <span
              style={{
                width: "0.6rem",
                height: "0.6rem",
                borderRadius: "9999px",
                backgroundColor: isRecording ? "#ef4444" : "#94a3b8",
                boxShadow: isRecording
                  ? "0 0 0 5px rgba(248,113,113,0.45)"
                  : "none",
              }}
            />
            <span style={{ fontWeight: 600 }}>
              สถานะ:{" "}
              {isRecording
                ? "กำลังบันทึก..."
                : audioUrl
                ? "บันทึกสำเร็จ"
                : "ยังไม่มีเสียงที่บันทึก"}
            </span>
          </div>
          <span>
            ระยะเวลา:{" "}
            <span
              style={{
                fontFamily: "ui-monospace, SFMono-Regular",
                fontSize: "0.9rem",
              }}
            >
              {minutes.toString().padStart(2, "0")}:
              {seconds.toString().padStart(2, "0")}
            </span>
          </span>
        </div>

        {audioUrl && (
          <audio
            controls
            src={audioUrl}
            style={{
              width: "100%",
              marginTop: "0.25rem",
              borderRadius: "0.9rem",
              backgroundColor: "#e5e7eb",
            }}
          />
        )}

        {error && (
          <p
            style={{
              marginTop: "0.35rem",
              fontSize: "0.85rem",
              color: "#b91c1c",
              backgroundColor: "#fef2f2",
              borderRadius: "0.75rem",
              padding: "0.6rem 0.85rem",
              border: "1px solid #fecaca",
            }}
          >
            {error}
          </p>
        )}
      </div>
    </section>
  );
}

export default function VoiceTestingPage() {
  const [recordings, setRecordings] = useState<RecordingMap>({});
  const [predictError, setPredictError] = useState<string | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const router = useRouter();

  const handleChange = (key: RecordingKey) => (blob: Blob | null) => {
    setRecordings((prev) => ({ ...prev, [key]: blob }));
  };

  const handlePredict = async () => {
    setPredictError(null);

    const requiredKeys: RecordingKey[] = [
      "aa",
      "ee",
      "eu",
      "uu",
      "ai",
      "am",
      "ao",
      "pataka",
      "sentence",
    ];

    // Check all required recordings exist
    const missing = requiredKeys.filter((k) => !recordings[k]);
    if (missing.length > 0) {
      setPredictError("กรุณาบันทึกเสียงให้ครบทุกหัวข้อก่อนทำการวิเคราะห์");
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    setIsPredicting(true);

    try {
      const probabilities: number[] = [];

      for (const key of requiredKeys) {
        const blob = recordings[key];
        if (!blob) continue;

        const formData = new FormData();
        formData.append("file", blob, `${key}.webm`);

        const res = await fetch(`${apiUrl}/predict`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const txt = await res.text().catch(() => "");
          throw new Error(`Backend error ${res.status}: ${txt}`);
        }

        const data = await res.json();

        let p: number | undefined =
          typeof data.probability === "number"
            ? data.probability
            : typeof data.percent === "number"
            ? data.percent / 100
            : undefined;

        if (p === undefined || Number.isNaN(p)) {
          throw new Error("รูปแบบผลลัพธ์จากเซิร์ฟเวอร์ไม่ถูกต้อง");
        }

        probabilities.push(p);
      }

      if (probabilities.length === 0) {
        throw new Error("ไม่สามารถอ่านผลลัพธ์จากเสียงที่บันทึกได้");
      }

      const avgProb =
        probabilities.reduce((sum, v) => sum + v, 0) / probabilities.length;
      const percent = Math.round(avgProb * 100);
      const label = avgProb >= 0.5 ? "Parkinson" : "Non-Parkinson";

      router.push(
        `/voice-result?percent=${percent}&label=${encodeURIComponent(label)}`
      );
    } catch (err: any) {
      console.error(err);
      setPredictError(
        err?.message || "เกิดข้อผิดพลาดในการวิเคราะห์ กรุณาลองใหม่อีกครั้ง"
      );
    } finally {
      setIsPredicting(false);
    }
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
          maxWidth: "980px",
          margin: "0 auto",
          backgroundColor: "rgba(248,250,252,0.94)",
          borderRadius: "1.9rem",
          padding: "2.5rem 2.7rem 2.5rem",
          boxShadow: "0 30px 80px rgba(15,23,42,0.25)",
          border: "1px solid rgba(148,163,184,0.4)",
        }}
      >
        {/* header */}
        <div style={{ marginBottom: "2rem" }}>
          <h1
            style={{
              fontSize: "2.1rem",
              fontWeight: 900,
              color: "#0f172a",
            }}
          >
            การทดสอบเสียง SixtyScan
          </h1>
          <p
            style={{
              marginTop: "0.7rem",
              fontSize: "1rem",
              color: "#475569",
              lineHeight: 1.8,
            }}
          >
            กรุณาบันทึกเสียงให้ครบทุกหัวข้อด้านล่าง
            โดยในแต่ละคำให้ยืดเสียงต่อเนื่องประมาณ{" "}
            <span style={{ fontWeight: 600 }}>5–8 วินาที</span>{" "}
            เสียงชัดเจนและดังพอสมควร ระบบจะนำเสียงทั้งหมดไปใช้ร่วมกันในการวิเคราะห์
            ความเสี่ยงของโรคพาร์กินสัน
          </p>
        </div>

        {/* cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
          {/* 7 vowels */}
          <VoiceRecorderCard
            title='ออกเสียง "อา"'
            subtitle='ยืดเสียง "อา..." ต่อเนื่องโดยไม่หยุดกลางคัน'
            onChange={handleChange("aa")}
          />
          <VoiceRecorderCard
            title='ออกเสียง "อี"'
            subtitle='ยืดเสียง "อี..." ให้คงที่และฟังชัด'
            onChange={handleChange("ee")}
          />
          <VoiceRecorderCard
            title='ออกเสียง "อือ"'
            subtitle='ยืดเสียง "อือ..." ให้เสียงสม่ำเสมอ ไม่สั่นหรือเบาเกินไป'
            onChange={handleChange("eu")}
          />
          <VoiceRecorderCard
            title='ออกเสียง "อู"'
            subtitle='ยืดเสียง "อู..." ให้ดังและต่อเนื่อง'
            onChange={handleChange("uu")}
          />
          <VoiceRecorderCard
            title='ออกเสียง "ไอ"'
            subtitle='ยืดเสียง "ไอ..." อย่างต่อเนื่องไม่เร่งหรือสะดุด'
            onChange={handleChange("ai")}
          />
          <VoiceRecorderCard
            title='ออกเสียง "อำ"'
            subtitle='ยืดเสียง "อำ..." ให้ยาวและคงที่ตลอด'
            onChange={handleChange("am")}
          />
          <VoiceRecorderCard
            title='ออกเสียง "เอา"'
            subtitle='ยืดเสียง "เอา..." โดยรักษาจังหวะหายใจตามปกติ'
            onChange={handleChange("ao")}
          />

          {/* Pa-Ta-Ka */}
          <VoiceRecorderCard
            title='ออกเสียง "Pa-Ta-Ka"'
            subtitle='พูดว่า "Pa-Ta-Ka" ต่อเนื่องประมาณ 6 วินาที (แต่ละพยางค์ใช้เวลาประมาณ 2 วินาที)'
            onChange={handleChange("pataka")}
          />

          {/* Sentence */}
          <VoiceRecorderCard
            title='อ่านประโยคตัวอย่าง'
            subtitle='กรุณาอ่านประโยค: "วันนี้อากาศแจ่มใสนกร้องเสียงดังฟังชัด" ด้วยจังหวะพูดปกติ เสียงชัดเจน'
            onChange={handleChange("sentence")}
          />
        </div>

        {/* Predict button */}
        <div
          style={{
            marginTop: "2.1rem",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button
            type="button"
            onClick={handlePredict}
            disabled={isPredicting}
            style={{
              borderRadius: "9999px",
              border: "none",
              padding: "0.9rem 2.1rem",
              fontSize: "1rem",
              fontWeight: 700,
              cursor: isPredicting ? "wait" : "pointer",
              color: "white",
              backgroundColor: "#16a34a",
              boxShadow: "0 16px 30px rgba(22,163,74,0.35)",
              opacity: isPredicting ? 0.75 : 1,
            }}
          >
            {isPredicting ? "กำลังวิเคราะห์เสียง..." : "ทดสอบเสียงทั้งหมด (Predict)"}
          </button>
        </div>

        {predictError && (
          <p
            style={{
              marginTop: "1.2rem",
              fontSize: "0.95rem",
              color: "#b91c1c",
              backgroundColor: "#fef2f2",
              borderRadius: "0.9rem",
              padding: "0.9rem 1.1rem",
              border: "1px solid #fecaca",
            }}
          >
            {predictError}
          </p>
        )}
      </div>
    </main>
  );
}
