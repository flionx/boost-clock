export interface Achievement {
    id: number,
    title: string,
    description: string,
    icon: React.FC<React.SVGProps<SVGSVGElement>>,
    max: number
}

export interface UserAchievement {
    id: Achievement['id'],
    step: number
}

export type AchievementState = Achievement & UserAchievement;