require("dotenv").config({ path: "./.env.local"});

import express, { Request, Response } from "express";
const { Pool } = require("pg");
const cors = require("cors");
const server = express();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false,
});

server.use(express.json());
server.use(cors());

// OU avec une configuration plus spécifique


server.get("/", (req: Request, res: Response) => {
    res.send("Bienvenue dans l'API !");
});

server.get("/ping", async (req: Request, res : Response) => {
    try {
        const result = await pool.query("SELECT 'Connexion OK' AS message");
        res.send(result.rows[0].message);
    } catch (err) {
        console.error("Erreur PostgreSQL :", err);
        res.status(500).send("Erreur de connexion");
    }
});

const filmsRoutes = require("./src/routes/FilmRoutes");
server.use("/api/films", filmsRoutes);


module.exports = server;
