import ChangeButton from "./ChangeButton/ChangeButton"

function TimerSettings({mins}) {

  const {minutes, setMinutes} = mins;

  // const changerTime = 1;
  // const changerTimeRelax = 1;
  
  function changeTime(type, action) {
    if (type === 'work') {
      if (action === '+') {
        setMinutes(min => ({
          ...min, 
          work: min.work + 1}))
      } else if (minutes.work > 1) {
        setMinutes(min => ({
          ...min, 
          work: min.work - 1}))
      }

    } else if (type === 'relax') {
        if (action === '+') {
          setMinutes(min => ({
            ...min, 
            relax: min.relax + 1}))

        } else if (minutes.relax > 1) {
          setMinutes(min => ({
            ...min, 
            relax: min.relax - 1}))
        }
    }
  }

    return (
    <section className="main__settings settings-main">

            <div className="settings-main__top">
                <h3 className="settings-main__title">Work</h3>
                <h3 className="settings-main__title">Break</h3>
            </div>

            <div className="settings-main__row">

                <div className="settings-main__item">
                    <ChangeButton className="settings-main__change" 
                        onClickHandler={changeTime}
                        type="work">-</ChangeButton>
                    <div className="settings-main__value">{minutes.work}</div>
                    <ChangeButton className="settings-main__change" 
                        onClickHandler={changeTime}
                        type="work">+</ChangeButton>
                </div>

                <div className="settings-main__item">
                    <ChangeButton className="settings-main__change" 
                        onClickHandler={changeTime}
                        type="relax">-</ChangeButton>
                    <div className="settings-main__value">{minutes.relax}</div>
                    <ChangeButton className="settings-main__change" 
                        onClickHandler={changeTime}
                        type="relax">+</ChangeButton>
                </div>

            </div>

        </section>
    )
}

export default TimerSettings;
