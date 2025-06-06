class Film {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.overview = data.overview;
        this.posterUrl = data.poster_path
            ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
            : null;
        this.releaseDate = data.release_date;
        this.rating = data.vote_average;
        this.genreIds = data.genre_ids || [];
    }
}

module.exports = Film;
