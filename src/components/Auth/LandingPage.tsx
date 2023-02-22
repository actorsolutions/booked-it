'use client'

import {LoginButton} from "@/components/Auth/LoginButton";
import {useUser} from '@auth0/nextjs-auth0/client';

export const LandingPage = ()=>{
    const {user,error,isLoading}  = useUser();
    console.log(user)
return(<div> Don't mind me</div>)
}
