/*
  Warnings:

  - Changed the type of `type` on the `Audition` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Audition" DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL;
