interface SignUpOrSignInProps {
  email: string;
  sid: string;
}

export const SignUpOrSignIn = async (data: SignUpOrSignInProps) => {
  const response = await fetch("/api/auth/registration", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response.json();
};
