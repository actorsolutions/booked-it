-- AlterTable
ALTER TABLE "Audition" ALTER COLUMN "casting" DROP NOT NULL;

-- DropEnum
DROP TYPE "AuditionType";
