 export interface BaseTrade {

    adult: boolean;
    gender: number;
    id:number;
    known_for_department: string;
    name:string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    credit_id: string;
    department: string;
    job: string
}

export interface Art extends BaseTrade {}
 export interface Camera extends BaseTrade {}
 export interface CostumeAndMakeUp extends BaseTrade {}
 export interface Montage extends BaseTrade {}
 export interface Sound extends BaseTrade {}
 export interface Write extends BaseTrade {}
 export interface Directing extends BaseTrade {}
 export interface TeamTech extends BaseTrade {}
 export interface Cascade extends BaseTrade {}