-- CreateTable
CREATE TABLE "SessionData" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL,
    "expiresAt" TEXT NOT NULL,

    CONSTRAINT "SessionData_pkey" PRIMARY KEY ("id")
);
