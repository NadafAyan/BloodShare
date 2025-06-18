
const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all donors
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM donors");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new donor
router.post("/", async (req, res) => {
  const { name, blood_type, location, contact } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO donors (name, blood_type, location, contact) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, blood_type, location, contact]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a donor
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM donors WHERE id = $1", [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
