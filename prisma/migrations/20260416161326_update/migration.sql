/*
  Warnings:

  - Added the required column `dt_update` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "db_growtwitter_schemas"."usuario" ADD COLUMN     "dt_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dt_update" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "foto_perfil" DROP NOT NULL;

-- CreateTable
CREATE TABLE "db_growtwitter_schemas"."tweet" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "conteudo" VARCHAR(280) NOT NULL,
    "dt_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_update" TIMESTAMP(3) NOT NULL,
    "replay_id" UUID,
    "user_id" UUID NOT NULL,

    CONSTRAINT "tweet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "db_growtwitter_schemas"."tweet" ADD CONSTRAINT "tweet_replay_id_fkey" FOREIGN KEY ("replay_id") REFERENCES "db_growtwitter_schemas"."tweet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "db_growtwitter_schemas"."tweet" ADD CONSTRAINT "tweet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "db_growtwitter_schemas"."usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
