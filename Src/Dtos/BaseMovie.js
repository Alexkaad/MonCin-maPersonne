class BaseMovie {
    constructor(movieData) {
        this.id = movieData.id;
        this.title = movieData.title;
        this.genreIds = movieData.genres|| [];
        this.overview = movieData.overview;
        this.posterUrl = movieData.poster_path
            ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
            : null;
        this.backdrop_path = movieData.backdrop_path
        this.production_countries = movieData.production_countries || [];
        this.production_companies = movieData.production_companies || [];
        this.runtime = movieData.runtime ? `${Math.floor(movieData.runtime / 60)}h ${movieData.runtime % 60}min`.replace(' 0min', '')
            : null;



        this.rating = movieData.vote_average;

    }
}

module.exports = BaseMovie;
