// import Progress from "./Progress/Progress";
import ChangeButton from "./ChangeButton/ChangeButton"

export default function CardBottom({work, relax, hasTimer, progress}) {
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
        <div className="card__bottom">
          {/* {!showProgress ? (
            <Progress time={workMin} hasTimer={hasTimer}/>
          ) : (
            <> */}
              <div className="card__bottom-left">
                <h3 className="card__bottom-title">working minutes</h3>
                <div className="card__bottom-select">

                  <ChangeButton className="arrow-up" 
                      onClickHandler={changeTime}
                      type="work">+</ChangeButton>

                  {workMin} min
                  <ChangeButton className="arrow-down" 
                      onClickHandler={changeTime}
                      type="work">-</ChangeButton>

                </div>
              </div>
              
              <div className="card__bottom-right">
                <h3 className="card__bottom-title">relaxing minutes</h3>
                <div className="card__bottom-select">

                <ChangeButton className="arrow-up" 
                      onClickHandler={changeTime}
                      type="relax">+</ChangeButton>

                  {relaxMin} min
                  <ChangeButton className="arrow-down" 
                      onClickHandler={changeTime}
                      type="relax">-</ChangeButton>

                </div>
              </div>
            {/* </>
          )} */}
          
          
        </div>
    )
}