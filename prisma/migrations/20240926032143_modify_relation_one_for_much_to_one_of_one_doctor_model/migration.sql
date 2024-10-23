/*
  Warnings:

  - A unique constraint covering the columns `[doctorId]` on the table `DoctorAvailability` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DoctorAvailability_doctorId_key" ON "DoctorAvailability"("doctorId");
