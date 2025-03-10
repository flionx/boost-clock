import { Link } from 'react-router-dom';
import ExternalLink from '../ExternalLink/ExternalLink';
import './Footer.css';
const urlGithub = 'https://github.com/flionx';
const urlInstagram = 'https://www.instagram.com/dn06sh';
const urlLinkedin = 'https://www.linkedin.com/in/danila-shipilov';

const Footer = () =>  {
    return (
        <footer className="footer">
        <div className="container">
          <nav className="footer__follow">
            <h5 className="footer__title">Follow me:</h5>
            <ul className="footer__list-follow">
              <ExternalLink href={urlGithub}><li className="list-follow__item list-follow1"></li></ExternalLink>
              <ExternalLink href={urlInstagram}><li className="list-follow__item list-follow2"></li></ExternalLink>
              <ExternalLink href={urlLinkedin}><li className="list-follow__item list-follow3"></li></ExternalLink>
            </ul>
          </nav>
          <nav className='footer__links'>
            <Link to='/info'><li>Info</li></Link>
            <li>Contact</li>
            <Link to='/terms-of-use'><li>Terms of Use</li></Link>
            <li>Privacy policy</li>
          </nav>
          <p className='footer__copy'>&copy; 2025 Flionx</p>
        </div>
      </footer>
    )
}

export default Footer;