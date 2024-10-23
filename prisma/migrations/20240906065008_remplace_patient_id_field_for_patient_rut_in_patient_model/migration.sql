/*
  Warnings:

  - You are about to drop the column `patientId` on the `MedicalAppointment` table. All the data in the column will be lost.
  - Added the required column `patientRut` to the `MedicalAppointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MedicalAppointment" DROP CONSTRAINT "MedicalAppointment_patientId_fkey";

-- AlterTable
ALTER TABLE "MedicalAppointment" DROP COLUMN "patientId",
ADD COLUMN     "patientRut" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "MedicalAppointment" ADD CONSTRAINT "MedicalAppointment_patientRut_fkey" FOREIGN KEY ("patientRut") REFERENCES "Patient"("rut") ON DELETE RESTRICT ON UPDATE CASCADE;
