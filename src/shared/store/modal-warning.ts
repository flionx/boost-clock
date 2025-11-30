"use client"
import { create } from "zustand"

interface ModalWarningState {
    show: boolean,
    label: string,
    submitLabel: string,
    setModal: (label: string, submitLabel: string, callbackSubmit: VoidFunction) => void,
    closeModal: VoidFunction,
    submitModal: VoidFunction,
    callbackSubmit: VoidFunction | null,
}

export const useModalWarningStore = create<ModalWarningState>((set, get) => ({
    show: false,
    label: '',
    submitLabel: '',
    setModal: (label, submitLabel, callbackSubmit) => set({ 
        show: true, 
        label, 
        submitLabel, 
        callbackSubmit 
    }),
    closeModal: () => set({
        show: false,
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