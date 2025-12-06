"use client"
import Settings from "@/features/settings/ui";
import useStopPageScroll from "@/shared/model/useStopPageScroll";
import { useModalMenuStore } from "@/shared/store/modal-menu";
import { CrossIcon } from '@/shared/ui/icons'

const ModalMenu = () => {
    const show = useModalMenuStore(state => state.show);
    const title = useModalMenuStore(state => state.section);
    const closeModal = useModalMenuStore(state => state.closeModal);
    const onReset = useModalMenuStore(state => state.onReset);
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
                relative top-10 left-1/2 -translate-x-1/2 max-w-[clamp(21.8rem,95vw,26.2rem)] shadow-[rgba(0,0,0,0.25)_4px_4px_4px]
                font-secondary pt-6.5 px-7.5 pb-4 bg-primary rounded-lg border-1 border-[#444444]
            "
        >
            <h3 className="text-3xl text-center text-text">{title}</h3>
            <button 
                onClick={closeModal}
                className="size-5 absolute top-6.5 right-6.5 cursor-pointer"
            >
                <CrossIcon className="size-5 text-line" />
            </button>
            {title === "Settings" && <Settings />}
            {onReset && (
                <button
                    onClick={onReset} 
                    className="block mx-auto text-center mt-5 hover:underline"
                >
                    Reset
                </button>
            )}
        </div>
    </div>
  )
}

export default ModalMenu