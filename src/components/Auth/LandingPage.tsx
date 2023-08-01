"use client";
import { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { SignUpOrSignIn } from "@/apihelpers/auth";

export const LandingPage = () => {
  const { user } = useUser();

  useEffect(() => {
    SignUpOrSignIn().then(() => {});
  }, [user]);
  if (user) {
    return (
      <>
        <h1>Welcome {user.name}</h1>
        <p>Email - {user.email}</p>
        <a href={"/api/auth/logout"}>Logout</a>
      </>
    );
  }
  return <a href={"api/auth/login"}>Login</a>;
};
