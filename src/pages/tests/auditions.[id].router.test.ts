import AuditionController from "../api/auditions/[id]";
import {
    IntegrationTestParams,
    setup,
    testClient,
    SESSION_DATA,
} from "../../utils/testSetup";
import { generateSessionCookie } from "@auth0/nextjs-auth0/testing";

describe("Audition [id] integration tests", () => {
    beforeEach(async () => {
        let test: IntegrationTestParams;
        test = await  setup(['audition', 'user']);
        const { prisma } = test;
        await prisma.user.create({
            data: {
                id: 0,
                sid: "0000000",
                email: "test@test.com",
            }
        })
        await prisma.audition.create({
            data: {
                    date: 0,
                    id: 0,
                    notes: "Here is a note",
                    project: "Test Project",
                    type: "Television",
                    userId: 0,
                    company: "Test Company",
                    createdAt: "2023-04-28T21:50:11.638Z",
            },
        })
    });
    it('should get a particular audition', async () => {
        const request = await testClient(AuditionController);
        const session = await generateSessionCookie(SESSION_DATA, {
            secret: process.env.AUTH0_SECRET as string,
        });
        const expectedAudition = {
            callBackDate: null,
            casting: null,
            company: "Test Company",
            createdAt: "2023-04-28T21:50:11.638Z",
            date: 0,
            id: 0,
            notes: "Here is a note",
            project: "Test Project",
            type: "Television",
            userId: 0
        };


        const res = await request
            .get(`/0`)
            .set('Cookie', [`appSession=${session}`])

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(expectedAudition);
    });
    it('should update an audition', async () => {
        const request = await testClient(AuditionController);
        const session = await generateSessionCookie(SESSION_DATA, {
            secret: process.env.AUTH0_SECRET as string,
        });
        const updatedAudition = {
            callBackDate: null,
            casting: null,
            company: "Test Company",
            createdAt: "2023-04-28T21:50:11.638Z",
            date: 0,
            id: 0,
            notes: "THIS IS A DIFFERENT NOTE",
            project: "UPDATED PROJECT",
            type: "Television",
            userId: 0
        };

        const res = await request
            .put(`/0`)
            .set('Cookie', [`appSession=${session}`])

        expect(res.statusCode).toEqual(200);
        expect(res.body.notes).toEqual(updatedAudition.notes);
    });
    it('should delete an audition', async () => {
        const request = await testClient(AuditionController);
        const session = await generateSessionCookie(SESSION_DATA, {
            secret: process.env.AUTH0_SECRET as string,
        });
        const deletedAudition = {
            callBackDate: null,
            casting: null,
            company: "Test Company",
            createdAt: "2023-04-28T21:50:11.638Z",
            date: 0,
            id: 0,
            notes: "Here is a note",
            project: "Test Project",
            type: "Television",
            userId: 0
        };
        const res = await request
            .delete(`/0`)
            .set('Cookie', [`appSession=${session}`])

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(deletedAudition);
    });
    it('should throw an error if trying to create an audition', async () => {
        const request = await testClient(AuditionController);
        const session = await generateSessionCookie(SESSION_DATA, {
            secret: process.env.AUTH0_SECRET as string,
        });
        const res = await request
            .post(`/0`)
            .set('Cookie', [`appSession=${session}`])
        expect(res.statusCode).toEqual(401);
        expect(res.body.statusMessage).toEqual('Unauthorized')
    })
// //     only allowed to use get, put, delete; any other is forbidden see: RouteHandler
    it('should throw an error if user does not own audition', async ()=> {
        const request = await testClient(AuditionController);
        const session = await generateSessionCookie(SESSION_DATA, {
            secret: process.env.AUTH0_SECRET as string,
        });
        const res = await request
            .post(`/0`)
            .set('Cookie', [`appSession=${session}`])
        expect(res.statusCode).toEqual(401);
        expect(res.body.statusMessage).toEqual('Unauthorized')
    })
})