import {Film} from "./BaseMovie";

export interface ResponsePage {
    results: Film[];
    total_pages: number;
    total_results: number;
    page: number;
}