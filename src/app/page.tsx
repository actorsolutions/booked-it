import { useSession, signIn, signOut } from "next-auth/react"
import {LoginButton} from "@/components/Auth/LoginButton";

export default function Home() {
  return (
    <main className={'container'}>
      <LoginButton />


    </main>
  )
}
