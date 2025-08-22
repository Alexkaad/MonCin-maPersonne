import {ResponsePage} from "../entites/ResponsePage";


const { getPopularFilms, upcomingMovies, NowPlaying, getCreditByMovie, getTrailerMovie, getRecommendationMovie} = require("../services/TmbdServices");


import {Request, Response} from "express";
import {mapFilm, mapFilms} from "../Utils/MapeMovieList";
import {FilmById, getPersonSingle} from "../services/TmbdServices";
import {Film} from "../entites/BaseMovie";
import {filterTradeCrew, groupCrewByDepartment} from "../Utils/MapeCastAndCrew";


const getIndoor = async (req: Request, res: Response) => {
    const page = Math.min(parseInt(req.query.page as string) || 1, 500);

    try {
        const rawIndoor = await NowPlaying(page);
        const mappedData: ResponsePage = mapFilms(rawIndoor);
        if (!rawIndoor) {
            return res.status(404).json({ error: "Aucun film trouvé" });
        }
        res.status(200).json(mappedData);
    } catch (error: any) {
        console.log("Erreur TMDB :", error.message);
        res.status(500).json({ error: 'Erreur lors de la récupération des films' });
    }
};


export const popular = async (req: Request, res: Response): Promise<void> => {
    const page = Math.min(parseInt(req.query.page as string) || 1, 500);

    try {
        const rawPopular = await getPopularFilms(page);
        const mappedData: ResponsePage = mapFilms(rawPopular);
        res.status(200).json(mappedData);
    } catch (error: any) {
        console.error("Erreur TMDB :", error.message);
        res.status(500).json({ error: "Erreur lors de la récupération des films" });
    }
};
const upcoming = async (req: Request, res: Response) => {
    const page = Math.min(parseInt(req.query.page as string) || 1, 500);

    try {
        const rowUpcoming = await upcomingMovies(page);
        const mappedData : ResponsePage = mapFilms(rowUpcoming)// data contient { results, total_pages, total_results, currentPage }
        res.status(200).json(mappedData);
    } catch (error: any) {
        console.log("Erreur TMDB :", error.message);
        res.status(500).json({ error: 'Erreur lors de la récupération des films' });
    }
}


const getFilmById = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);
    console.log('ID du film demandé ',id);

    try {
        const rawData = await FilmById(id); // Donnée brute TMDb
        const film: Film = mapFilm(rawData); // Donnée typée
        console.log('Film récupéré:', film);
        res.json(film);
    } catch (error:any) {
        console.log('Erreur TMDB:', error.message);
        res.status(500).json({
            error: 'Erreur lors de la récupération des films'
        });
    }

}

const getCreditMovie = async (req: Request, res: Response) => {

    const id = req.params.id;

    try {
        // Récupération des crédits du film depuis un service externe
        const credits = await getCreditByMovie(id);

        // Étape 1 : filtrer les crew pertinents
        const filteredCrew = filterTradeCrew(credits);

        // Étape 2 : regrouper par département
        const groupedCrew = groupCrewByDepartment(filteredCrew);

        // Réponse JSON structurée
        res.json({
            cast: credits.cast, // ou tu peux aussi filtrer ou limiter ici
            crew: groupedCrew
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des crédits :", error);
        res.status(500).json({error: "Erreur interne serveur"});
    }
}

const getTrailer = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);

    try {

        const trailers = await getTrailerMovie(id);
        console.log('voici les videos :', trailers);
        res.json(trailers);
    }catch (error:any) {
        console.error('Erreur TMDB:', error.message);
        res.status(500).json({error: 'Erreur lors de la recuperation des videos'});
    }
}

const getRecommandation = async (req: Request, res: Response) => {

    const id = req.params.id;

    try {
        const recommandation = await getRecommendationMovie(id);
        console.log('recommandation :', recommandation);
        res.json(recommandation);
    }catch (error: any) {
        console.error('Erreur TMDB:', error.message);
        res.status(500).json({error: 'Erreur lors de la recuperation des recommandations'});
    }
}


module.exports = {


    upcoming,
    popular,
    getIndoor,
    getCredit: getCreditMovie,
    getTrailer,
    getRecommandation,
    getFilmById,

};
