import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';

const useGetState = () => {

    const state = useSelector(state => state);
    const stateRef = useRef(null); 

    useEffect(() => {
        if (!stateRef.current) {
            stateRef.current = state;
            console.log("Состояние сохранено:", stateRef.current);
        }
    }, [state]); 

    return stateRef;

}

export default useGetState;