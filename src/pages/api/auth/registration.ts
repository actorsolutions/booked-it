import { PrismaClient } from '@prisma/client'
import {NextApiRequest, NextApiResponse} from "next";
/***
 * Hook for Auth0 to send user information for prisma
 * */

const Registration = async(req:NextApiRequest,res:NextApiResponse)=>{
    console.log("hitting reg")
    const {email,secret} = JSON.parse(req.body);
    const prisma = new PrismaClient();
    console.log(secret)
    if(secret === process.env.AUTH0_HOOK_SECRET){
        try {
            const newUser = await prisma.user.create({
                data:{email},
            })
            console.log('Creating User!')
        }catch(err){
            console.log(err)
        }finally{
            await prisma.$disconnect();
        }
        res.send({received:true});
    }else{
        console.log("No secret!");
        res.status(500)
    }


}

export default Registration
