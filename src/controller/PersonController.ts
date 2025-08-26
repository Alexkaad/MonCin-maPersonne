import {Request, Response} from "express";
import {getPersonSingle} from "../services/TmbdServices";
import {Person} from "../entites/Person";
import {mapePerson} from "../Utils/MapePerson";
import {translate} from "@vitalets/google-translate-api";
import {traduireTexte} from "../Utils/Translate";


export const getPersonById = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);


    try {

        const rawData = await getPersonSingle(id);
        const person : Person = await mapePerson(rawData,traduireTexte);

        console.log( 'voici le resultat person demandé :',person);
        res.json(person);
        // Traduction en arrière-plan
        if (person.biography) {
            traduireTexte(person.biography)
                .then(translatedText => {
                    // Ici tu peux stocker la traduction dans la DB ou un cache
                    console.log('Biographie traduite:', translatedText);
                })
                .catch(err => console.error('Erreur traduction:', err));
        }
    }catch (error: any) {
        console.error('Erreur TMBD:', error.message);
        res.status(500).json({error :'Erreur lors de la récuperation de la personne'});
    }
}

module.exports = {
    getPersonById
}