"use client";
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { getAuditions } from "@/api/auditions";
import { SignUpOrSignIn } from "@/api/auth";
import { AgGridReact } from "ag-grid-react";

export const LandingPage = () => {
  const { user } = useUser();

  const [auditions, setAuditions] = useState([]);
  const [columnDefs] = useState([
    { field: "project", filter: true },
    { field: "company", filter: true },
    { field: "type" },
  ]);
  useEffect(() => {
    SignUpOrSignIn().then(() => {
      getAuditions().then((response) => {
        setAuditions(response.auditions);
      });
    });
  }, [user]);
  if (user) {
    return (
      <>
        <h1>Welcome {user.name}</h1>
        <p>Email - {user.email}</p>
        <a href={"/api/auth/logout"}>Logout</a>
        <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
          <AgGridReact
            rowData={auditions}
            columnDefs={columnDefs}
          ></AgGridReact>
        </div>
      </>
    );
  }
  return <a href={"api/auth/login"}>Login</a>;
};
