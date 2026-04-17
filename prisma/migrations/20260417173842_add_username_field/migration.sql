/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `usuario` table without a default value. This is not possible if the table is not empty.
  - Made the column `dt_nascimento` on table `usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "db_growtwitter_schemas"."usuario" ADD COLUMN     "username" VARCHAR(120) NOT NULL,
ALTER COLUMN "dt_nascimento" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "usuario_username_key" ON "db_growtwitter_schemas"."usuario"("username");
