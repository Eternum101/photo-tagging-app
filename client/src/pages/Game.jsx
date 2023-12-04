import React, { useEffect } from 'react';
import levelOneImage from '../assets/images/wimmelbilder-level-1.jpg';
import levelTwoImage from '../assets/images/wimmelbilder-level-2.png';
import levelThreeImage from '../assets/images/wimmelbilder-level-3.jpg';
import '../styles/Game.css';
import axios from 'axios'; 

function Game({ setIsGameStarted, level }) {
  useEffect(() => {
    setIsGameStarted(true);
  }, []);

  //const handleCharacterClick = async (event) => {
  //  const rect = event.target.getBoundingClientRect();
   // const x = ((event.clientX - rect.left) / rect.width) * 100; // x position as a percentage of the element's width
   // const y = ((event.clientY - rect.top) / rect.height) * 100; // y position as a percentage of the element's height
  
   // const character = {
   //   name: 'Meg', // replace with the actual character name
   //   coordinates: { x, y },
   //   level: 3 // replace with the actual level
   // };
  
   // try {
   //   const response = await axios.post('/api/character', character);
   //   console.log(response);
    //} catch (error) {
      //console.error(error);
   // }
  //};

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
      <img src={image} alt={`Level ${level}`}/>
    </div>
  )
}

export default Game;