import { useState } from 'react';
import './App.css';
import Popup from './Components/Popup/Popup';
import Header from './Components/Header/Header';

function App() {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = ()=>{
    setIsVisible(!isVisible);
    if(isVisible){

    }
  }

  return (

    <div className='mainContainer'>
       
      <div className={`${isVisible?'show':'header-button-container' }`}>
        <Header text='View Audience' isVisible = {isVisible}/>
        <button onClick={handleClick}>Save segment</button>
      </div>
      
      {isVisible ?
        <div style={{}}> <Popup handlePopup={handleClick} /></div> : ''
      }
      
    </div>
  );
}

export default App;


