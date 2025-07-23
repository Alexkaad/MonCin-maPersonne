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
Object.defineProperty(exports, "__esModule", { value: true });
exports.popular = void 0;
const { getPopularFilms, upcomingMovies, NowPlaying, getCreditByMovie, getTrailerMovie, getRecommendationMovie } = require("../services/TmbdServices");
const Utils_1 = require("../Utils");
const TmbdServices_1 = require("../services/TmbdServices");
const getIndoor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Math.min(parseInt(req.query.page) || 1, 500);
    try {
        const films = yield NowPlaying(page);
        if (!films) {
            return res.status(404).json({ error: "Aucun film trouvé" });
        }
        res.status(200).json(films);
    }
    catch (error) {
        console.log("Erreur TMDB :", error.message);
        res.status(500).json({ error: 'Erreur lors de la récupération des films' });
    }
});
const popular = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Math.min(parseInt(req.query.page) || 1, 500);
    try {
        const rawData = yield getPopularFilms(page);
        const mappedData = (0, Utils_1.mapPopularFilms)(rawData);
        res.status(200).json(mappedData);
    }
    catch (error) {
        console.error("Erreur TMDB :", error.message);
        res.status(500).json({ error: "Erreur lors de la récupération des films" });
    }
});
exports.popular = popular;
const upcoming = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Math.min(parseInt(req.query.page) || 1, 500);
    try {
        const data = yield upcomingMovies(page); // data contient { results, total_pages, total_results, currentPage }
        res.status(200).json(data);
    }
    catch (error) {
        console.log("Erreur TMDB :", error.message);
        res.status(500).json({ error: 'Erreur lors de la récupération des films' });
    }
});
const getFilmById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    console.log('ID du film demandé ', id);
    try {
        const rawData = yield (0, TmbdServices_1.FilmById)(id); // Donnée brute TMDb
        const film = (0, Utils_1.mapFilm)(rawData); // Donnée typée
        console.log('Film récupéré:', film);
        res.json(film);
    }
    catch (error) {
        console.log('Erreur TMDB:', error.message);
        res.status(500).json({
            error: 'Erreur lors de la récupération des films'
        });
    }
});
const getCredit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const credits = yield getCreditByMovie(id);
        console.log('credits recuperé :', credits);
        res.json(credits);
    }
    catch (error) {
        console.error('Erreur TMDB:', error.message);
        res.status(500).json({ error: 'Erreur lors de la recuperation de credits' });
    }
});
const getTrailer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const trailers = yield getTrailerMovie(id);
        console.log('voici les videos :', trailers);
        res.json(trailers);
    }
    catch (error) {
        console.error('Erreur TMDB:', error.message);
        res.status(500).json({ error: 'Erreur lors de la recuperation des videos' });
    }
});
const getRecommandation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const recommandation = yield getRecommendationMovie(id);
        console.log('recommandation :', recommandation);
        res.json(recommandation);
    }
    catch (error) {
        console.error('Erreur TMDB:', error.message);
        res.status(500).json({ error: 'Erreur lors de la recuperation des recommandations' });
    }
});
module.exports = {
    upcoming,
    popular: exports.popular,
    getIndoor,
    getCredit,
    getTrailer,
    getRecommandation,
    getFilmById,
};
