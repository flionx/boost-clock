import React, { useEffect } from 'react'

const useListenerClick = (callback: VoidFunction) => {
  useEffect(() => {
    document.addEventListener('click', callback);
    return () => document.removeEventListener('click', callback)
  }, [])
}

export default useListenerClick