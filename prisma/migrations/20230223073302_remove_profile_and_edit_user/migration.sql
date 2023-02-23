/*
  Warnings:

  - You are about to drop the column `profileId` on the `Audition` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Audition` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Audition` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Audition" DROP CONSTRAINT "Audition_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropIndex
DROP INDEX "Audition_profileId_key";

-- AlterTable
ALTER TABLE "Audition" DROP COLUMN "profileId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password";

-- DropTable
DROP TABLE "Profile";

-- CreateIndex
CREATE UNIQUE INDEX "Audition_userId_key" ON "Audition"("userId");

-- AddForeignKey
ALTER TABLE "Audition" ADD CONSTRAINT "Audition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
