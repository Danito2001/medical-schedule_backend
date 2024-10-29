/*
  Warnings:

  - You are about to drop the column `patientId` on the `DoctorAvailability` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "DoctorAvailability" DROP CONSTRAINT "DoctorAvailability_patientId_fkey";

-- AlterTable
ALTER TABLE "DoctorAvailability" DROP COLUMN "patientId";
