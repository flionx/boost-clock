// import Progress from "./Progress/Progress";
import ChangeButton from "./ChangeButton/ChangeButton"

function TimerSettings({work, relax}) {
  const {workMin, setWorkMin} = work;
  const {relaxMin, setRelaxMin} = relax;
  
  // const {showProgress, setShowProgress} = progress;

  const changerTime = 1;
  const changerTimeRelax = 1;
  
  function changeTime(type, action) {
    if (type === 'work') {
      if (action === '+') {
        setWorkMin((curr) => curr + changerTime)
      } else if (workMin > 1) {
        setWorkMin((curr) => curr - changerTime)
      }

    } else if (type === 'relax') {
        if (action === '+') {
          setRelaxMin((curr) => curr + changerTimeRelax)
        } else if(relaxMin > 1) {
          setRelaxMin((curr) => curr - changerTimeRelax)
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
                    <div className="settings-main__value">{workMin}</div>
                    <ChangeButton className="settings-main__change" 
                        onClickHandler={changeTime}
                        type="work">+</ChangeButton>
                </div>

                <div className="settings-main__item">
                    <ChangeButton className="settings-main__change" 
                        onClickHandler={changeTime}
                        type="relax">-</ChangeButton>
                    <div className="settings-main__value">{relaxMin}</div>
                    <ChangeButton className="settings-main__change" 
                        onClickHandler={changeTime}
                        type="relax">+</ChangeButton>
                </div>

            </div>

          
          
        </section>
    )
}

export default TimerSettings;
