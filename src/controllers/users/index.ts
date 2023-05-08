import { NextApiRequest, NextApiResponse } from "next";
import { Users } from "../../models/Users";
import { getSession } from "@auth0/nextjs-auth0";
import { prisma } from "../../utils/prisma";

export const getUserByEmail = async (
    req: NextApiRequest,
    res: NextApiResponse,
    db = prisma.user
) => {
    const session = await getSession(req, res);
    const email = session?.user.email;
    const user = await Users.findByEmail(email, db);
    if (email) {
        res.status(200).send({ user })
    } else {
        res.status(500).send({error: 'No User with that email.'})
    }
};

export const getUserById = async (
    req: NextApiRequest,
    res: NextApiResponse,
    db = prisma.user
) => {
    const session = await getSession(req, res);
    const userId = parseInt(session?.user.id);
    const { id } = req.query;
    const user = await Users.findById(parseInt(id as string), db);
    if (user?.id != userId) {
        return res.status(401).send({ message: "Unauthorized" });
    }
    return res.status(200).send(user)
};

export const registerOrSignInUser = async (
    req: NextApiRequest,
    res: NextApiResponse,
    db = prisma.user
) => {
    const session = await getSession(req, res);
    const id = parseInt(session?.user.id);
    const { email, sid } = req.body;
    const userData = { id, email, sid }
    const registeredUser = await Users.signUpOrSignIn(userData, db)
    res.status(200).send(registeredUser)
}