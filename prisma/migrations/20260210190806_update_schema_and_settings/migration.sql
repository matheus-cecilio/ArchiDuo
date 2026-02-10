/*
  Warnings:

  - You are about to drop the column `surfaceColor` on the `SiteSettings` table. All the data in the column will be lost.
  - You are about to drop the column `textColor` on the `SiteSettings` table. All the data in the column will be lost.
  - You are about to drop the `ProjectImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProjectImage" DROP CONSTRAINT "ProjectImage_projectId_fkey";

-- AlterTable
ALTER TABLE "SiteSettings" DROP COLUMN "surfaceColor",
DROP COLUMN "textColor",
ALTER COLUMN "heroTitle" SET DEFAULT 'Transformando espaços em experiências',
ALTER COLUMN "heroSubtitle" SET DEFAULT 'Criamos projetos arquitetônicos únicos que unem funcionalidade, estética e a essência de cada cliente.';

-- DropTable
DROP TABLE "ProjectImage";
