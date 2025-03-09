import { FC, memo } from "react";
import pathToLockImg from '../../../assets/achievements/block.svg';
import { IAchiev } from "../../types/global";

interface Props {
    card: IAchiev,
}

const AchievCard: FC<Props> = memo(({card}) => {
    return (
        <div className="modal-menu__achiv achiv" style={card.lock ? {background: '#CACCF5'} : {}}>
            <div className={card.lock ? 'achiv__i achiv__icon-lock' : 'achiv__i achiv__icon'}>
                <img src={card.lock ? pathToLockImg : card.img} alt="icon" />
            </div>
            <div className="achiv__bottom">
                <div className="achiv__bottom-1">
                    <div className="achiv__title">{card.title}</div>
                    <div className="achiv__text">{card.text}</div>
                </div>
                <div className="achiv__stat">{card.step}/{card.max}</div>
            </div>
        </div>
    );
});

export default AchievCard;
