// lib/predictPd.ts

export type PredictResponse = {
  probability: number;
  percent: number;
  label: "Parkinson" | "Non-Parkinson";
};

export async function predictPdFromBlob(audioBlob: Blob): Promise<PredictResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not set in .env.local");
  }

  const formData = new FormData();
  formData.append("file", audioBlob, "voice.m4a");

  const res = await fetch(`${apiUrl}/predict`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Backend error ${res.status}: ${txt}`);
  }

  return (await res.json()) as PredictResponse;
}
