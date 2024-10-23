-- AlterTable
ALTER TABLE "DoctorAvailability" ADD COLUMN     "days" TEXT[],
ALTER COLUMN "startDateTime" SET DATA TYPE TEXT,
ALTER COLUMN "endDateTime" SET DATA TYPE TEXT;
