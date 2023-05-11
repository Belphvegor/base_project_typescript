export const generateDateRange = async (from: any, to: any, format?: string) => {
    var now: any = from.clone(), dates: any = [];

    while (now.isSameOrBefore(to)) {
        dates.push(now.toISOString().replace(/T.*/gi, 'T00:00:00.000Z'));
        now.add(1, 'days');
    }
    return dates
}