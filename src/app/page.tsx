"use client";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Dashboard } from "@/components/Dashboard";
import { Container } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
export default function Home() {
  return (
    <main>
      <Container
        id={"MainContainer"}
        maxWidth={false}
        sx={{
          height: "100vh",
          bgcolor: "#caccce",
        }}
      >
        <UserProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Dashboard />
          </LocalizationProvider>
        </UserProvider>
      </Container>
    </main>
  );
}
