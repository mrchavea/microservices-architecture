export function calculateInMiliseconds(duration: string) {
    const units: {[key: string]: number} = {
        'ms': 1,
        's': 1000,
        'm': 60000,
        'h': 3600000,
        'd': 86400000
    };

    const time = parseInt(duration);
    const unit = duration[duration.length - 1].toLowerCase();

    return time * units[unit];
}