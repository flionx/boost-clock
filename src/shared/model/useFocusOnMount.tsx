import React, { useEffect } from 'react'

const useFocusOnMount = (ref: React.RefObject<HTMLElement | null>, condition: boolean) => {
  useEffect(() => {
    if (condition && ref.current) {
        console.log(ref.current);
        
        ref.current.focus();
    }
  }, [condition, ref])
}

export default useFocusOnMount