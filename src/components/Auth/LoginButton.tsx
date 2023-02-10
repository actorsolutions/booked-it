'use client'
import { useSession, signIn, signOut } from "next-auth/react"


export const LoginButton = ()=>{
    return(
        <button className={'btn'} onClick={() => signIn()}>Sign in</button>

    )
}
