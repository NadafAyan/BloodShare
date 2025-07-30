const express = require("express");
const router = express.Router();
const db = require("../db");

// === [POST] Register a Donor ===
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
      medicalConditions = null,
      agreeToTerms,
      availableForEmergency,
    } = req.body;

        console.log("Received body:", req.body); // DEBUG

    // Basic field validation
    if (
      !fullName || !email || !phone || !age || !bloodGroup || !city || !address ||
      !emergencyContact || agreeToTerms === undefined || availableForEmergency === undefined
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const insertQuery = `
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
      medicalConditions,
      agreeToTerms,
      availableForEmergency,
    ];

    const result = await db.query(insertQuery, values);

    res.status(201).json({
      message: "Donor registered successfully",
      donorId: result.rows[0].id,
    });

  } catch (err) {
    console.error("Error during donor registration:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// === [GET] Search Donors ===
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

    if (availability !== undefined) {
      const isAvailable = availability.toLowerCase() === "available";
      conditions.push(`available_for_emergency = $${values.length + 1}`);
      values.push(isAvailable);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
    const query = `SELECT * FROM donors ${whereClause} ORDER BY created_at DESC`;

    const result = await db.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching donor search results:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
