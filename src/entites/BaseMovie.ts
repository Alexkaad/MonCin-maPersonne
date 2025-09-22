
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
    overview: string;
    poster_path: string | null;
    tagline: string;
}


export interface Film extends BaseMovie {

    original_title: string;
    release_date: Date;
    runtime: string;
    title: string;
}