import { useEffect } from 'react'

const useStopPageScroll = () => {
    useEffect(() => {
        if (document.body.style.overflow !== "hidden") {
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "";
        }
    }, [])
}

export default useStopPageScroll;