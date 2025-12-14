"use client"
import { create } from "zustand"

interface ModalState {
    show: boolean,
    title: string,
    label: string,
    submitLabel: string,
    setModal: (title: string, label: string, submitLabel: string, callbackSubmit: VoidFunction) => void,
    closeModal: VoidFunction,
    submitModal: VoidFunction,
    callbackSubmit: VoidFunction | null,
}

export const useModalStore = create<ModalState>((set, get) => ({
    show: false,
    title: '',
    label: '',
    submitLabel: '',
    setModal: (title, label, submitLabel, callbackSubmit) => set({ 
        show: true, 
        title,
        label, 
        submitLabel, 
        callbackSubmit 
    }),
    closeModal: () => set({
        show: false,
        title: '',
        label: '',
        submitLabel: '',
        callbackSubmit: null
    }),
    submitModal: () => {
        const callback = get().callbackSubmit;
        if (callback) callback();
        get().closeModal();
    },
    callbackSubmit: null
}))