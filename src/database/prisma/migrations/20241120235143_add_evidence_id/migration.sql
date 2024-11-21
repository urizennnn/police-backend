/*
  Warnings:

  - Added the required column `evidence_id` to the `Evidence` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Evidence" ADD COLUMN     "evidence_id" TEXT NOT NULL;
