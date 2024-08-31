-- CreateTable
CREATE TABLE "TestUsers" (
    "name" TEXT NOT NULL,
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "TestUsers_pkey" PRIMARY KEY ("id")
);
