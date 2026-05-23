"use client";
import { useEffect, useRef } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/shared/lib/firebase";
import { useAuthStore } from "../store/auth";
import { useTasksStore } from "@/features/tasks/store/tasks";
import { useReportStore } from "@/features/report/store/report";
import { useAchievementsStore } from "@/features/achievements/store/achievements";
import { useTimerSettingsStore } from "@/features/timer/store/timer-settings";
import getUserData from "@/shared/lib/getUserData";

const AUTOSAVE_DELAY = 3000;

const useUserDataSync = () => {
  const user = useAuthStore(state => state.user);
  const isLoading = useAuthStore(state => state.isLoading);
  const isRemoteUpdate = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const saveToFirebase = async () => {
    if (isRemoteUpdate.current) return;
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    timeoutRef.current = setTimeout(async () => {
      try {
        const userData = getUserData();
        const dataRef = doc(db, "Users", user!);
        await setDoc(dataRef, userData, { merge: true });
        console.log("Auto-saved");
      } catch (e) {
        console.error("Save error:", e);
      }
    }, AUTOSAVE_DELAY);
  };

  useEffect(() => {
    if (!user || isLoading) return;

    const userRef = doc(db, "Users", user);
    const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
      if (docSnapshot.exists() && !isRemoteUpdate.current) {
        isRemoteUpdate.current = true;
        
        const data = docSnapshot.data();        
        if (data.tasks) useTasksStore.setState(data.tasks);
        if (data.report) useReportStore.setState(data.report);
        if (data.achievements) useAchievementsStore.setState(data.achievements);
        if (data.timerSettings) useTimerSettingsStore.setState(data.timerSettings);
        
        setTimeout(() => {
          isRemoteUpdate.current = false;
        }, 100);
      }
    });

    const unsubTasks = useTasksStore.subscribe(saveToFirebase);
    const unsubReport = useReportStore.subscribe(saveToFirebase);
    const unsubAchievements = useAchievementsStore.subscribe(saveToFirebase);
    const unsubTimerSettings = useTimerSettingsStore.subscribe(saveToFirebase);

    return () => {
      unsubscribe();
      unsubTasks();
      unsubReport();
      unsubAchievements();
      unsubTimerSettings();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [user, isLoading]);
};

export default useUserDataSync;