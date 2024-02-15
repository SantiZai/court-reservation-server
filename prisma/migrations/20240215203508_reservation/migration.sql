/*
  Warnings:

  - Added the required column `hour` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "hour" VARCHAR(10) NOT NULL;
