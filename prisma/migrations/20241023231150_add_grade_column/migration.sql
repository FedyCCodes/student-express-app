-- CreateEnum
CREATE TYPE "GradeEnum" AS ENUM ('FRESHMAN', 'SOPHOMORE', 'JUNIOR', 'SENIOR');

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "grade" "GradeEnum" NOT NULL DEFAULT 'FRESHMAN';
