import {CastMember} from "../entites/CastMember";



export function filterCastList(movieList : CastMember[]):CastMember[] {

    return  movieList
        .sort((a,b) => ( b.popularity - a.popularity) )
        .sort((a,b) => ( Number(a.release_date) - Number(b.release_date)));

}

