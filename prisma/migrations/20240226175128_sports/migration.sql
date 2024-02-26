/*
  Warnings:

  - Added the required column `sport` to the `Court` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SPORTS" AS ENUM ('tenis', 'futbol', 'basquet', 'voleibol', 'hockey', 'rugby');

-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "sports" "SPORTS"[];

-- AlterTable
ALTER TABLE "Court" ADD COLUMN     "sport" "SPORTS" NOT NULL;
