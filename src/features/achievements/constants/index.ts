import { CalendarIcon, ClockIcon, CoffeeIcon, EyeIcon, MagicWandIcon, ResponsibleIcon } from "@/shared/ui/icons";
import { Achievement } from "../types";

export const achievementsList: Achievement[] = [
    {
        id: 0,
        title: "I'm new",
        description: "Complete 1 pomodoro round",
        icon: ClockIcon,
        max: 1
    },
    {
        id: 1,
        title: "Planner",
        description: "Add the first task",
        icon: MagicWandIcon,
        max: 1
    },
    {
        id: 2,
        title: "Productive",
        description: "Complete 15 pomodoros",
        icon: CalendarIcon,
        max: 15
    },
    {
        id: 3,
        title: "Responsible",
        description: "Complete 10 tasks within the deadline",
        icon: ResponsibleIcon,
        max: 10
    },
    {
        id: 4,
        title: "In focus",
        description: "Spend 5 hours working",
        icon: EyeIcon,
        max: 5
    },
    {
        id: 5,
        title: "Coffee time",
        description: "Spend 2 hours relaxing",
        icon: CoffeeIcon,
        max: 2
    },
]