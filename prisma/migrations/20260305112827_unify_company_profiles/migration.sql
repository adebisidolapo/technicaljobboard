-- CreateEnum
CREATE TYPE "CompanyType" AS ENUM ('COMPANY', 'AGENCY');

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT DEFAULT 'United States',
ADD COLUMN     "state" TEXT,
ADD COLUMN     "type" "CompanyType" NOT NULL DEFAULT 'COMPANY';

-- AlterTable
ALTER TABLE "EmployerProfile" ADD COLUMN     "email" TEXT,
ADD COLUMN     "fullName" TEXT,
ADD COLUMN     "roleTitle" TEXT;

-- AlterTable
ALTER TABLE "JobseekerProfile" ADD COLUMN     "email" TEXT;

-- CreateIndex
CREATE INDEX "Company_type_idx" ON "Company"("type");
