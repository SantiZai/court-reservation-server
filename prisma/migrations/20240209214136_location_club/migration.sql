/*
  Warnings:

  - Added the required column `location` to the `Club` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "location" VARCHAR(150) NOT NULL;
