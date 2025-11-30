import { useEffect } from 'react'

const useStopPageScroll = (condition: boolean) => {
    useEffect(() => {
        if (!condition) return;
        if (document.body.style.overflow !== "hidden") {
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "";
        }
    }, [condition])
}

export default useStopPageScroll;