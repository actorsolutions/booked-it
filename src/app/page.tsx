"use client";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Dashboard } from "@/components/Dashboard";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <main>
      <Container>
        <UserProvider>
          <Dashboard />
        </UserProvider>
      </Container>
    </main>
  );
}
