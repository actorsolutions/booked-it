import SimpleCrypto from "simple-crypto-js";
import { Prisma } from "@prisma/client";

const secretKey = process.env.SECRET_KEY;
const simpleCrypto = new SimpleCrypto(secretKey);
/**
 * salts string
 * @param entry
 */
export const encryptEntry = (entry: string) => {
  return simpleCrypto.encrypt(entry);
};

/**
 * Compares entry and word
 * @param encryptedEntry
 */
export const decryptEntry = (encryptedEntry: string) => {
  return simpleCrypto.decrypt(encryptedEntry);
};

/**
 * Encrypts AA and CN information and returns User Object
 * @param data
 */
export const encryptUserData = (data: Prisma.UserUncheckedUpdateInput) => {
  const updatedData = { ...data };
  if (data.CN_UN) {
    updatedData.CN_UN = encryptEntry(data.CN_UN as string);
  }
  if (data.CN_PW) {
    updatedData.CN_PW = encryptEntry(data.CN_PW as string);
  }
  if (data.AA_UN) {
    updatedData.AA_UN = encryptEntry(data.AA_UN as string);
  }
  if (data.AA_PW) {
    updatedData.AA_PW = encryptEntry(data.AA_PW as string);
  }
  return updatedData;
};
