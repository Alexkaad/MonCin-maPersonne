"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapPopularFilms = mapPopularFilms;
exports.mapFilm = mapFilm;
function mapPopularFilms(data) {
    const mappedResults = data.results.map((film) => ({
        id: film.id,
        title: film.title,
        release_date: film.release_date,
        poster_path: film.poster_path,
        backdrop_path: film.backdrop_path,
        runtime: film.runtime,
        tagline: film.tagline,
        original_language: film.original_language,
        original_title: film.original_title,
        genres: film.genres,
        // Ajoute les champs nécessaires
    }));
    return {
        results: mappedResults,
        total_pages: data.total_pages,
        total_results: data.total_results,
        page: data.page,
    };
}
function mapFilm(raw) {
    return {
        adult: raw.adult,
        id: raw.id,
        backdrop_path: raw.backdrop_path,
        genres: raw.genres,
        original_language: raw.original_language,
        original_title: raw.original_title,
        overview: raw.overview,
        poster_path: raw.poster_path,
        release_date: raw.release_date,
        runtime: raw.runtime,
        tagline: raw.tagline,
        title: raw.title
    };
}
