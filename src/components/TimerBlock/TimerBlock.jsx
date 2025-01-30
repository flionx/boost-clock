
function TimerBlock() {

    return (
        <div className="timer">
            <div className="timer__top">
                <div className="timer__work timer__work--active">Work</div>
                <span className="timer__gorizontal-line"></span>
                <div className="timer__work">Break</div>
            </div>
            <div className="timer__main">25:00</div>
            <button className="timer__button">START</button>
        </div>
    )

}

export default TimerBlock;