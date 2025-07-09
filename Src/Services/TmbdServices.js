const axios = require("axios");
const Film = require("../Dtos/Films");
const {response} = require("express");


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

const upcomingMovies = async (page=1) => {

    const response = await axios.get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=${page}&language=fr-FR&region=fr`);

   /* console.log('Response data:', JSON.stringify(response.data, null, 2));*/
    // console.log('Premier film:', JSON.stringify(response.data.results[0], null, 2));
    // console.log('Response data:', JSON.stringify(response.data, null, 2));

    return {
        results : response.data.results,
        total_pages : response.data.total_pages,
        total_results : response.data.total_results,
        currentPage : response.data.page,
    }

}

const NowPlaying = async (page=1) => {

    const response = await axios.get(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}&language=fr-FR&region=fr`);
    return {

        results : response.data.results,
        total_pages : response.data.total_pages,
        total_results : response.data.total_results,
        currentPage : response.data.page,
    }

}

async function FilmById(id) {
    const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=fr-FR`;
    const response = await axios.get(url);
    return response.data;
}


async function getCreditByMovie(id) {

    const url = `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=fr-FR&region=fr-FR`;
    const response = await axios.get(url);
    return response.data;
}

module.exports = {
    getPopularFilms,

    FilmById,
   upcomingMovies,
    NowPlaying,
    getCreditByMovie,
};
