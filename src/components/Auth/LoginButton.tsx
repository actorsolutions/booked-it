"use client";
import { signIn } from "next-auth/react";
import CY_TAGS from "@/support/cypress_tags";

export const LoginButton = () => {
  return (
    <button
      data-cy={CY_TAGS.COMMON.BUTTONS.LOGIN}
      className={"btn"}
      onClick={() => signIn()}
    >
      Sign in
    </button>
  );
};
