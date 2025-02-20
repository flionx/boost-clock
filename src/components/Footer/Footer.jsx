import { useDispatch } from 'react-redux';
import './Footer.css';
import { setShowReport } from '../../store/slices/reportSlice';

function Footer() {

  const dispatch = useDispatch();
  
  function showReport() {
    dispatch(setShowReport(true));
  }

    return (
        <footer className="footer">
        <div className="container">
          <nav className="footer__content">
            <ul className="footer__list">
              <li className="footer__item item__menu"><button onClick={showReport} className="button__menu btn--icon1">Report</button></li>
              <li className="footer__item item__menu"><button className="button__menu btn--icon2">Achievments</button></li>
            </ul>
          </nav>
          
        </div>
      </footer>
    )
}

export default Footer;