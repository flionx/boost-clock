"use client"
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import { AchievementState } from "../types";
import { achievementsList } from "../constants";

interface AchievementsStore {
    list: AchievementState[],
    newUnseenAchievs: number,
    changeUnseenAchievs: (type: "add" | "reset") => void,
    syncData: (data: {
        pomodoroRounds: number,
        tasksCount: number,
        tasksOnTime: number,
        totalWorkTime: number,
        totalBreakTime: number,
    }) => void,
}

export const useAchievementsStore = create<AchievementsStore>()(
    persist(
        (set, get) => ({
            list: achievementsList.map(achiev => ({
                ...achiev,
                step: 0
            })),
            newUnseenAchievs: 0,
            changeUnseenAchievs: (type) => set((state) => ({
                newUnseenAchievs: type === "add" ? state.newUnseenAchievs + 1 : 0
            })),
            syncData: (data) => {
                const { list } = get();
                console.log(data);
                
                const newList = list.map(achiev => {
                    let externalValue = 0;
                    
                    switch(achiev.id) {
                        case 0: // I'm new
                            externalValue = data.pomodoroRounds;
                            break;
                        case 1: // Planner
                            externalValue = data.tasksCount;
                            break;
                        case 2: // Productive
                            externalValue = data.pomodoroRounds;
                            break;
                        case 3: // Responsible
                            externalValue = data.tasksOnTime;
                            break;
                        case 4: // In focus
                            externalValue = data.totalWorkTime;
                            
                            break;
                        case 5: // Coffee time
                            externalValue = data.totalBreakTime;
                            break;
                    }
                    
                    const newStep = Math.min(externalValue, achiev.max);
                    if (newStep < achiev.step) return achiev;

                    if (newStep === achiev.max && achiev.step < achiev.max) {
                        get().changeUnseenAchievs("add");
                    }
                    return { ...achiev, step: newStep };
                });
                
                set({ list: newList });
            }
        }),
        {
            name: "achievements-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                list: state.list.map(({ id, step }) => ({ id, step })),
                newUnseenAchievs: state.newUnseenAchievs
            }),
            onRehydrateStorage: () => (state) => {
                if (state?.list) {
                    const newList = achievementsList.map(achiev => {
                        const saved = state.list.find(a => a.id === achiev.id);
                        return {
                            ...achiev,
                            step: saved?.step ?? 0
                        };
                    });
                    state.list = newList;
                    state.newUnseenAchievs = state.newUnseenAchievs;
                }
            }
        }
    )
);