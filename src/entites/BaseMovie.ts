
export interface Genre {
    id: number;
    name: string;
}

export interface BaseMovie {
    adult: boolean;
    id: number;
    backdrop_path: string | null;
    genres: Genre[]; // tableau d’objets Genre
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string | null;
    release_date: Date; // ou string si récupéré en JSON
    runtime: string; // ex: "01:45"
    tagline: string;
    title: string;

}


export interface Film extends BaseMovie {}