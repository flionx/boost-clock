"use client"
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import { AchievementState } from "../types";
import { achievementsList } from "../constants";
import { UserData } from "@/shared/types/user-data";
import combineUserProgress from "../lib/combineUserProgress";

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
    resetStore: VoidFunction,
    uploadUserData: (data: UserData['achievements']) => void
}

const initState = (): Pick<AchievementsStore, "list" | "newUnseenAchievs"> => ({
    list: achievementsList.map(achiev => ({
        ...achiev,
        step: 0
    })),
    newUnseenAchievs: 0,
})

export const useAchievementsStore = create<AchievementsStore>()(
    persist(
        (set, get) => ({
            ...initState(),
            changeUnseenAchievs: (type) => set((state) => ({
                newUnseenAchievs: type === "add" ? state.newUnseenAchievs + 1 : 0
            })),
            syncData: (data) => {
                const { list } = get();
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
            },
            resetStore: () => set(initState()),
            uploadUserData: (data) => set({
                list: combineUserProgress(data.achievements || []),
                newUnseenAchievs: data.newUnseenAchievs || 0
            })
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
                    state.list = combineUserProgress(state.list);
                    state.newUnseenAchievs = state.newUnseenAchievs;
                }
            }
        }
    )
);