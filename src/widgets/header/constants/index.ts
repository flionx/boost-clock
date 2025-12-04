import { ReportIcon, SettingsIcon, TrophyIcon } from "@/shared/ui/icons";
import { HeaderMenuButton } from "../types";

export const HEADER_MENU_BUTTONS: HeaderMenuButton[] = [
    {
        label: "Report",
        icon: ReportIcon,
    },
    {
        label: "Achievements",
        icon: TrophyIcon,
    },
    {
        label: "Settings",
        icon: SettingsIcon,
    }
] 