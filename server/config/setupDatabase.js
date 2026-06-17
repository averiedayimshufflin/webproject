const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");

const command = process.argv[2];
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL is missing.");
  console.error("Set it first, then run this command again.");
  process.exit(1);
}

const requiresSsl =
  process.env.DB_SSL === "true" ||
  process.env.PGSSLMODE === "require" ||
  connectionString.includes("sslmode=require");

const pool = new Pool({
  connectionString,
  ssl: requiresSsl ? { rejectUnauthorized: false } : undefined,
});

function readSql(fileName) {
  return fs.readFileSync(path.join(__dirname, fileName), "utf8");
}

async function setupDatabase() {
  await pool.query(readSql("schema.sql"));
  await pool.query(readSql("seed.sql"));
  console.log("Database table created and seeded.");
}

async function showMakeupLooks() {
  const result = await pool.query("SELECT * FROM makeup_looks ORDER BY name ASC;");
  console.table(result.rows);
}

async function main() {
  try {
    if (command === "setup") {
      await setupDatabase();
    } else if (command === "show") {
      await showMakeupLooks();
    } else {
      console.error("Use one of these commands:");
      console.error("  npm run db:setup");
      console.error("  npm run db:show");
      process.exitCode = 1;
    }
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
