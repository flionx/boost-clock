"use client"
import { useEffect } from 'react';
import { useAchievementsStore } from '../store/achievements'
import AchievementCard from './AchievementCard'

const Achievements = () => {
    const achievements = useAchievementsStore(state => state.list);
    const newUnseenAchievs = useAchievementsStore(state => state.newUnseenAchievs);
    const changeUnseenAchievs = useAchievementsStore(state => state.changeUnseenAchievs);
    
    useEffect(() => {
      if (newUnseenAchievs > 0) {
        changeUnseenAchievs("reset")
      }
    }, [])

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