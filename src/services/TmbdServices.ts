import {Film} from "../entites/BaseMovie";

import axios, {AxiosInstance} from "axios";

import {ResponsePage} from "../entites/ResponsePage";




const API_KEY = process.env.TMbd_api_key;
const BASE_URL = "https://api.themoviedb.org/3";


const getPopularFilms = async (page=1) => {
    const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}&region=fr&language=fr-FR`);
    return {

        results : response.data.results,
        total_pages : response.data.total_pages,
        total_results : response.data.total_results,
        currentPage : response.data.page,
    }
}

//* cette methode renvoie une liste des films à venir

export async function upcomingMovies(page = 1): Promise<ResponsePage> {

   try {

       const url = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=fr-FR&page=${page}&region=fr`;
       const response = await axios.get(url);

       console.log(response.data);

       return {
           results: response.data.results as Film [],
           total_pages: response.data.total_pages,
           total_results: response.data.total_results,
           page: response.data.page,
       };
   }catch (error) {

       console.error("Erreur lors de la récupération des films :", error)
       return {
            results: [],
            total_pages: 0,
            total_results: 0,
            page: 0,
        };
   }
}

export async function NowPlaying(page = 1): Promise<ResponsePage> {
    const url = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=fr-FR&page=
    ${page}&region=fr`;
    try {
        const response = await axios.get(url);

        // Tu es convaincu que les données sont conformes à Film[]
        return {
            results: response.data.results as Film[],
            total_pages: response.data.total_pages,
            total_results: response.data.total_results,
            page: response.data.page,
        };
    } catch (error) {
        console.error("Erreur lors de la récupération des films :", error);
        return {
            results: [],
            total_pages: 0,
            total_results: 0,
            page: 0,
        };
    }
}

export async function FilmById(id: number) {

    const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=fr-FR`;
    try {

        const response = await axios.get(url);

        if (!response || !response.data) {
            throw new Error('Réponse invalide du serveur');
        }

        return response.data;
    } catch (error: any) {
        // Log plus détaillé de l'erreur
        if (error.response) {
            console.error('Erreur de réponse:', {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers
            });
        } else if (error.request) {
            console.error('Erreur de requête:', error.request);
        } else {
            console.error('Erreur:', error.message);
        }
        throw error;
    }
}

async function getCreditByMovie(id:number) {

    const url = `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=fr-FR&region=fr-FR`;
    const response = await axios.get(url);
    return response.data;
}

async function getTrailerMovie(id:number) {

    const url = `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=fr-FR`;
    const response = await axios.get(url);
    return response.data;
}

async function getRecommendationMovie(id:number){
    const url = `${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}&language=fr-FR`;
    const response = await axios.get(url);
    return response.data;
}


export async function getPersonSingle(id:number) {

    try {

        const url = `${BASE_URL}/person/${id}?api_key=${API_KEY}&language=fr-FR&region=fr-FR`;
        const response = await axios.get(url);
        return response.data;
    }catch (error) {

        throw error;
    }
}

module.exports = {
    getPopularFilms,
    FilmById,
    upcomingMovies,
    NowPlaying,
    getCreditByMovie,
    getTrailerMovie,
    getRecommendationMovie,
    getPersonSingle
};
