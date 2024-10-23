/*
  Warnings:

  - A unique constraint covering the columns `[rut,prevision]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Patient_rut_prevision_key" ON "Patient"("rut", "prevision");
