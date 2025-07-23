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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upcomingMovies = upcomingMovies;
exports.NowPlaying = NowPlaying;
exports.FilmById = FilmById;
const axios_1 = __importDefault(require("axios"));
const API_KEY = process.env.TMbd_api_key;
const BASE_URL = "https://api.themoviedb.org/3";
const getPopularFilms = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = 1) {
    const response = yield axios_1.default.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}&region=fr&language=fr-FR`);
    return {
        results: response.data.results,
        total_pages: response.data.total_pages,
        total_results: response.data.total_results,
        currentPage: response.data.page,
    };
});
//* cette methode renvoie une liste des films à venir
function upcomingMovies() {
    return __awaiter(this, arguments, void 0, function* (page = 1) {
        try {
            const url = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=fr-FR&page=${page}&region=fr`;
            const response = yield axios_1.default.get(url);
            console.log(response.data);
            return {
                results: response.data.results,
                total_pages: response.data.total_pages,
                total_results: response.data.total_results,
                page: response.data.page,
            };
        }
        catch (error) {
            console.error("Erreur lors de la récupération des films :", error);
            return {
                results: [],
                total_pages: 0,
                total_results: 0,
                page: 0,
            };
        }
    });
}
function NowPlaying() {
    return __awaiter(this, arguments, void 0, function* (page = 1) {
        const url = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=fr-FR&page=
    ${page}&region=fr`;
        try {
            const response = yield axios_1.default.get(url);
            // Tu es convaincu que les données sont conformes à Film[]
            return {
                results: response.data.results,
                total_pages: response.data.total_pages,
                total_results: response.data.total_results,
                page: response.data.page,
            };
        }
        catch (error) {
            console.error("Erreur lors de la récupération des films :", error);
            return {
                results: [],
                total_pages: 0,
                total_results: 0,
                page: 0,
            };
        }
    });
}
function FilmById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=fr-FR`;
        try {
            const response = yield axios_1.default.get(url);
            if (!response || !response.data) {
                throw new Error('Réponse invalide du serveur');
            }
            return response.data;
        }
        catch (error) {
            // Log plus détaillé de l'erreur
            if (error.response) {
                console.error('Erreur de réponse:', {
                    status: error.response.status,
                    data: error.response.data,
                    headers: error.response.headers
                });
            }
            else if (error.request) {
                console.error('Erreur de requête:', error.request);
            }
            else {
                console.error('Erreur:', error.message);
            }
            throw error;
        }
    });
}
function getCreditByMovie(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=fr-FR&region=fr-FR`;
        const response = yield axios_1.default.get(url);
        return response.data;
    });
}
function getTrailerMovie(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=fr-FR`;
        const response = yield axios_1.default.get(url);
        return response.data;
    });
}
function getRecommendationMovie(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}&language=fr-FR`;
        const response = yield axios_1.default.get(url);
        return response.data;
    });
}
module.exports = {
    getPopularFilms,
    FilmById,
    upcomingMovies,
    NowPlaying,
    getCreditByMovie,
    getTrailerMovie,
    getRecommendationMovie,
};
