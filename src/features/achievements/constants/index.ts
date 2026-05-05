import { CalendarIcon, ClockIcon, CoffeeIcon, EyeIcon, MagicWandIcon, ResponsibleIcon } from "@/shared/ui/icons";
import { Achievement } from "../types";

export const achievementsList: Achievement[] = [
  {
    id: 0,
    title: "imNew",
    icon: ClockIcon,
    max: 1
  },
  {
    id: 1,
    title: "planner",
    icon: MagicWandIcon,
    max: 1
  },
  {
    id: 2,
    title: "productive",
    icon: CalendarIcon,
    max: 15
  },
  {
    id: 3,
    title: "responsible",
    icon: ResponsibleIcon,
    max: 10
  },
  {
    id: 4,
    title: "inFocus",
    icon: EyeIcon,
    max: 5
  },
  {
    id: 5,
    title: "coffeeTime",
    icon: CoffeeIcon,
    max: 2
  },
]