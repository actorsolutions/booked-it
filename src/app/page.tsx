"use client";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Dashboard } from "@/components/Dashboard";
import { Container } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";

export default function Home() {
  return (
    <UserProvider>
      <main>
        <Container
          id={"MainContainer"}
          maxWidth={false}
          sx={{
            height: "100vh",
            bgcolor: "#caccce",
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Dashboard />
          </LocalizationProvider>
        </Container>
      </main>
    </UserProvider>
  );
}
