require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");

const app = express();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false,
});

app.use(express.json());


app.get("/", (req, res) => {
    res.send("Bienvenue dans l'API !");
});

app.get("/ping", async (req, res) => {
    try {
        const result = await pool.query("SELECT 'Connexion OK' AS message");
        res.send(result.rows[0].message);
    } catch (err) {
        console.error("Erreur PostgreSQL :", err);
        res.status(500).send("Erreur de connexion");
    }
});

const filmsRoutes = require("./routes/films");
app.use("/films", filmsRoutes);


module.exports = app;
