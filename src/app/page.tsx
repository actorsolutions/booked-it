"use client";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Dashboard } from "@/components/Dashboard";

export default function Home() {
  return (
    <main className={"container"}>
      <UserProvider>
        <Dashboard />
      </UserProvider>
    </main>
  );
}


