"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config({ path: "./.env.local" });
const express_1 = __importDefault(require("express"));
const { Pool } = require("pg");
const cors = require("cors");
const server = (0, express_1.default)();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false,
});
server.use(express_1.default.json());
server.use(cors());
// OU avec une configuration plus spécifique
server.get("/", (req, res) => {
    res.send("Bienvenue dans l'API !");
});
server.get("/ping", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield pool.query("SELECT 'Connexion OK' AS message");
        res.send(result.rows[0].message);
    }
    catch (err) {
        console.error("Erreur PostgreSQL :", err);
        res.status(500).send("Erreur de connexion");
    }
}));
const filmsRoutes = require("./src/routes/FilmRoutes");
server.use("/api/films", filmsRoutes);
module.exports = server;
