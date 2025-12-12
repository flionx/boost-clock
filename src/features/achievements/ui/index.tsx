"use client"
import { useAchievementsStore } from '../store/achievements'
import AchievementCard from './AchievementCard'

const Achievements = () => {
    const achievements = useAchievementsStore(state => state.list);

  return (
    <div className="grid grid-cols-2 w-full gap-3 mt-9 mb-4">
        {achievements.map(achiev => (
            <AchievementCard 
                title={achiev.title}
                description={achiev.description}
                step={achiev.step}
                max={achiev.max}
                icon={achiev.icon}
                key={achiev.title}
            />
        ))}
    </div>
  )
}

export default Achievements