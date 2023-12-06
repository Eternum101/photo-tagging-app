import React, { useState, useEffect } from 'react';
import levelOneImage from '../assets/images/wimmelbilder-level-1.jpg';
import levelTwoImage from '../assets/images/wimmelbilder-level-2.png';
import levelThreeImage from '../assets/images/wimmelbilder-level-3.jpg';
import '../styles/Game.css';
import axios from 'axios'; 

function Game({ setIsGameStarted, level }) {
  useEffect(() => {
    setIsGameStarted(true);
  }, []);

  const [characters, setCharacters] = useState([]);
  const [isCharacterBoxVisible, setIsCharacterBoxVisible] = useState(false);
  const [clickX, setClickX] = useState(0);
  const [clickY, setClickY] = useState(0);
  const [rect, setRect] = useState(null);

  const handleCharacterClick = async (event) => {
    const rect = event.target.getBoundingClientRect();
    setRect(rect);
    const x = ((event.clientX - rect.left) / rect.width) * 100; // x position as a percentage of the element's width
    const y = ((event.clientY - rect.top) / rect.height) * 100; // y position as a percentage of the element's height
  
    setClickX(event.clientX - rect.left);
    setClickY(event.clientY - rect.top);
  
    try {
      const response = await axios.get(`/api/character/${level}`);
      setCharacters(response.data);
      setIsCharacterBoxVisible(true);
    } catch (error) {
      console.error(error);
    }
  };   

  const handleCharacterSelect = (character) => {
    if (rect) {
      const dx = Math.abs(character.coordinates.x - clickX / rect.width * 100);
      const dy = Math.abs(character.coordinates.y - clickY / rect.height * 100);
      if (dx < 5 && dy < 5) {
        console.log(`You found ${character.name} at (${clickX}%, ${clickY}%)`);
      } else {
        console.log(`Sorry, ${character.name} is not at (${clickX}%, ${clickY}%)`);
      }
    }
    setIsCharacterBoxVisible(false);
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
    <div>
      <img src={image} alt={`Level ${level}`} onClick={handleCharacterClick} />
      {isCharacterBoxVisible && (
        <div className="character-box" style={{ left: clickX, top: clickY }}>
          {characters.map(character => (
      <div key={character.name} className="character"  onClick={() => handleCharacterSelect(character)}>
        <img src={character.image} alt={character.name} />
        {character.name}
      </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Game;