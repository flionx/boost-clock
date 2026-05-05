export const ACHIEVEMENT_TITLES = {
  imNew: 'imNew',
  planner: 'planner', 
  productive: 'productive',
  responsible: 'responsible',
  inFocus: 'inFocus',
  coffeeTime: 'coffeeTime'
} as const;

export type AchievementTitle = keyof typeof ACHIEVEMENT_TITLES;

export interface Achievement {
  id: number,
  title: AchievementTitle,
  icon: React.FC<React.SVGProps<SVGSVGElement>>,
  max: number
}

export interface UserAchievement {
  id: Achievement['id'],
  step: number
}

export type AchievementState = Achievement & UserAchievement;