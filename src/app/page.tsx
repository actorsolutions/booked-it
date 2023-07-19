"use client";
import { Dashboard } from "@/components/Dashboard";
import { Container } from "@mui/material";
import React from "react";

export default function Home() {
  return (
    <main>
      <Container
        id={"MainContainer"}
        maxWidth={false}
        sx={{
          minHeight: "100vh",
          bgcolor: "#caccce",
          mt: "1rem",
          pb: "2rem",
        }}
      >
        <Dashboard />
      </Container>
    </main>
  );
}
