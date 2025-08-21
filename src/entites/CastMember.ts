export interface CastMember {

    adult: boolean,
    gender: number,
    id: number,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string | null,
    cast_id: number,
    character: string,
    credit_id:string,
    order: number
}

export interface MapCastMember {

    id: number,
    character: string,
    profile_path: string | null,
    order: number,
    name: string,
}