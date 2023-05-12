import { Container } from "@mui/system";
import { LoginButton } from "@/components/Auth/LoginButton";

export const Login = () => {
  return (
    <Container maxWidth="md">
      <a href={"api/auth/login"}>Login</a>
    </Container>
  );
};
