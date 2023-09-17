import {
  encryptEntry,
  decryptEntry,
  encryptUserData,
} from "@/models/utils/UserUtils";
import SimpleCrypto from "simple-crypto-js";
import * as process from "process";
import { Prisma } from "@prisma/client";

describe("Tests formatting auditions to AuditionData", () => {
  const secretKey = process.env.SECRET_KEY;
  const simpleCrypto = new SimpleCrypto(secretKey);

  it("encrypts an entry", () => {
    const entry = "WallyIsGreat";
    const encrypted = encryptEntry(entry);
    expect(simpleCrypto.decrypt(encrypted)).toEqual(entry);
  });
  it("decrypts an entry", () => {
    const expected = "WallyIsGreat";
    const encrypted = simpleCrypto.encrypt(expected);
    expect(decryptEntry(encrypted)).toEqual(expected);
  });
  it("encrypts CN and AA data", () => {
    const CN_UN = "Wally@email.com";
    const CN_PW = "Bones";
    const AA_UN = "Doofus@email.com";
    const AA_PW = "Scritches";
    const FAKE_USER = {
      id: 1,
      sid: "FakeSid2",
      email: "test2@email.com",
      createdAt: 0,
      CN_UN,
      CN_PW,
      AA_PW,
      AA_UN,
    };
    const encryptedUser = encryptUserData(FAKE_USER as Prisma.UserUpdateInput);
    if (encryptedUser.AA_UN === "string") {
      expect(decryptEntry(encryptedUser.AA_UN)).toEqual(AA_UN);
    }
    if (typeof encryptedUser.AA_PW === "string") {
      expect(decryptEntry(encryptedUser.AA_PW)).toEqual(AA_PW);
    }
    if (typeof encryptedUser.CN_UN === "string") {
      expect(decryptEntry(encryptedUser.CN_UN)).toEqual(CN_UN);
    }
    if (typeof encryptedUser.CN_PW === "string") {
      expect(decryptEntry(encryptedUser.CN_PW)).toEqual(CN_PW);
    }
  });
});
