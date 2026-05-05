import { ReportIcon, SettingsIcon, TrophyIcon } from "@/shared/ui/icons";
import { HeaderMenuButton } from "../types";

export const HEADER_MENU_BUTTONS: HeaderMenuButton[] = [
  {
    label: "report",
    icon: ReportIcon,
  },
  {
    label: "achievements",
    icon: TrophyIcon,
  },
  {
    label: "settings",
    icon: SettingsIcon,
  }
] 