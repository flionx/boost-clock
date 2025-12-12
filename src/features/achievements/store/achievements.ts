"use client"
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import { AchievementState } from "../types";
import { achievementsList } from "../constants";

interface AchievementsStore {
    list: AchievementState[];
    newUnseenAchievs: number;
    addStepToAchiev: (title: AchievementState['title']) => void;
    changeUnseenAchievs: (type: "add" | "reset") => void;
}

export const useAchievementsStore = create<AchievementsStore>()(
    persist(
        (set, get) => ({
            list: achievementsList.map(achiev => ({
                ...achiev,
                step: 0
            })),
            newUnseenAchievs: 0,
            addStepToAchiev: (title) => {
                set((state) => ({
                    list: state.list.map(achiev => {
                        if (achiev.title === title && achiev.step < achiev.max) {
                            const newStep = achiev.step + 1;
                            if (newStep === achiev.max) {
                                state.changeUnseenAchievs("add");
                            }
                            return { 
                                ...achiev, 
                                step: newStep
                            };
                        }
                        return achiev;
                    })
                }));
            },
            changeUnseenAchievs: (type) => set((state) => ({
                newUnseenAchievs: type === "add" ? state.newUnseenAchievs + 1 : 0
            })),
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