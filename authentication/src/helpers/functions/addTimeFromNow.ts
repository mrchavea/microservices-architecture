import { CustomError } from "../../domain";

export function addTimeFromNow(time: string) {

    const unities:{[key:string]:number} = {
        'ms': 1,
        's': 1000,
        'm': 60000,
        'h': 3600000,
        'd': 86400000
    };

    const quantity = parseInt(time);
    const unity = time.match(/ms|[smhd]/i)![0]

    if (!unities.hasOwnProperty(unity)) {
        throw CustomError.internalServer('Error creating expiry time');
    }

    let date = new Date();
    date.setTime(date.getTime() + quantity * unities[unity]);

    return date;
}