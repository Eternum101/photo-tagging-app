import React, { useState, useEffect, useRef } from 'react';
import levelOneImage from '../assets/images/wimmelbilder-level-1.jpg';
import levelTwoImage from '../assets/images/wimmelbilder-level-2.png';
import levelThreeImage from '../assets/images/wimmelbilder-level-3.jpg';
import '../styles/Game.css';
import axios from 'axios'; 
import Modal from '../components/Modal';
import { useNavigate } from 'react-router-dom';
import { URL } from '../App';

function Game({ setIsGameStarted, level, setIsGameCompleted, time, setIsSplashScreen }) {
  const [characters, setCharacters] = useState([]);
  const [foundCharacter, setFoundCharacter] = useState([]);
  const [isCharacterBoxVisible, setIsCharacterBoxVisible] = useState(false);
  const [rect, setRect] = useState(null);
  
  const [showModal, setShowModal] = useState(false);
 
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const [foundCoordinates, setFoundCoordinates] = useState([]);
  const [popupMessage, setPopupMessage] = useState(null);
  const [isCharacterFound, setIsCharacterFound] = useState(null);
  
  const characterBoxRef = useRef(null);
  const [originalClickX, setOriginalClickX] = useState(0);
  const [originalClickY, setOriginalClickY] = useState(0);

  const [boxX, setBoxX] = useState(0);
  const [boxY, setBoxY] = useState(0);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsGameStarted(true);
    setFoundCharacter([]); 
    setIsSplashScreen(false);
    window.scrollTo(0,0);
  }, [level]); 

  const handleCharacterClick = async (event) => {
    const rect = event.target.getBoundingClientRect();
    setRect(rect);
    
    setOriginalClickX(event.clientX - rect.left);
    setOriginalClickY(event.clientY - rect.top);
  
    setIsCharacterBoxVisible(prevVisible => !prevVisible);
  
    if (!isCharacterBoxVisible) {
      setIsLoading(true);
      try {
        const response = await axios.get(`${URL}/api/character/${level}`);
        setCharacters(response.data);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    }
  };

  React.useLayoutEffect(() => {
    if (isCharacterBoxVisible && characterBoxRef.current) {
      setTimeout(() => {
        const boxRect = characterBoxRef.current.getBoundingClientRect();
  
        let left = originalClickX;
        if (left + boxRect.width > window.innerWidth) {
          left = originalClickX - boxRect.width;
        }
  
        let top = originalClickY;
        if (top + boxRect.height > window.innerHeight) {
          top = originalClickY - boxRect.height;
        }
  
        setBoxX(left);
        setBoxY(top);
      }, 0);
    }
  }, [isCharacterBoxVisible, originalClickX, originalClickY, characterBoxRef]);

  const handleCharacterSelect = (character) => {
    if (rect) {
      const clickXPercent = (originalClickX / rect.width) * 100;
      const clickYPercent = (originalClickY / rect.height) * 100;
  
      const dx = Math.abs(character.coordinates.x - clickXPercent);
      const dy = Math.abs(character.coordinates.y - clickYPercent);
  
      if (dx < 3 && dy < 3) {
        setPopupMessage(`You found ${character.name}!`);
        setIsCharacterFound(true); 
        setFoundCharacter(prevFound => {
          const updatedFound = [...prevFound, character.name];
          return updatedFound;
        });
        setFoundCoordinates(prevCoords => [...prevCoords, { x: character.coordinates.x, y: character.coordinates.y }]);
      } else {
        setPopupMessage(`Sorry, ${character.name} is not here.`);
        setIsCharacterFound(false);
      }
    }
    setIsCharacterBoxVisible(false);
  };

  useEffect(() => {
    if (!isLoading && foundCharacter.length === characters.length) {
      setIsGameCompleted(true);
      setShowModal(true);
    }
  }, [foundCharacter, characters, isLoading]);

  const handleSubmit = async () => {
    if (!username) {
      setError('Please enter a username');
      return;
    }

    const timeParts = time.split(':');
    const seconds = parseInt(timeParts[0]) * 3600 + parseInt(timeParts[1]) * 60 + parseInt(timeParts[2]);
  
    try {
      const response = await axios.post(`${URL}/api/scores`, {
        username,
        time: seconds,
        level
      });
      navigate('/');
    } catch (error) {
      console.error('Error submitting score:', error);
    }
  };

  useEffect(() => {
    if (popupMessage) {
      setTimeout(() => {
        setPopupMessage(null);
      }, 1000);
    }
  }, [popupMessage]);
  
  let image;
  switch (level) {
    case 1:
      image = levelOneImage;
      break;
    case 2:
      image = levelTwoImage;
      break;
    case 3:
      image = levelThreeImage;
      break;
    default:
      image = levelOneImage;
  }

  return (
    <div className='game-container'>
    {popupMessage && (
      <div className={`popup ${isCharacterFound ? 'found' : 'not-found'}`}>
    {popupMessage}
      </div>
    )}
      <img src={image} alt={`Level ${level}`} onClick={handleCharacterClick} />
      {isCharacterBoxVisible && (
  <div className="character-box-container" ref={characterBoxRef} style={{ left: boxX, top: boxY }}>
    <div className="character-box">
      {characters.filter(character => !foundCharacter.includes(character.name)).map(character => (
        <div key={character.name} className="character" onClick={() => handleCharacterSelect(character)}>
          <img src={`/${character.image}`} alt={character.name} />
          {character.name}
        </div>
      ))}
    </div>
  </div>
)}
    {foundCoordinates.map((coord, index) => (
    <div key={index} className="found-marker" style={{ left: `${coord.x}%`, top: `${coord.y}%` }}>
        X
    </div>
  ))}
      {showModal && (
        <Modal>
          <h2>Level Complete!</h2>
          <p>Your time: {time}</p>
          <input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
        {error && <div className='error'>{error}</div>}
        <div className='btn-modal-container'>
        <button className='btn-home' onClick={() => {
          navigate('/');
        }}>Return Home</button>
          <button className='btn-submit' onClick={handleSubmit}>Submit</button>
        </div>
        </Modal>
      )}
</div>
  );
}
export default Game;