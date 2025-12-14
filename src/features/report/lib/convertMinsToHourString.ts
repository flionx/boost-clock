import { formatToHours } from "../../../shared/lib/formatToHours"

export const convertMinsToHourString = (mins: number) => {
    return formatToHours(mins) + "h";
}