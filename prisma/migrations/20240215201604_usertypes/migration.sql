/*
  Warnings:

  - You are about to drop the column `admin` on the `User` table. All the data in the column will be lost.
  - Added the required column `surface` to the `Court` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "USER_TYPES" AS ENUM ('superadmin', 'admin', 'user');

-- CreateEnum
CREATE TYPE "SURFACES" AS ENUM ('polvo_de_ladrillo', 'cemento', 'cesped', 'parquet', 'arena', 'alfombra');

-- AlterTable
ALTER TABLE "Court" ADD COLUMN     "surface" "SURFACES" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "admin",
ADD COLUMN     "userType" "USER_TYPES" NOT NULL DEFAULT 'user';
