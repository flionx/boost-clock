import { useEffect, useRef } from "react";
import { useStore } from "react-redux";
import { db, auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import getFilteredState from "./getFilteredState";

const useAutoSave = () => {
    const store = useStore();
    const prevStateRef = useRef(null);
    const timeoutRef = useRef(null);

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
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(saveData, 4000);
        });

        return () => {
            clearTimeout(timeoutRef.current);
            unsubscribe();
        };
    }, []);
};

export default useAutoSave;
