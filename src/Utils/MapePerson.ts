import {Person} from "../entites/Person";

export async function  mapePerson(raw : any , traduireTexte?: (text:string)=>Promise<string>):Promise<Person> {

    const person : Person = {

        adult : raw.adult,
        gender: getGender(raw.gender),
        name: raw.name,
        also_known_as : raw.also_known_as,
        deathday:raw.deathday,
        birthday:raw.birthday,
        biography: raw.biography,
        homepage: raw.homepage,
        id: raw.id,
        imdb_id: raw.imdb_id,
        known_for_department : raw.known_for_department,
        place_of_birth : raw.place_of_birth,
        profile_path : raw.profile_path,

    }

    if (traduireTexte && person.biography) {
        person.biography = await traduireTexte(person.biography);
    }

  return person;

}

const getGender = (gender: number): string => {
    return gender === 1 ? 'Femme' : 'Homme';
};