"use client";
import { useState, useEffect } from "react";
import { LoginButton } from "@/components/Auth/LoginButton";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getAuditionsByEmail } from "@/api/auditions";
import { SignUpOrSignIn } from "@/api/auth";
import { AgGridReact } from "ag-grid-react";

export const LandingPage = () => {
  const { user, error, isLoading } = useUser();

  const [auditions, setAuditions] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    { field: "make", filter: true },
    { field: "model", filter: true },
    { field: "price" },
  ]);
  useEffect(() => {
    SignUpOrSignIn(user).then((response) => {
      const registeredUser = response.user;
      getAuditionsByEmail(registeredUser.id.toString()).then((response) => {
        setAuditions(response.auditions);
      });
    });
  }, [auditions]);
  if (user) {
    return (
      <>
        <h1>Welcome {user.name}</h1>
        <p>Email - {user.email}</p>
        <a href={"/api/auth/logout"}>Logout</a>

        {/*<AgGridReact rowData={auditions} columnDefs={columnDefs}></AgGridReact>*/}
      </>
    );
  }
  return <a href={"api/auth/login"}>Login</a>;
};
