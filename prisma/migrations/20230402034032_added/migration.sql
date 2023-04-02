/*
  Warnings:

  - Added the required column `type` to the `Audition` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AuditionType" AS ENUM ('Television', 'Film', 'Student', 'Theater', 'Industrial', 'Commercial', 'NewMedia');

-- AlterTable
ALTER TABLE "Audition" ADD COLUMN     "type" "AuditionType" NOT NULL;
