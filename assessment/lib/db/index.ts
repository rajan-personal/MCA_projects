import { config } from "dotenv";
import { resolve } from "path";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// Load .env.local in non-production environments
if (process.env.NODE_ENV !== "production") {
  config({ path: resolve(process.cwd(), ".env.local") });
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set in the environment variables");
}

const pool = new Pool({ connectionString });

export const db = drizzle(pool);
export { pool };
