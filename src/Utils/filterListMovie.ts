import {CastAndCrew} from "../entites/CastAndCrew";
import {CastMember} from "../entites/CastMember";



export function filterListMovie(movieList : CastMember[] ):CastMember[] {

    return  movieList.sort((a,b) => ( b.popularity - a.popularity) );

}