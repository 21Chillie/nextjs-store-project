/*
  Warnings:

  - A unique constraint covering the columns `[clerkId,productId]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Favorite_clerkId_productId_key" ON "Favorite"("clerkId", "productId");
