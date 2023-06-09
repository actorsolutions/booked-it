import RESPONSE_MESSAGES from "@/support/response_messages";
export const SignUpOrSignIn = async () => {
  const response = await fetch("/api/auth/registration", {
    method: "POST",
  });
  if (response.status !== 200) {
    throw Error(RESPONSE_MESSAGES.AUTH_MESSAGES.SIGNIN_SIGNUP_FAILURE)
  }
  return response.json();
};
