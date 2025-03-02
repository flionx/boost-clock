import { useEffect, useRef } from "react";
import { useStore } from "react-redux";
import { db, auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import useFilteredState from "./useFilteredState";

const useAutoSave = () => {
    const store = useStore();
    const prevStateRef = useRef(null);
    const timeoutRef = useRef(null);
    const getFilteredState = useFilteredState();

    const saveData = async () => {
        const user = auth.currentUser;
        if (!user) return;

        const filteredState = getFilteredState(store.getState());

        if (!prevStateRef.current || JSON.stringify(prevStateRef.current) !== JSON.stringify(filteredState)) {
            prevStateRef.current = filteredState;

            try {
                // const userRef = doc(db, "Users", user.uid);
                // await setDoc(userRef, filteredState, { merge: true });
                console.log("✅ Данные сохранены в Firestore:", filteredState);
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
