"use client"
import useStopPageScroll from "@/shared/model/useStopPageScroll";
import { useModalStore } from "@/shared/store/modal"

const Modal = () => {
    const show = useModalStore(state => state.show);
    const title = useModalStore(state => state.title);
    const label = useModalStore(state => state.label);
    const submitLabel = useModalStore(state => state.submitLabel);
    const closeModal = useModalStore(state => state.closeModal);
    const submitModal = useModalStore(state => state.submitModal);
    useStopPageScroll(show);
    if (!show) return null;

  return (
    <div 
        onClick={closeModal}
        className="fixed bg-[#0006] z-10 inset-0 w-full h-full backdrop-blur-[1px] overflow-auto"
        >
        <div 
            onClick={(e) => e.stopPropagation()}
            className="
                relative top-1/2 left-1/2 -translate-1/2 flex flex-col items-center gap-7.5 max-w-[clamp(21.9rem,95vw,26.2rem)]
                py-3.5 px-12.5 font-secondary bg-primary text-text rounded-lg shadow-[4px_4px_4px_#00000040] border border-[#444444]
            "
            >
            <h3 className="text-2xl text-center">{title}</h3>
            <p className="text-lg text-center">{label}</p>
            <div className="flex justify-center gap-8.5">
                <button 
                    onClick={closeModal}
                    className="
                        py-0.5 px-2.5 text-xl rounded-lg transition-colors border-3 border-modal-btn-ui bg-transparent hover:bg-modal-btn-ui-hover
                        active:bg-modal-btn-ui-active active:border-modal-btn-ui-active
                    "
                >
                        Cancel
                </button>
                <button 
                    onClick={submitModal}
                    className="
                        py-0.5 px-2.5 text-xl rounded-lg transition-colors bg-modal-btn-ui hover:bg-modal-btn-ui-hover
                        active:bg-modal-btn-ui-active
                    "
                >
                    {submitLabel}
                </button>
            </div>
        </div>
    </div>
  )
}

export default Modal