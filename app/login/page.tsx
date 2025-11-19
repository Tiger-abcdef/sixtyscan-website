// app/login/page.tsx
"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <h1>Login</h1>
      <button
        onClick={() => signIn("google")}
        style={{
          padding: "0.75rem 1.5rem",
          borderRadius: "9999px",
          border: "none",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Continue with Google
      </button>
    </main>
  );
}
