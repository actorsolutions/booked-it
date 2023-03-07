"use client";
import { useState } from "react";
import { LoginButton } from "@/components/Auth/LoginButton";
import { useUser } from "@auth0/nextjs-auth0/client";

export const LandingPage = () => {
  const [registeredUser, setRegisteredUser] = useState({});
  const { user, error, isLoading } = useUser();
  if (user) {
    // Send to registration  URL
    const SignUpOrSignIn = async () => {
      const response = await fetch("/api/auth/registration", {
        method: "POST",
        body: JSON.stringify(user),
      });
      return response.json();
    };

    const getAuditionsByUserId = async (userId: number) => {
      const userIdParams = new URLSearchParams({ userId });
      const response = await fetch(`/api/auditions?${userIdParams}`, {
        method: "GET",
      });
      return await response.json();
    };
    SignUpOrSignIn().then((response) => {
      user.id = response.user.id;
      setRegisteredUser(user);
      const auditions = getAuditionsByUserId(registeredUser.id);
      console.log(auditions);
    });

    console.log(registeredUser);
    return (
      <>
        <h1>Welcome {user.name}</h1>
        <p>Email - {user.email}</p>
        <p>SID: {user.id}</p>
        <a href={"/api/auth/logout"}>Logout</a>
      </>
    );
  }
  return <a href={"api/auth/login"}>Login</a>;
};
