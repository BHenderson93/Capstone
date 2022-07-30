-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Api" (
    "id" SERIAL NOT NULL,
    "data" TEXT NOT NULL,

    CONSTRAINT "Api_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mood" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categories" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "createdById" INTEGER NOT NULL,

    CONSTRAINT "Mood_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Mood" ADD CONSTRAINT "Mood_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
