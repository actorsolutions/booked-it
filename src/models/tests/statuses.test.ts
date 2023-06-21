import { Status } from "../Statuses";
import { PrismaClient } from "@prisma/client";

describe("It tests the Status Model", () => {
  it("Returns a status by type", async () => {
    const expectedResponse = {
      id: 0,
      type: "submitted",
    };
    const mockPrisma = {
      findUnique: async () => {
        return new Promise((resolve) => {
          resolve(expectedResponse);
        });
      },
    };
    const status = await Status.findByStatusType(
      expectedResponse.type,
      mockPrisma as unknown as PrismaClient["status"]
    );
    expect(status).toEqual(expectedResponse);
  });
  it("Returns a status by id", async () => {
    const expectedResponse = {
      id: 0,
      type: "submitted",
    };
    const mockPrisma = {
      findUnique: async () => {
        return new Promise((resolve) => {
          resolve(expectedResponse);
        });
      },
    };
    const status = await Status.findById(
      expectedResponse.id,
      mockPrisma as unknown as PrismaClient["status"]
    );
    expect(status).toEqual(expectedResponse);
  });
});
