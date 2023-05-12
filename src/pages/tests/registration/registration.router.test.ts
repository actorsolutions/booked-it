import RegistrationController from '@/pages/api/auth/registration';
import {
    IntegrationTestParams,
    setup,
    testClient,
    SESSION_DATA,
    tearDown
} from "@/utils/testSetup";
import { expect } from '@jest/globals';
import { generateSessionCookie } from "@auth0/nextjs-auth0/testing";

describe('Registration router integration tests', () => {
    let test: IntegrationTestParams;
    beforeEach(async () => {
        test = await setup(['user']);
        const {prisma} = test;
        await prisma.user.create({
            data: {
                id: 0,
                sid: "0000000",
                email: "test@test.com",
            }
        })
    });
    afterEach(async () => {
        await tearDown(test)
    })
    it('should sign a user in, if they already exist', async () => {
        const request = await testClient(RegistrationController);
        const session = await generateSessionCookie(SESSION_DATA, {
            secret: process.env.AUTH0_SECRET as string,
        });
        const EXPECTED_USER = {
            id: 0,
            sid: "0000000",
            email: "test@test.com",
        };
        const res = await request
            .post("/")
            .set("Cookie", [`appSession=${session}`])
            .send(EXPECTED_USER)

        expect(res.statusCode).toEqual(200);
        expect(res.body.id).toEqual(EXPECTED_USER.id)
    });
    it('should create a new user', async () => {
        const EXPECTED_USER = {
            id: 3,
            sid: "3333333",
            email: "differenttest@test.com",
        };
        const request = await testClient(RegistrationController);
        const session = await generateSessionCookie({user: EXPECTED_USER}, {
            secret: process.env.AUTH0_SECRET as string,
        });

        const res = await request
            .post("/")
            .set("Cookie", [`appSession=${session}`])
            .send(EXPECTED_USER)

        expect(res.statusCode).toEqual(200);
        expect(res.body.email).toEqual(EXPECTED_USER.email)
    });
    it('should throw an error if there is no active session', async () => {
        const EXPECTED_USER = {
            id: 3,
            sid: "3333333",
            email: "differenttest@test.com",
        };
        const request = await testClient(RegistrationController);

        const res = await request
            .post("/")
            .set("Cookie", [`appSession=`])
            .send(EXPECTED_USER)

        expect(res.statusCode).toEqual(500);
        expect(res.body.message).toEqual('Please sign in')
    })
})