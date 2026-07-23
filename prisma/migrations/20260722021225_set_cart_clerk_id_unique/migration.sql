/*
  Warnings:

  - A unique constraint covering the columns `[clerkId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Cart_clerkId_key" ON "Cart"("clerkId");
