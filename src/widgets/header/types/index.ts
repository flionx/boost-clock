import { MenuSection } from "@/shared/types/modal-menu";

export interface HeaderMenuButton {
    label: MenuSection;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
}