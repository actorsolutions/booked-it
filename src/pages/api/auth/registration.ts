import { PrismaClient } from '@prisma/client'
import {NextApiRequest, NextApiResponse} from "next";
/***
 * Hook for Auth0 to send user information for prisma
 * */

const Registration = async(req:NextApiRequest,res:NextApiResponse)=>{
    const {sid,email} = JSON.parse(req.body);
    const prisma = new PrismaClient();
    console.log(email,sid)
    const user = await prisma.user.findUnique({
        where: {
            email
        },
    })

    if(!user){
        const newUser = await prisma.user.create({
            data: { email,sid },
        })
        res.status(200).json({newUser})
    }
    res.status(200).json({user})



}

export default Registration
