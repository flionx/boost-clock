import { formatToHours } from "@/shared/lib/formatToHours"

export const convertMinsToHourString = (mins: number, unit: string) => {
  return formatToHours(mins) + unit;
}