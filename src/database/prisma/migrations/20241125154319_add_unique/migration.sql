/*
  Warnings:

  - A unique constraint covering the columns `[badgeNumber]` on the table `Officer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Case" DROP CONSTRAINT "Case_officerId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Officer_badgeNumber_key" ON "Officer"("badgeNumber");

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_officerId_fkey" FOREIGN KEY ("officerId") REFERENCES "Officer"("badgeNumber") ON DELETE SET NULL ON UPDATE CASCADE;
