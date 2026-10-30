import "dotenv/config";
import { defineConfig ,env} from "prisma/config";

export default defineConfig({

  // la ruta directa hacia el ARCHIVO del esquema
  schema: "./prisma/schema.prisma", 
  
  // la ruta hacia la CARPETA donde se guardarán tus migraciones
  migrations: {
    path: "./prisma/migrations", 
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});

