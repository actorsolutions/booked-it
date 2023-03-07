import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const Registration = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { sid, email } = JSON.parse(req.body);
    const prisma = new PrismaClient();
    console.log(email, sid);
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      const newUser = await prisma.user.create({
        data: { email, sid },
      });
      res.status(200).json({ newUser });
    }
    res.status(200).json({ user });
  }
};

export default Registration;
