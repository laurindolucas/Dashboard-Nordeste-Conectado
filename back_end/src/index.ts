import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { prisma } from "./prisma";

const PORT = process.env.PORT || 3333;

async function start() {
  try {
    await prisma.$connect();
    console.log("✅ Conectado ao banco PostgreSQL!");

    app.listen(PORT, () => {
      console.log(`🔥 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Erro ao conectar no banco:", err);
    process.exit(1);
  }
}

start();
