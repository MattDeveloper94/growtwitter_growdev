/*
  Warnings:

  - You are about to drop the column `replay_id` on the `tweet` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "db_growtwitter_schemas"."tweet" DROP CONSTRAINT "tweet_replay_id_fkey";

-- AlterTable
ALTER TABLE "db_growtwitter_schemas"."tweet" DROP COLUMN "replay_id",
ADD COLUMN     "reply_id" UUID;

-- CreateTable
CREATE TABLE "db_growtwitter_schemas"."like" (
    "usuario_id" UUID NOT NULL,
    "tweet_id" UUID NOT NULL,
    "dt_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "like_pkey" PRIMARY KEY ("usuario_id","tweet_id")
);

-- AddForeignKey
ALTER TABLE "db_growtwitter_schemas"."tweet" ADD CONSTRAINT "tweet_reply_id_fkey" FOREIGN KEY ("reply_id") REFERENCES "db_growtwitter_schemas"."tweet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "db_growtwitter_schemas"."like" ADD CONSTRAINT "like_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "db_growtwitter_schemas"."usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "db_growtwitter_schemas"."like" ADD CONSTRAINT "like_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "db_growtwitter_schemas"."tweet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
