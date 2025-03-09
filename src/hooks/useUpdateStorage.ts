import { useEffect } from "react";

export default function useUpdateStorage(key: string, value: unknown) {
    useEffect(() => {
        const updateStorage = JSON.stringify(value);
        localStorage.setItem(key, updateStorage)
    }, [value])
}