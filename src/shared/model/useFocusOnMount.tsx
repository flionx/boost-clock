import React, { useEffect } from 'react'

const useFocusOnMount = (ref: React.RefObject<HTMLElement | null>, condition: boolean) => {
  useEffect(() => {
    if (condition && ref.current) {        
        ref.current.focus();
        if ('value' in ref.current &&
          'setSelectionRange' in ref.current
        ) {
          const element = ref.current as HTMLTextAreaElement | HTMLInputElement;
          const length =  element.value.length; 
          element.setSelectionRange(length, length);
        }
    }
  }, [condition, ref])
}

export default useFocusOnMount