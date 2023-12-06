import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="icons-container">
      <button type="button" className="footer-icons">
        <FaGoogle />
      </button>
      <button type="button" className="footer-icons">
        <FaTwitter />
      </button>
      <button type="button" className="footer-icons">
        <FaInstagram />
      </button>
      <button type="button" className="footer-icons">
        <FaYoutube />
      </button>
    </div>
    <p className="footer-txt"> Contact Us </p>
  </div>
)

export default Footer
