-- CreateEnum
CREATE TYPE "verification" AS ENUM ('Activate', 'Block');

-- CreateEnum
CREATE TYPE "status" AS ENUM ('Pending', 'Completed');

-- CreateTable
CREATE TABLE "admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "resetPassCode" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "disabledAt" TIMESTAMP(3),
    "status" "verification" NOT NULL DEFAULT E'Activate'
);

-- CreateTable
CREATE TABLE "claims" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "observation" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "status" "status" NOT NULL DEFAULT E'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_id_key" ON "admin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admin_resetPassCode_key" ON "admin"("resetPassCode");

-- CreateIndex
CREATE UNIQUE INDEX "claims_id_key" ON "claims"("id");
