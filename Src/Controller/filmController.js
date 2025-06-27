const express = require("express");

const router = express.Router();

const { getPopularFilms, upcomingMovies, NowPlaying} = require("../Services/TmbdServices");

const {FilmById } = require("../Services/TmbdServices");



const getIndoor = async (req,res) => {

    const page = Math.min(parseInt(req.query.page)|| 1,500) ;

    try {

        const films = await NowPlaying(page);
        res.status(200).json(films);
    }catch (error) {
        console.log("Erreur TMDB :", error.message);
        res.status(500).json({error: 'Erreur lors de la recuperation des films'})
    }
}



const popular = async (req, res) => {

    const page = Math.min(parseInt(req.query.page)|| 1,500) ;
    try {

        const films = await getPopularFilms(page);
        res.status(200).json(films);
    }catch (error) {
        console.log("Erreur TMDB :", error.message);
        res.status(500).json({error: 'Erreur lors de la recuperation des films'})
    }
}

const upcoming = async (req, res)=>{

    const page = Math.min(parseInt(req.query.page)|| 1,500) ;
    try {

        const films = await upcomingMovies(page);
        res.status(200).json(films);

    }catch (error) {

        console.log("Erreur TMDB :", error.message);
        res.status(500).json({error: 'Erreur lors de la recuperation des films'})
    }

}


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

    getFilmById,
    upcoming,
    popular,
    getIndoor,
};
