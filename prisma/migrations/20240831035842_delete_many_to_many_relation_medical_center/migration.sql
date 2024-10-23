/*
  Warnings:

  - You are about to drop the `_DoctorCenter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DoctorCenter" DROP CONSTRAINT "_DoctorCenter_A_fkey";

-- DropForeignKey
ALTER TABLE "_DoctorCenter" DROP CONSTRAINT "_DoctorCenter_B_fkey";

-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "centersId" INTEGER;

-- DropTable
DROP TABLE "_DoctorCenter";

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_centersId_fkey" FOREIGN KEY ("centersId") REFERENCES "MedicalCenter"("id") ON DELETE SET NULL ON UPDATE CASCADE;
