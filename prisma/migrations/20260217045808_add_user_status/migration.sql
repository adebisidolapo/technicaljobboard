-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('ACTIVE', 'HIBERNATED', 'SUSPENDED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "AccountStatus" NOT NULL DEFAULT 'ACTIVE';

-- CreateIndex
CREATE INDEX "User_status_idx" ON "User"("status");
