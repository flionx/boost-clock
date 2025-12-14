"use client"
import { create } from "zustand"
import { MenuSection } from "../types/modal-menu"

interface ModalMenuState {
    show: boolean,
    section: MenuSection | '',
    onReset: VoidFunction | null,
    setModal: (section: MenuSection | '', onReset: VoidFunction | null) => void,
    closeModal: VoidFunction,
}

export const useModalMenuStore = create<ModalMenuState>(set => ({
    show: false,
    section: '',
    onReset: null,
    setModal: (section, onReset) => set({ 
        show: true, 
        section, 
        onReset
    }),
    closeModal: () => set({
        show: false,
        section: '',
        onReset: null,
    }),
}))