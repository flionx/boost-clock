import React, { useEffect } from 'react'

const useListenerClick = (callback: VoidFunction) => {
  useEffect(() => {
    document.addEventListener('click', callback);
    document.addEventListener('scroll', callback);
    return () => {
      document.removeEventListener('click', callback)
      document.removeEventListener('scroll', callback)
    }
  }, [])
}

export default useListenerClick