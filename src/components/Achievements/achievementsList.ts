import { ReactComponent as Img1 }  from '../../../assets/achievements/new.svg';
import { ReactComponent as Img2 } from '../../../assets/achievements/planner.svg';
import { ReactComponent as Img3 } from '../../../assets/achievements/productive.svg';
import { ReactComponent as Img4 } from '../../../assets/achievements/responsible.svg';
import { ReactComponent as Img5 } from '../../../assets/achievements/focus.svg';
import { ReactComponent as Img6 } from '../../../assets/achievements/coffee.svg';
import { IAchiev } from '../../types/global';

const achievsArray: IAchiev[] = [
    {
        img: Img1,
        title: "I'm new",
        text: "Complete 1 pomodoro round",
        step: 0,
        max: 1,
        lock: true
    },    
    {
        img: Img2,
        title: "Planner",
        text: "Add the first task",
        step: 0,
        max: 1,
        lock: true
    },   
    {
        img: Img3,
        title: "Productive",
        text: "Complete 15 pomodoros",
        step: 0,
        max: 15,
        lock: true
    },
    {
        img: Img4,
        title: "Responsible",
        text: "Complete 10 tasks within the deadline",
        step: 0,
        max: 10,
        lock: true
    },
    {
        img: Img5,
        title: "In focus",
        text: "Spend 5 hours working",
        step: 0,
        max: 5,
        lock: true
    },
    {
        img: Img6,
        title: "Coffee time",
        text: "Spend 2 hours relaxing",
        step: 0,
        max: 2,
        lock: true
    },
]
export default achievsArray;
