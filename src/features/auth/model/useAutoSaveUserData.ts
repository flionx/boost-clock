"use client";
import { useEffect, useRef } from "react";
import { auth, db } from "@/shared/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useTasksStore } from "@/features/tasks/store/tasks";
import { useReportStore } from "@/features/report/store/report";
import { useAchievementsStore } from "@/features/achievements/store/achievements";
import { useTimerSettingsStore } from "@/features/timer/store/timer-settings";
import getUserData from "@/shared/lib/getUserData";

const AUTOSAVE_DELAY = 4000;

const useAutoSaveUserData = () => {
    const prevRef = useRef<string | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const unsubStoresRef = useRef<(() => void)[] | null>(null);
    // todo: change onAuthStateChanged to useAuthStore.user
    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
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
                            const dataRef = doc(db, "Users", user.uid);
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
        });

        return () => {
            unsubscribeAuth();
            unsubStoresRef.current?.forEach(unsub => unsub());
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);
};

export default useAutoSaveUserData;
