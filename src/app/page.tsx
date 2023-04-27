"use client";
import { UserProvider } from "@auth0/nextjs-auth0/client";

import { LandingPage } from "@/components/Auth/LandingPage";

export default function Home() {
  return (
    <main className={"container"}>
      <UserProvider>
        <LandingPage />
      </UserProvider>
    </main>
  );
}
