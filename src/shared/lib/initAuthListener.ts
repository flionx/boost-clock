"use client"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/shared/lib/firebase"
import { useAuthStore } from "@/features/auth/store/auth"

export function initAuthListener() {
    const { setUser, setLoading } = useAuthStore.getState()

    onAuthStateChanged(auth, (user) => {
        if (user) {        
            setUser(user.uid)
        } else {
            setUser(null)
        }

        setLoading(false)
    })
}
