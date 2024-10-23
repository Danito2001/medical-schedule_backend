/*
  Warnings:

  - You are about to drop the column `fechaHora` on the `MedicalAppointment` table. All the data in the column will be lost.
  - Added the required column `dateAndTime` to the `MedicalAppointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MedicalAppointment" DROP COLUMN "fechaHora",
ADD COLUMN     "dateAndTime" TIMESTAMP(3) NOT NULL;
