import React from 'react'
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLessThan } from '@fortawesome/free-solid-svg-icons';

const Header = ({text,handlePopup,isVisible}) => {
  return (
    <header>
        {/* Icon */}
        <div className={`${isVisible ? 'hiden' : 'container' }`} onClick={handlePopup}>
            <FontAwesomeIcon icon={faLessThan} />
            <p>{text}</p>
        </div>
    </header>
  )
}

export default Header
