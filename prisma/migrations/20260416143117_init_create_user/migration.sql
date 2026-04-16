-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "db_growtwitter_schemas";

-- CreateTable
CREATE TABLE "db_growtwitter_schemas"."usuario" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nome" VARCHAR(120) NOT NULL,
    "email" CHAR(60) NOT NULL,
    "senha" TEXT NOT NULL,
    "dt_nascimento" DATE,
    "foto_perfil" TEXT NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "db_growtwitter_schemas"."usuario"("email");
