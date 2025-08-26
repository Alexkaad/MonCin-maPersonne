import {Request, Response} from "express";
import {getPersonByExternalIds, getPersonSingle} from "../services/TmbdServices";
import {Person} from "../entites/Person";
import {mapePerson} from "../Utils/MapePerson";
import {ExternalIds} from "../entites/ExternalIds";
import {mapExternalIds} from "../Utils/MapExternalIds";


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

module.exports = {
    getPersonById,
    getExternalIds,
}