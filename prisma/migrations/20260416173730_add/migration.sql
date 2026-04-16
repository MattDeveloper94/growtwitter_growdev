-- CreateTable
CREATE TABLE "db_growtwitter_schemas"."follow" (
    "follower_id" UUID NOT NULL,
    "following_id" UUID NOT NULL,
    "dt_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "follow_pkey" PRIMARY KEY ("follower_id","following_id")
);

-- AddForeignKey
ALTER TABLE "db_growtwitter_schemas"."follow" ADD CONSTRAINT "follow_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "db_growtwitter_schemas"."usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "db_growtwitter_schemas"."follow" ADD CONSTRAINT "follow_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "db_growtwitter_schemas"."usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
