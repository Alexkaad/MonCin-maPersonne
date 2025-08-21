import {Request, Response} from "express";
import {getPersonSingle} from "../services/TmbdServices";
import {Person} from "../entites/Person";
import {mapePerson} from "../Utils/MapePerson";


export const getPersonById = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);

    try {

        const rawData = await getPersonSingle(id);
        const person : Person = mapePerson(rawData);
        res.json(person);
    }catch (error: any) {
        console.error('Erreur TMBD:', error.message);
        res.status(500).json({error :'Erreur lors de la récuperation de la personne'});
    }
}

module.exports = {
    getPersonById
}