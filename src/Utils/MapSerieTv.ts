
import {Person} from "../entites/Person";
import {SerieTv} from "../entites/SerieTv";

export function mapSeries(data: any): {
    results: SerieTv[];
    total_pages: number;
    total_results: number;
    page: number;
    person ?: Person;
} {
    const mappedResults: SerieTv[] = data.results.map((serie: any) => ({
        id: serie.id,
        poster_path: serie.poster_path,
        backdrop_path: serie.backdrop_path,
        original_language: serie.original_language,
        firstAirDate: serie.first_air_date,
        original_name: serie.original_name,
        first_air_date: serie.first_air_date,

        // Ajoute les champs nécessaires
    }));

    return {
        results: mappedResults,
        total_pages: data.total_pages,
        total_results: data.total_results,
        page: data.page,
        person : data.person,
    };
}

export function mapSerie(raw: any): SerieTv {
    return {
        adult:raw.adult,
        id: raw.id,
        backdrop_path: raw.backdrop_path,
        genres: raw.genres,
        original_language: raw.original_language,
        overview: raw.overview,
        poster_path: raw.poster_path,
        tagline: raw.tagline,
        first_air_date: raw.first_air_date,
        original_name: raw.original_name,
        production_companies: raw.production_companies,
        networks: raw.networks,
        created_by: raw.created_by,

    };
}