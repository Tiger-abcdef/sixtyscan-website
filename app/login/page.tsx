// app/login/page.tsx
"use client";

import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // If already logged in, send them to the main page
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/"); // or "/dashboard" if that’s your main page
    }
  }, [status, router]);

  // Optional: you can show nothing or a loading state while checking
  if (status === "loading") {
    return null; // or a spinner
  }

  return (
    <main>
      {/* your existing layout / styles here */}
      <h1>Login</h1>

      <button
        onClick={() =>
          signIn("google", {
            callbackUrl: "/", // send them to home after login
          })
        }
      >
        Continue with Google
      </button>
    </main>
  );
}