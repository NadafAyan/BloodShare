const pool = require("../db");

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS donors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    blood_group VARCHAR(10),
    email VARCHAR(100),
    phone VARCHAR(15),
    location VARCHAR(100)
  );
`;

pool.query(createTableQuery)
  .then(() => {
    console.log("✅ Donors table created");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Failed to create donors table:", err.message);
    process.exit(1);
  });
