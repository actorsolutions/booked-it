/*
  Warnings:

  - The values [Television,Film,Student,Theater,Industrial,Commercial,NewMedia] on the enum `audition_types` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "audition_types_new" AS ENUM ('television', 'film', 'student', 'theater', 'industrial', 'commercial', 'newMedia');
ALTER TABLE "Audition" ALTER COLUMN "type" TYPE "audition_types_new" USING ("type"::text::"audition_types_new");
ALTER TYPE "audition_types" RENAME TO "audition_types_old";
ALTER TYPE "audition_types_new" RENAME TO "audition_types";
DROP TYPE "audition_types_old";
COMMIT;
