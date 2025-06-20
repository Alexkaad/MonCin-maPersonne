const express = require("express");

const router = express.Router();

const Films = require("../Dtos/Films");
const { getPopularFilms } = require("../Services/TmbdServices");

const {FilmById } = require("../Services/TmbdServices");


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


const getFilmById = async (req, res) => {

    const id = req.params.id;
    console.log('ID du film demandé ',id);

    try {
        const films = await FilmById(id);
        console.log('Film récupéré:', films);
        res.json(films);
    } catch (error) {
        console.log('Erreur TMDB:', error.message);
        res.status(500).json({
            error: 'Erreur lors de la récupération des films'
        });
    }

}


module.exports = {

    getMovieById: getFilmById,
};
