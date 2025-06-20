const BaseMovie = require('./BaseMovie');

class Series extends BaseMovie {

    constructor(movieData) {
        super(movieData);

        this.origin_country = movieData.origin_country;
        this.name = movieData.name;
        this.original_name = movieData.original_name;
        this.first_air_date = movieData.first_air_date;
    }
}

module.exports = Series;