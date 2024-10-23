/*
  Warnings:

  - You are about to drop the column `centersId` on the `Doctor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[centerId]` on the table `Doctor` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_centersId_fkey";

-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "centersId",
ADD COLUMN     "centerId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_centerId_key" ON "Doctor"("centerId");

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_centerId_fkey" FOREIGN KEY ("centerId") REFERENCES "MedicalCenter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
