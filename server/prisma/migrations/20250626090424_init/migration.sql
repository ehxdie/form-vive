-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "problem" TEXT NOT NULL,
    "audience" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "persona" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);
