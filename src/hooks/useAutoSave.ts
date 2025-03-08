import { useEffect, useRef } from "react";
import { useAppStore } from "./useRedux";
import { db, auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import getFilteredState from "./getFilteredState";
import { IUploadData } from "../types/global";

const useAutoSave = () => {
    const store = useAppStore();
    const prevStateRef = useRef<IUploadData | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const saveData = async () => {
        const user = auth.currentUser;
        if (!user) return;

        const filteredState = getFilteredState(store.getState());

        if (!prevStateRef.current || JSON.stringify(prevStateRef.current) !== JSON.stringify(filteredState)) {
            prevStateRef.current = filteredState;

            try {
                const userRef = doc(db, "Users", user.uid);
                await setDoc(userRef, filteredState, { merge: true });
            } catch (error) {
                console.error("❌ Ошибка сохранения:", error);
            }
        }
    };

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(saveData, 4000);
        });

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            unsubscribe();
        };
    }, []);
};

export default useAutoSave;
