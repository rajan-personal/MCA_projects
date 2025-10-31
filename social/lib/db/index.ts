import { config } from "dotenv";
import { resolve } from "path";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

// Surface local .env values when running tooling outside of Next.js runtime.
if (process.env.NODE_ENV !== "production") {
  config({ path: resolve(process.cwd(), ".env.local") });
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set in the environment variables");
}

const pool = new Pool({ connectionString });

export const db = drizzle(pool, { schema });
export { pool };
export { schema };
