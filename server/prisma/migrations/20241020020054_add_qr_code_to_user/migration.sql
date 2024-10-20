/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Vendor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Washer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `qr` to the `Discount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qr` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qr` to the `Station` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qr` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Washer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Washer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Discount" ADD COLUMN     "qr" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "qr" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Station" ADD COLUMN     "qr" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "qr" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Vendor" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Washer" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_email_key" ON "Vendor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Washer_email_key" ON "Washer"("email");
