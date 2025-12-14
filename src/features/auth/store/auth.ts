import { create } from "zustand";

interface AuthState {
    user: string | null, 
    isLoading: boolean,
    setUser: (user: string | null) => void,
    setLoading: (isLodaing: boolean) => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    isLoading: false,
    setUser: (user) => set({user}),
    setLoading: (isLoading) => set({isLoading})
}))