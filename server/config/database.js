const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;
const requiresSsl =
  process.env.DB_SSL === "true" ||
  process.env.PGSSLMODE === "require" ||
  (connectionString && connectionString.includes("sslmode=require"));

if (!connectionString) {
  console.warn("DATABASE_URL is not set. Database-backed pages will return an error.");
}

const pool = new Pool({
  connectionString,
  ssl: requiresSsl ? { rejectUnauthorized: false } : undefined,
});

function normalizeLook(row) {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    difficulty: row.difficulty,
    occasion: row.occasion,
    time: row.time_to_complete,
    products: row.products,
    description: row.description,
    tip: row.tip,
    image: row.image,
  };
}

async function getMakeupLooks(filters = {}) {
  const category = filters.category || "";
  const difficulty = filters.difficulty || "";

  const result = await pool.query(
    `
      SELECT id, name, category, difficulty, occasion, time_to_complete, products, description, tip, image
      FROM makeup_looks
      WHERE ($1 = '' OR category = $1)
        AND ($2 = '' OR difficulty = $2)
      ORDER BY name ASC;
    `,
    [category, difficulty]
  );

  return result.rows.map(normalizeLook);
}

async function getMakeupLookById(id) {
  const result = await pool.query(
    `
      SELECT id, name, category, difficulty, occasion, time_to_complete, products, description, tip, image
      FROM makeup_looks
      WHERE id = $1;
    `,
    [id]
  );

  return result.rows[0] ? normalizeLook(result.rows[0]) : null;
}

async function getFilterOptions() {
  const [categories, difficulties] = await Promise.all([
    pool.query("SELECT DISTINCT category FROM makeup_looks ORDER BY category ASC;"),
    pool.query("SELECT DISTINCT difficulty FROM makeup_looks ORDER BY difficulty ASC;"),
  ]);

  return {
    categories: categories.rows.map((row) => row.category),
    difficulties: difficulties.rows.map((row) => row.difficulty),
  };
}

module.exports = {
  getFilterOptions,
  getMakeupLookById,
  getMakeupLooks,
};
