import {ResponsePage} from "../entites/ResponsePage";


const { getPopularFilms, upcomingMovies, NowPlaying, getCreditByMovie, getTrailerMovie, getRecommendationMovie} = require("../services/TmbdServices");

/*import {FilmById} from "../services/TmbdServices";*/
import {Request, Response} from "express";
import {mapFilm, mapPopularFilms} from "../Utils";
import {FilmById} from "../services/TmbdServices";
import {Film} from "../entites/BaseMovie";


const getIndoor = async (req: Request, res: Response) => {
    const page = Math.min(parseInt(req.query.page as string) || 1, 500);

    try {
        const films = await NowPlaying(page);
        if (!films) {
            return res.status(404).json({ error: "Aucun film trouvé" });
        }
        res.status(200).json(films);
    } catch (error: any) {
        console.log("Erreur TMDB :", error.message);
        res.status(500).json({ error: 'Erreur lors de la récupération des films' });
    }
};




export const popular = async (req: Request, res: Response): Promise<void> => {
    const page = Math.min(parseInt(req.query.page as string) || 1, 500);

    try {
        const rawData = await getPopularFilms(page);
        const mappedData: ResponsePage = mapPopularFilms(rawData);
        res.status(200).json(mappedData);
    } catch (error: any) {
        console.error("Erreur TMDB :", error.message);
        res.status(500).json({ error: "Erreur lors de la récupération des films" });
    }
};
const upcoming = async (req: Request, res: Response) => {
    const page = Math.min(parseInt(req.query.page as string) || 1, 500);

    try {
        const data = await upcomingMovies(page);  // data contient { results, total_pages, total_results, currentPage }
        res.status(200).json(data);
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

const getCredit = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);

    try {

        const credits = await getCreditByMovie(id);
        console.log('credits recuperé :', credits);
        res.json(credits);
    }catch (error:any) {

        console.error('Erreur TMDB:', error.message);
        res.status(500).json({error: 'Erreur lors de la recuperation de credits'});
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
    getCredit,
    getTrailer,
    getRecommandation,
    getFilmById,
};
