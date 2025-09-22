import {BaseMovie} from "./BaseMovie";
import {ProdCompagny} from "./ProdCompagny";
import {CreatedBy} from "./CreatedBy";
import {Networks} from "./Netwoks";

export interface SerieTv  extends BaseMovie{

    production_companies : ProdCompagny [];
    created_by : CreatedBy[]
    networks: Networks[];
    original_name: string;
    first_air_date?: Date;
    name?: string;


}