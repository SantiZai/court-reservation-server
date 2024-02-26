/*
  Warnings:

  - Added the required column `date` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "date" VARCHAR(20) NOT NULL;
