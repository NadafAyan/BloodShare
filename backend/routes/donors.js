const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/register", async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      age,
      bloodGroup,
      city,
      address,
      emergencyContact,
      medicalConditions,
      agreeToTerms,
      availableForEmergency
    } = req.body;

    const query = `
      INSERT INTO donors (
        full_name, email, phone, age, blood_group, city, address,
        emergency_contact, medical_conditions, agree_to_terms, available_for_emergency
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      RETURNING id
    `;

    const values = [
      fullName,
      email,
      phone,
      age,
      bloodGroup,
      city,
      address,
      emergencyContact,
      medicalConditions || null,
      agreeToTerms,
      availableForEmergency,
    ];

    const result = await db.query(query, values);
    res.status(201).json({ message: "Donor registered", donorId: result.rows[0].id });
  } catch (error) {
    console.error("Error inserting donor:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { bloodGroup, city, availability } = req.query;
    const conditions = [];
    const values = [];

    if (bloodGroup) {
      conditions.push(`blood_group = $${values.length + 1}`);
      values.push(bloodGroup);
    }

    if (city) {
      conditions.push(`city = $${values.length + 1}`);
      values.push(city);
    }

    if (availability) {
      const isAvailable = availability === "Available";
      conditions.push(`available_for_emergency = $${values.length + 1}`);
      values.push(isAvailable);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
    const query = `SELECT * FROM donors ${whereClause} ORDER BY created_at DESC`;

    const result = await db.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching donors:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
