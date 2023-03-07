import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { Users } from "../../../utils/models/Users";

const Registration = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { sid, email } = JSON.parse(req.body);
    const prisma = new PrismaClient();
    const users = new Users(prisma.user);
    const user = await users.signUpOrSignIn({ email, sid });

    res.status(200).json({ user });
  }
};

export default Registration;
