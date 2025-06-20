const express = require("express");

const router = express.Router();

const { getPopularFilms } = require("../Services/TmbdServices");

const {getFilmById } = require("../Services/TmbdServices");



router.get("/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {

        const film = await getFilmById(id);
        console.log(film);
        res.json(film);
    }catch (error) {
        console.log('Erreur TMBD :', error.message);
        res.status(500).json({error: 'Erreur lors de la récuperation des films'})
    }
});

router.get("/popular", async (req, res) => {
    const page = Math.min(parseInt(req.query.page)|| 1,500) ;


    try {
        const films = await getPopularFilms(page);
        console.log(films);
        res.json(films);
    } catch (error) {
        console.error("Erreur TMDB :", error.message);
        res.status(500).json({ error: "Erreur lors de la récupération des films" });
    }
});






module.exports = router;
