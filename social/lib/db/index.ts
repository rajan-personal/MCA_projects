import { config } from "dotenv";
import { resolve } from "path";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Surface local .env values when running tooling outside of Next.js runtime.
if (process.env.NODE_ENV !== "production") {
  config({ path: resolve(process.cwd(), ".env.local") });
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set in the environment variables");
}

const sslRequired = process.env.NODE_ENV === "production";

// Share a single connection pool across the Next.js runtime.
const client = postgres(connectionString, {
  ssl: sslRequired ? "require" : false,
});

export const db = drizzle(client, { schema });
export { client as connection }; // Useful for running raw SQL in scripts.
export { schema };
