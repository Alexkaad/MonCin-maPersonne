const axios = require("axios");
const Film = require("../models/Films");

const API_KEY = process.env.TMbd_api_key;
const BASE_URL = "https://api.themoviedb.org/3";

async function getPopularFilms() {
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=fr-FR`;
    const response = await axios.get(url);
    return response.data.results.map((filmData) => new Film(filmData));
}

module.exports = {
    getPopularFilms,
};
