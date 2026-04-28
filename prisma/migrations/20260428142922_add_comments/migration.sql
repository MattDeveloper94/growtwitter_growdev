-- CreateTable
CREATE TABLE "db_growtwitter_schemas"."comment" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "conteudo" VARCHAR(280) NOT NULL,
    "user_id" UUID NOT NULL,
    "tweet_id" UUID NOT NULL,
    "dt_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "db_growtwitter_schemas"."comment" ADD CONSTRAINT "comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "db_growtwitter_schemas"."usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "db_growtwitter_schemas"."comment" ADD CONSTRAINT "comment_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "db_growtwitter_schemas"."tweet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
