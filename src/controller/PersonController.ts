import {Request, Response} from "express";
import {
    getKnownFor,
    getPersonByCombinedCredits,
    getPersonByExternalIds,
    getPersonSingle
} from "../services/TmbdServices";
import {Person, PersonByKnownFor} from "../entites/Person";
import {mapePerson} from "../Utils/MapePerson";
import {ExternalIds} from "../entites/ExternalIds";
import {mapExternalIds} from "../Utils/MapExternalIds";

import {mapPersonToKnownFor} from "../Utils/mapPersonByKnownFor";
import {CastAndCrew} from "../entites/CastAndCrew";
import {CrewMember} from "../entites/CrewMember";
import {CastMember} from "../entites/CastMember";
import {filterListMovie} from "../Utils/filterListMovie";



export const getPersonById =
    async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);

    try {

        const rawData = await getPersonSingle(id);
        const person : Person = mapePerson(rawData);
        console.log( 'voici le resultat person demandé :',person);
        res.json(person);
    }catch (error: any) {
        console.error('Erreur TMBD:', error.message);
        res.status(500).json({error :'Erreur lors de la récuperation de la personne'});
    }
}


export const getExternalIds =
    async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);

    try {

     const  rawData = await getPersonByExternalIds(id);
        const externalIds : ExternalIds   = mapExternalIds(rawData);
        console.log( 'voici le resultat person demandé :',externalIds);
        res.json(externalIds);

    }catch (error: any) {

        console.error('Erreur TMBD:', error.message);
        res.status(500).json({error: 'Erreur lors de la récuperation des externalIds'})
    }

    }

    export  const  getPersonByMovie =
        async (req: Request, res: Response) => {

        const name = req.query.name as string;
        const page = Math.min(parseInt(req.query.page as string) || 1, 500);

        if(!name) return res.status(400).json(
            {error: 'name invalide'}
        )

        try {
            const response = await getPersonByCombinedCredits(name,page);
            const CombinedCredits = mapPersonToKnownFor(response);
            console.log('voici les films de la personne :',CombinedCredits);
            res.status(200).json(CombinedCredits);
        }catch (error: any) {

            console.error('Erreur TMBD LORS DE LA RECUPERATION DES PERSON COMBINAISONS FILM',
                error.message);
            res.status(500);
        }
    }

    export const getListMoviePerson =
        async (req: Request, res: Response):Promise < CastAndCrew | undefined > => {

    const id = parseInt(req.params.id);

    if(!id)
    {

        console.error('id invalide');
      return;

    }

    try {

        const response = await getKnownFor(id);
        const  cast : CastMember [] = filterListMovie(response.cast).slice(0,8);
        const crew: CrewMember [] = response.crew;
        const castAndCrew : CastAndCrew = {
            cast,
            crew
        }

        console.log('voici les films de la personne :',castAndCrew);
        res.status(200).json(castAndCrew);
        return castAndCrew;


    }catch (error: any) {

        console.error('Erreur lors de la recuperation des informations Cast&Crew:', error.message);

        throw error;
    }
    }




module.exports = {
    getPersonById,
    getExternalIds,
    getPersonByMovie,
    getListMoviePerson,

}