import {useEffect, useRef, useState} from 'react';
import './index.css'

function Progress({time, hasTimer}) {
    // Результат в %, который используется для задания ширины прогресса
    const [resultProcents, setResultProcents] = useState(0);
    
    // const [radiusBorder, setRadiusBorder] = useState('1rem 0 0 1rem');
    
    // 25 * 60 * 0.01 * 1000
    // const procentOfTime = time * 60 * 10;
    const calcWidth = 100 / (time * 60);    

    const idInterval = useRef(null);

    // каждый процент от времени - увеличиваем результат на 1%
    useEffect(() => {

        idInterval.current = setInterval(() => {
            setResultProcents(curr => {
                if (curr < 100) {
                    return curr + calcWidth;
                    
                } else {
                    clearInterval(idInterval.current);
                    return 100;
                }

            })
        }, 1000)

        
        return (() => {
            if (idInterval.current) {
                clearInterval(idInterval.current)
            }
        })
       
    }, [calcWidth])

    return (
        <div className="card__progress">
            <div className="card__progress-in" 
                style={{ width: `${resultProcents}%`}}>
              
            </div>
        </div>
    )
}

export default Progress;