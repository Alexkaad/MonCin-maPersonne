import {Request,Response} from "express";
import {
    getProvidersByTv,


    getTvSerieOnAirToday,
    TvById
} from "../services/TmbdServices";
import {ResponsePage} from "../entites/ResponsePage";

import {SerieTv} from "../entites/SerieTv";

import {mapSerie, mapSeries} from "../Utils/MapSerieTv";
import {ProviderTv} from "../entites/ProviderTv";
import {filterFrProviders} from "../Utils/filterProvider";


export const getOnAirToday = async(req : Request,res:Response)=>{

    const page  = Math.min(parseInt(req.query.page as string) || 1,500);

    try{

        const results = await getTvSerieOnAirToday(page);

        const mappedData = mapSeries(results);
        res.status(200).json(mappedData);
        console.log('results avant mapping :',mappedData);
    }catch (error : any){
        console.log("Erreur TMDB :", error.message);
        res.status(500).json({error:'Erreur lors de la recuperation de la' +
                ' liste des series onAirToday'});
    }
}

export const getSerieById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (!id) {
        res.status(400).json({error: 'id invalide'});
    }

    try {
        const results = await TvById(id);

        const serie: SerieTv = mapSerie(results);


        res.status(200).json(serie);
        console.log('results aprés mapping :', serie);

    } catch (error: any) {

        console.log("Erreur TMDB :", error.message);
        res.status(500).json({
            error: 'Erreur lors de la recuperation de la' +
                ' liste des series onAirToday'
        });
    }
}
export const getProviderTv = async (req: Request, res: Response) => {

const tvId = parseInt(req.params.id);

if(!tvId)
{
    res.status(400).json({error: 'id invalide'});
}
try {
    const response = await getProvidersByTv(tvId);
    const provider : ProviderTv = filterFrProviders(response);
    res.status(200).json(provider);

}catch (error: any) {

    console.log("Erreur TMDB :", error.message);
    res.status(500).json({error: 'Erreur lors de la recuperation des fournisseurs'});
}
}

