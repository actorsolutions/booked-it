-- CreateEnum
CREATE TYPE "audition_types" AS ENUM ('Television', 'Film', 'Student', 'Theater', 'Industrial', 'Commercial', 'NewMedia');

-- CreateEnum
CREATE TYPE "audition_statuses" AS ENUM ('submitted', 'scheduled', 'auditioned', 'callback', 'booked');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "sid" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Audition" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" INTEGER NOT NULL,
    "project" TEXT NOT NULL,
    "company" TEXT,
    "callBackDate" INTEGER,
    "casting" JSONB,
    "notes" TEXT,
    "type" "audition_types" NOT NULL,
    "status" "audition_statuses" NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Audition_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_sid_key" ON "User"("sid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Audition" ADD CONSTRAINT "Audition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

