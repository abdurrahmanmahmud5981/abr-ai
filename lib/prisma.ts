import { PrismaClient } from "./generated/prisma";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const db  = globalThis.prisma || new PrismaClient();

if(process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

// globalThis.prisma: this is used to ensure that the Prisma Client instance is reused in development mode, preventing the creation of multiple instances which can lead to issues like connection limits being exceeded.
// In production, a new instance is created each time, which is the standard behavior.
// This pattern is commonly used in Next.js applications to manage database connections efficiently, especially during development where hot reloading can cause multiple instances to be created.
// This code initializes a Prisma Client instance and ensures that it is reused in development mode to avoid issues with multiple instances being created during hot reloading.