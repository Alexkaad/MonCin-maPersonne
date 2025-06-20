const BaseMovie = require("./BaseMovie");

class Films extends BaseMovie {


    constructor(movieData) {

        super(movieData);
        this.release_date = movieData.release_date;
        this.video = movieData.video ;

    }

}

module.exports = Films;