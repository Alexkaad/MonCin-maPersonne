import {CastMember} from "../entites/CastMember";

export function sortByDateCastAndCrew(castMember: CastMember [] )  {
    castMember.sort((a, b) => {
        // Si une des deux dates est absente → on les met après
        if (!a.release_date) return 1;
        if (!b.release_date) return -1;

        // Normaliser en timestamp (nombre)
        // @ts-ignore
        const dateA =
            a.release_date instanceof Date
                ? a.release_date.getTime()
                : new Date(a.release_date).getTime();

        // @ts-ignore
        const dateB =
            b.release_date instanceof Date
                ? b.release_date.getTime()
                : new Date(b.release_date).getTime();

        return dateB - dateA; // tri croissant
    });
}