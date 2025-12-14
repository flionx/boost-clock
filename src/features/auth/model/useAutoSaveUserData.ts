"use client";
import { useEffect, useRef } from "react";
import { db } from "@/shared/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useTasksStore } from "@/features/tasks/store/tasks";
import { useReportStore } from "@/features/report/store/report";
import { useAchievementsStore } from "@/features/achievements/store/achievements";
import { useTimerSettingsStore } from "@/features/timer/store/timer-settings";
import { useAuthStore } from "../store/auth";
import getUserData from "@/shared/lib/getUserData";

const AUTOSAVE_DELAY = 4000;

const useAutoSaveUserData = () => {
    const prevRef = useRef<string | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const unsubStoresRef = useRef<(() => void)[] | null>(null);
    const user = useAuthStore(state => state.user);

    useEffect(() => {
        if (!user) {
            unsubStoresRef.current?.forEach(unsub => unsub());
            unsubStoresRef.current = null;
            prevRef.current = null;
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            return;
        }

        if (unsubStoresRef.current) return;


        const triggerSave = () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);

            timeoutRef.current = setTimeout(async () => {
                const userData = getUserData();
                const serialized = JSON.stringify(userData);

                if (serialized !== prevRef.current) {
                    prevRef.current = serialized;

                    try {                        
                        const dataRef = doc(db, "Users", user);
                        await setDoc(dataRef, userData, { merge: true });
                    } catch (e) {
                        console.error("Autosave error:", e);
                    }
                }
            }, AUTOSAVE_DELAY);
        };

        unsubStoresRef.current = [
            useTasksStore.subscribe(triggerSave),
            useReportStore.subscribe(triggerSave),
            useAchievementsStore.subscribe(triggerSave),
            useTimerSettingsStore.subscribe(triggerSave),
        ];

        return () => {
            unsubStoresRef.current?.forEach(unsub => unsub());
            unsubStoresRef.current = null;
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [user]);
};

export default useAutoSaveUserData;
