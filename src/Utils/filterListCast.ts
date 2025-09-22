import {CastMember} from "../entites/CastMember";


/*export function formatDate(member : CastMember) : Date{

    return member.release_date?.
}*/

export function filterCastList(movieList: CastMember[]): CastMember[] {
    return movieList.sort((a, b) => {
        const da = b.release_date ?? "";
        const db = a.release_date ?? "";
        return da.localeCompare(db);
    });
}
