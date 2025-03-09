import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { setShowAchiev } from '../../store/slices/achievementSlice';
import useStopPageScroll from '../../hooks/useStopPageScroll';
import AchievCard from './AchievCard';
import '../../css/modal-menu.css'

const Achievements = () => {
    const dispatch = useAppDispatch();
    const achievsArray = useAppSelector(state => state.achievement.achievs);

    useStopPageScroll();

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