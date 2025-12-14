import { achievementsList } from '../constants';
import { UserAchievement } from '../types';

const combineUserProgress = (stateAchievs: UserAchievement[]) => {
  const newList = achievementsList.map(achiev => {
        const saved = stateAchievs.find(a => a.id === achiev.id);
        return {
            ...achiev,
            step: saved?.step ?? 0
        };
    });
    return newList
}

export default combineUserProgress