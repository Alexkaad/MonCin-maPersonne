import {Film} from "./BaseMovie";
import {Person} from "./Person";

export interface ResponsePage {
    results: Film[];
    total_pages: number;
    total_results: number;
    page: number;

}