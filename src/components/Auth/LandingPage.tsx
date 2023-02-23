'use client'

import {LoginButton} from "@/components/Auth/LoginButton";
import {useUser} from '@auth0/nextjs-auth0/client';

export const LandingPage = ()=> {
    const {user, error, isLoading} = useUser();
    console.log(user)
    console.log(user)
    if (user) {
        return (
            <>
                <h1>Welcome {user.name}</h1>
                <a href={'/api/auth/logout'}>Logout</a>
            </>
        )
    }
    return <a href={'api/auth/login'}>Login</a>
}

