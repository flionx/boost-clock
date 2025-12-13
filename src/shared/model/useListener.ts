import { useEffect } from 'react'

const useListener = (
    event: keyof DocumentEventMap, 
    callback: (event: DocumentEventMap[keyof DocumentEventMap]) => void
) => {
  useEffect(() => {
    document.addEventListener(event, callback);
    return () => {
      document.removeEventListener(event, callback)
    }
  }, [])
}

export default useListener