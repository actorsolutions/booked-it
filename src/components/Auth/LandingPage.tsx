"use client";
import { LoginButton } from "@/components/Auth/LoginButton";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getAuditionsByEmail } from "@/api/auditions";
import { SignUpOrSignIn } from "@/api/auth";

export const LandingPage = () => {
  const { user, error, isLoading } = useUser();
  if (user) {
    SignUpOrSignIn(user).then((response) => {
      console.log(response);
      const registeredUser = response.user;
      getAuditionsByEmail(registeredUser.id.toString()).then((response) => {
        console.log(response);
      });
    });

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
