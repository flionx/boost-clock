
import { useEffect } from 'react';
import AchievCard from './AchievCard';
import { useDispatch, useSelector } from 'react-redux';
import { setShowAchiev } from '../../store/slices/achievementSlice.js';
import '../../css/modal-menu.css'

function Achievements() {

    const dispatch = useDispatch();
    const achievsArray = useSelector(state => state.achievement.achievs)
    useEffect(() => {
        if (document.body.style.overflow !== "hidden") {
            document.body.style.overflow = "hidden";            
        }
        return () => {
            document.body.style.overflow = "";
        }
    }, [])

    function hideReport() {
        dispatch(setShowAchiev(false));
    }

    return (
        <div
        onClick={hideReport}
        className="modal-menu__bg">
            <section 
            onClick={(e) => e.stopPropagation()}
            className="modal-menu">
                <div onClick={(e) => {
                    e.stopPropagation();
                    hideReport()
                }}
                className="modal-menu__close"></div>
                <h3 className="modal-menu__title">Achievements</h3>

                <div className="modal-menu-achivs">
                    {achievsArray.map(card => (
                        <AchievCard key={card.title} card={card}/>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Achievements;