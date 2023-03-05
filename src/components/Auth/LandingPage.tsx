'use client'
import {useState} from 'react'
import {LoginButton} from "@/components/Auth/LoginButton";
import {useUser} from '@auth0/nextjs-auth0/client';

export const LandingPage = ()=> {
    const [registeredUser,setRegisteredUser] = useState({});
    const {user, error, isLoading} = useUser();
    if (user) {
        // Send to registration  URL
        const SignUpOrSignIn = async ()=>{
            const response =  await fetch('/api/auth/registration',{
                method:'POST',
                body:JSON.stringify(user)
            });
            return response.json()
        }
        SignUpOrSignIn().then((response)=>{
            user.id = response.user.id
            setRegisteredUser(user)
        })

        console.log(registeredUser)
        return (
            <>
                <h1>Welcome {user.name}</h1>
                <p>Email - {user.email}</p>
                <p>SID: {user.id}</p>
                <a href={'/api/auth/logout'}>Logout</a>
            </>
        )
    }
    return <a href={'api/auth/login'}>Login</a>
}

