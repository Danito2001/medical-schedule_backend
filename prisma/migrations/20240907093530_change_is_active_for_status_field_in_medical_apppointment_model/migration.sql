/*
  Warnings:

  - You are about to drop the column `is_active` on the `MedicalAppointment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MedicalAppointment" DROP COLUMN "is_active",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending';
