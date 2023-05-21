'use client'
import { signIn } from "next-auth/react"


export const LoginButton = ()=>{
    return(
        <button className={'btn'} onClick={() => signIn()}>Sign in</button>

    )
}
