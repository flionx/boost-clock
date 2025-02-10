import { useEffect } from "react";

export default function useUpdateStorage(key, value) {
    useEffect(() => {
        const updateStorage = JSON.stringify(value);
        localStorage.setItem(key, updateStorage)
    }, [value])
}