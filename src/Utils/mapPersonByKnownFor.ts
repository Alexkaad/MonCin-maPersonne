import {Person, PersonByKnownFor} from "../entites/Person";
import {Film} from "../entites/BaseMovie";


export function mapPersonToKnownFor(apiResponse: any): PersonByKnownFor {
    if (!apiResponse) {
        return {
            results: [],
            total_pages: 0,
            total_results: 0,
            page: 0,
        };
    }

    const person: Person = {
        adult : apiResponse.person?.adult,
        id: apiResponse.person?.id,
        gender: apiResponse.person?.gender,
        name: apiResponse.person?.name,
        known_for_department: apiResponse.person?.known_for_department,
        profile_path: apiResponse.person?.profile_path,
        homepage: apiResponse.person?.homepage,
        // Ajoute d’autres propriétés de Person si nécessaire
    };

    const results: Film[] = (apiResponse.person?.known_for || []).map((item: any) => ({
        id: item.id,
        title: item.title || item.name,
        backdrop_path: item.backdrop_path,
        poster_path: item.poster_path,
        overview: item.overview,
        release_date: item.release_date || item.first_air_date,
        // Ajoute d’autres propriétés de Film si nécessaire
    }));

    return {
        person,
        results,
        total_pages: apiResponse.total_pages || 1,
        total_results: apiResponse.total_results || results.length,
        page: apiResponse.page || 1,
    };
}
