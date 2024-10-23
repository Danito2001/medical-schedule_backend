/*
  Warnings:

  - You are about to drop the column `prevision` on the `Patient` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Patient_rut_prevision_key";

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "prevision",
ADD COLUMN     "previsionId" INTEGER;

-- CreateTable
CREATE TABLE "Prevision" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Prevision_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Prevision_name_key" ON "Prevision"("name");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_previsionId_fkey" FOREIGN KEY ("previsionId") REFERENCES "Prevision"("id") ON DELETE SET NULL ON UPDATE CASCADE;
