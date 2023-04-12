/*
  Warnings:

  - The `callBackDate` column on the `Audition` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `date` on the `Audition` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Audition" DROP COLUMN "date",
ADD COLUMN     "date" INTEGER NOT NULL,
DROP COLUMN "callBackDate",
ADD COLUMN     "callBackDate" INTEGER;
