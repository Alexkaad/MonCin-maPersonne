const express = require("express");
const router = express.Router();
const { getPopularFilms } = require("../services/TmbdServices");

router.get("/popular", async (req, res) => {
    try {
        const films = await getPopularFilms();
        res.json(films);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des films" });
    }
});

module.exports = router;
