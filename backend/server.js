const express = require("express");
const pool = require("./db");
require("dotenv").config();

const app = express();
app.use(express.json());

app.post("/api/register", async (req, res) => {
  const { name, blood_group, email, phone, location } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO donors (name, blood_group, email, phone, location)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, blood_group, email, phone, location]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Registration failed:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
