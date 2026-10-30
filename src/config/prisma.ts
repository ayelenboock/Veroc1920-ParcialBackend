import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import dotenv from "dotenv";

dotenv.config();

const adapter = new PrismaMariaDb({
    host: process.env.DB_HOST!,
    port:Number(process.env.DB_PORT),
    user:process.env.DB_USER!,
    password:process.env.DB_PASS ?? "",
    database:process.env.DB_NAME!,
    connectionLimit: 10
});

export const prisma= new PrismaClient({ adapter });
