import React, { useState, useEffect } from 'react';
import levelOneImage from '../assets/images/wimmelbilder-level-1.jpg';
import levelTwoImage from '../assets/images/wimmelbilder-level-2.png';
import levelThreeImage from '../assets/images/wimmelbilder-level-3.jpg';
import '../styles/Game.css';
import axios from 'axios'; 
import useGameTimer from '../hooks/useGameTimer';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router-dom';

function Game({ isGameStarted, setIsGameStarted, level }) {
  const [characters, setCharacters] = useState([]);
  const [foundCharacter, setFoundCharacter] = useState([]);
  const [isCharacterBoxVisible, setIsCharacterBoxVisible] = useState(false);
  const [clickX, setClickX] = useState(0);
  const [clickY, setClickY] = useState(0);
  const [rect, setRect] = useState(null);
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  
  const time = useGameTimer(isGameStarted, isGameCompleted);
  const [showModal, setShowModal] = useState(false);
 
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const [foundCoordinates, setFoundCoordinates] = useState([]);
  
  useEffect(() => {
    setIsGameStarted(true);
  }, []);

  const completeGame = () => {
    setIsGameCompleted(true);
    setShowModal(true);
  };

  const handleCharacterClick = async (event) => {
    const rect = event.target.getBoundingClientRect();
    setRect(rect);
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
  
    setClickX(event.clientX - rect.left);
    setClickY(event.clientY - rect.top);
  
    setIsCharacterBoxVisible(prevVisible => !prevVisible);
  
    if (!isCharacterBoxVisible) {
      try {
        const response = await axios.get(`/api/character/${level}`);
        setCharacters(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  useEffect(() => {
    const adjustCharacterBoxPositionWithGap = () => {
      if (isCharacterBoxVisible && rect) {
        const characterBox = document.querySelector('.character-box');
        if (characterBox) {
          // Call the function with the necessary arguments
          adjustCharacterBoxPosition(clickX, clickY, characterBox, rect);
        }
      }
    };
  
    adjustCharacterBoxPositionWithGap();

    window.addEventListener('resize', adjustCharacterBoxPosition);
  
    const handleResize = () => {
      setIsCharacterBoxVisible(false);
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', adjustCharacterBoxPosition);
      window.removeEventListener('resize', handleResize);
    };
  }, [isCharacterBoxVisible, clickX, clickY, rect]);

  const adjustCharacterBoxPosition = (clickX, clickY, characterBox, imageRect) => {
  const gap = 50;
  let left = clickX;

  if (left + characterBox.offsetWidth + gap > imageRect.right) {
    left = imageRect.right - characterBox.offsetWidth - gap;
  }

  if (left - gap < imageRect.left) {
    left = imageRect.left + gap;
  }

  characterBox.style.left = `${left}px`;
};

  const handleCharacterSelect = (character) => {
    if (rect) {
      const clickXPercent = (clickX / rect.width) * 100;
      const clickYPercent = (clickY / rect.height) * 100;
  
      const dx = Math.abs(character.coordinates.x - clickXPercent);
      const dy = Math.abs(character.coordinates.y - clickYPercent);
  
      if (dx < 3 && dy < 3) {
        console.log(`You found ${character.name} at (${clickXPercent.toFixed(2)}%, ${clickYPercent.toFixed(2)}%)`);
        setFoundCharacter(prevFound => {
          const updatedFound = [...prevFound, character.name];
          if (updatedFound.length === characters.length) {
            completeGame();
          }
          return updatedFound;
        });
        setFoundCoordinates(prevCoords => [...prevCoords, { x: character.coordinates.x, y: character.coordinates.y }]);
      } else {
        console.log(`Sorry, ${character.name} is not at (${clickXPercent.toFixed(2)}%, ${clickYPercent.toFixed(2)}%)`);
      }
    }
    setIsCharacterBoxVisible(false);
  };


  const handleSubmit = async () => {
    if (!username) {
      alert('Please enter a username');
      return;
    }

    const timeParts = time.split(':');
    const seconds = parseInt(timeParts[0]) * 3600 + parseInt(timeParts[1]) * 60 + parseInt(timeParts[2]);
  
    try {
      const response = await axios.post('/api/scores', {
        username,
        time: seconds,
        level
      });
      console.log('Score submitted:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error submitting score:', error);
    }
  };
  
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
      <img src={image} alt={`Level ${level}`} onClick={handleCharacterClick} />
      {isCharacterBoxVisible && (
  <div className="character-box" style={{ left: clickX, top: clickY }}>
    {characters.filter(character => !foundCharacter.includes(character.name)).map(character => (
      <div key={character.name} className="character" onClick={() => handleCharacterSelect(character)}>
        <img src={character.image} alt={character.name} />
        {character.name}
      </div>
    ))}
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
          <button className='btn-submit' onClick={handleSubmit}>Submit</button>
        </Modal>
      )}
</div>
  );
}
export default Game;