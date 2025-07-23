import {Art,Camera,Sound, Cascade,CostumeAndMakeUp,Montage,Directing,Write,TeamTech} from "./BaseTrade";


 export interface Crew {
    arts: Art[] | null;
    cameras: Camera[] | null;
    sounds: Sound[] | null;
    costumes: CostumeAndMakeUp[] | null;
    montages: Montage[] | null;
    directings: Directing[] | null;
    writings: Write[] | null;
    teamTechs: TeamTech[] | null;
    cascades: Cascade[] | null;
}
