import {Film} from "./BaseMovie";
import {ResponsePage} from "./ResponsePage";

export  interface Person {

    adult : boolean,
    also_known_as? : string[],
    biography ? : string,
    birthday ?: string,
    deathday ?: string,
    gender : string,
    homepage : string,
    id : number,
    imdb_id ?: string,
    known_for_department : string,
    name : string,
    profile_path : string,
    place_of_birth? : string,
}

export interface PersonByKnownFor{

    person? : Person
    results : Film[]
    total_pages : number
    total_results : number
    page : number

}