import img1 from '../../../assets/achievements/new.svg?url';
import img2 from '../../../assets/achievements/planner.svg?url';
import img3 from '../../../assets/achievements/productive.svg?url';
import img4 from '../../../assets/achievements/responsible.svg?url';
import img5 from '../../../assets/achievements/focus.svg?url';
import img6 from '../../../assets/achievements/coffee.svg?url';
import { IAchiev } from '../../types/global';

const achievsArray: IAchiev[] = [
    {
        img: img1,
        title: "I'm new",
        text: "Complete 1 pomodoro round",
        step: 0,
        max: 1,
        lock: true
    },    
    {
        img: img2,
        title: "Planner",
        text: "Add the first task",
        step: 0,
        max: 1,
        lock: true
    },   
    {
        img: img3,
        title: "Productive",
        text: "Complete 15 pomodoros",
        step: 0,
        max: 15,
        lock: true
    },
    {
        img: img4,
        title: "Responsible",
        text: "Complete 10 tasks within the deadline",
        step: 0,
        max: 10,
        lock: true
    },
    {
        img: img5,
        title: "In focus",
        text: "Spend 5 hours working",
        step: 0,
        max: 5,
        lock: true
    },
    {
        img: img6,
        title: "Coffee time",
        text: "Spend 2 hours relaxing",
        step: 0,
        max: 2,
        lock: true
    },
]
export default achievsArray;
