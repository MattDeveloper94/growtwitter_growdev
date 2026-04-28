/*
  Warnings:

  - Added the required column `dt_update` to the `comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "db_growtwitter_schemas"."comment" ADD COLUMN     "dt_update" TIMESTAMP(3) NOT NULL;
