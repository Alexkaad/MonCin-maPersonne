import {CrewMember} from "../entites/CrewMember";
import {Credit} from "../entites/Credit";

export function filterTradeCrew(credit: Credit):CrewMember[] {

    const allowTrade: string[] =
        ['Art', 'Camera', 'Costume & Make-Up', 'Crew', 'Directing',
            'Editing', 'Lighting', 'Production','Sound','Visual Effects','Writing'];
    return credit.crew.filter(crewMember => allowTrade.includes(crewMember.department));
}

export function groupCrewByDepartment(crew: CrewMember[]): Record<string, CrewMember[]> {
    return crew.reduce((acc, member) => {
        const dept = member.department || "Other";
        if (!acc[dept]) acc[dept] = [];
        acc[dept].push(member);
        return acc;
    }, {} as Record<string, CrewMember[]>);
}