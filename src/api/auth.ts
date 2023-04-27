export const SignUpOrSignIn = async () => {
  const response = await fetch("/api/auth/registration", {
    method: "POST",
  });
  return response.json();
};
