const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// MIDDLEWARE (apply **once**)
app.use(cors());
app.use(express.json()); // parses JSON bodies
app.use(express.urlencoded({ extended: true })); // parses form data

// ROUTES
const donorRoutes = require("./routes/donors");
app.use("/api/donors", donorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
