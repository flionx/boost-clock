export const formatToHours = (mins: number) => {
    const hours = mins / 60;
    return hours.toFixed(1) + "h" 
}