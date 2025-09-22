import {CrewMember} from "../entites/CrewMember";


export function filterCrewList(movieList : CrewMember[]) {

    return movieList.sort((a,b) => ( Number(a.release_date) - Number(b.release_date)) );
}