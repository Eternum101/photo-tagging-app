import React, { useState, useEffect } from 'react';
import { FaCaretRight } from "react-icons/fa6";
import '../styles/SplashScreen.css';
import headingImage from '../assets/images/carmen.png';
import levelOneImage from '../assets/images/wimmelbilder-level-1.jpg';
import levelTwoImage from '../assets/images/wimmelbilder-level-2.png';
import levelThreeImage from '../assets/images/wimmelbilder-level-3.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { formatTime } from '../hooks/timeFormat';

function SplashScreen({setLevel, setIsGameStarted, setIsSplashScreen, setIsGameCompleted}) {

    useEffect(() => {
        setIsSplashScreen(true);
        setIsGameStarted(false);
        setIsGameCompleted(false);
        fetchLeaderboard(1);
        return () => setIsSplashScreen(false);
      }, []);        

    const navigate = useNavigate();

    const handleLevelSelection = (selectedLevel) => {
        setLevel(selectedLevel);
        setIsGameStarted(true);
        navigate('/game');
      };

   const descriptionInfo = {
        'Objective': 'The main objective of the game is to find specific characters or items hidden within a larger image. The character or item you’re looking for will be given to you at the start of each level.',
        'Instructions': [
            'Start the Game: Click on the ‘Start’ button to begin the game. You will be presented with a large, detailed and colorful image filled with many characters and items.',
            'Find the Target: At the start of each level, you will be shown the character or item you need to find. This could be a person, an animal, or an object.',
            'Search the Image: Use your mouse to navigate around the image.',
            'Select the Target: Once you’ve found the target, click on it. If you’re correct, you will progress.',
            'Progress Through Levels: Each level will have a different target and image. The game gets progressively more difficult with the target becoming harder to find.',
            'Win the Game: The game is won by completing all the levels. Good luck and have fun!'
        ],
        'Tips': [
            'Take your time and be patient. Some targets are very well hidden.',
            'Look for distinguishing features of the target. This could be a particular color, shape, or pattern.',
            'If you’re stuck, try changing your perspective or take a break and come back later with fresh eyes.'
        ]
    }

    const [descriptionKey, setDescriptionKey] = useState('Objective'); 
    const [activeButton, setActiveButton] = useState('Objective');
    
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [selectedLeaderboard, setSelectedLeaderboard] = useState(1);

    const fetchLeaderboard = async (level) => {
        try {
          const response = await axios.get(`/api/scores/leaderboard/${level}`);
          setLeaderboardData(response.data);
        } catch (error) {
          console.error(error);
        }
      };     

    return (
        <>
        <div className='heading-container'>
            <div className='heading-info'>
                <h3>SCORE ON THE LEADERBOARD</h3>
                <h2>FIND THE HIDDEN <span>CHARACTERS</span></h2>
                <h4>Race against the clock to find the characters in each level.</h4>
                <button className='btn-play' onClick={() => document.getElementById('select-level').scrollIntoView({ behavior: 'smooth' })}>
                <FaCaretRight />
                    Play Game
                </button>
            </div>
            <div className='heading-image'>
                <img src={headingImage} alt="Heading Image"/>
            </div>
        </div>
        <div className="how-to-play-container" id='how-to-play'>
            <h1>How To Play</h1>
        <div className="description-container">
        {Array.isArray(descriptionInfo[descriptionKey]) ? (
            <ul>
                {descriptionInfo[descriptionKey].map((tip, index) => (
                    <li key={index}>{tip}</li>
                ))}
            </ul>
        ) : (
            <p>{descriptionInfo[descriptionKey]}</p>
        )}
</div>
    <div className="btn-container">
        <button 
  onClick={() => {
    setActiveButton('Objective');
    setDescriptionKey('Objective');
  }}
  className={activeButton === 'Objective' ? 'active' : ''}
>
  Objective
</button>
<button 
  onClick={() => {
    setActiveButton('Instructions');
    setDescriptionKey('Instructions');
  }}
  className={activeButton === 'Instructions' ? 'active' : ''}
>
  Instructions
</button>
<button 
  onClick={() => {
    setActiveButton('Tips');
    setDescriptionKey('Tips');
  }}
  className={activeButton === 'Tips' ? 'active' : ''}
>
  Tips
</button>
    </div>
        </div>
        <div className='levels-container' id='select-level'>
            <div className='levels-header'>
                <h1>Select Level</h1>
            </div>
        <div className="level-card-container">
            <div className='level-card' onClick={() => handleLevelSelection(1)}>
                <div className='level-image'>
                    <img src={levelOneImage} alt="Level One"/>
                </div>
                <div className='level-info'>
                    <h2>Level 1</h2>
                    <p>Difficulty: Easy</p>
                    <button className='btn-start' onClick={() => handleLevelSelection(1)}>
                        <FaCaretRight />
                        Start Level 1
                    </button>
                </div>
            </div>
            <div className='level-card' onClick={() => handleLevelSelection(2)}>
                <div className='level-image'>
                    <img src={levelTwoImage} alt="Level Two"/>
                </div>
                <div className='level-info'>
                    <h2>Level 2</h2>
                    <p>Difficulty: Medium</p>
                    <button className='btn-start' onClick={() => handleLevelSelection(2)}>
                        <FaCaretRight />
                        Start Level 2
                    </button>
                </div>
            </div>
            <div className='level-card' onClick={() => handleLevelSelection(3)}>
                <div className='level-image'>
                    <img src={levelThreeImage} alt="Level Three"/>
                </div>
                <div className='level-info'>
                    <h2>Level 3</h2>
                    <p>Difficulty: Hard</p>
                    <button className='btn-start' onClick={() => handleLevelSelection(3)}>
                        <FaCaretRight />
                        Start Level 3
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div className='leaderboard-container' id='leaderboard'>
            <div className='leaderboard-header'>
                <h1>Leaderboard</h1>
            </div>
        <div className="leaderboard-card-container">
        <div className={`leaderboard-card ${selectedLeaderboard === 1 ? 'selected' : ''}`} 
             onClick={() => {fetchLeaderboard(1); setSelectedLeaderboard(1);}}>
                <div className='level-image'>
                    <img src={levelOneImage} alt="Level One"/>
                </div>
                <div className='leaderboard-info'>
                    <h2>Level 1</h2>
                </div>
            </div>
            <div className={`leaderboard-card ${selectedLeaderboard === 2 ? 'selected' : ''}`} 
                 onClick={() => {fetchLeaderboard(2); setSelectedLeaderboard(2);}}>
                <div className='level-image'>
                    <img src={levelTwoImage} alt="Level Two"/>
                </div>
                <div className='leaderboard-info'>
                    <h2>Level 2</h2>
                </div>
            </div>
            <div className={`leaderboard-card ${selectedLeaderboard === 3 ? 'selected' : ''}`} 
                 onClick={() => {fetchLeaderboard(3); setSelectedLeaderboard(3);}}>
                <div className='level-image'>
                    <img src={levelThreeImage} alt="Level Three"/>
                </div>
                <div className='leaderboard-info'>
                    <h2>Level 3</h2>
                </div>
            </div>
        </div>
    <h2 className='h2-leaderboard'>Level {selectedLeaderboard} Leaderboard</h2>
    <div className='leaderboard-table-container'>
        <table className='leaderboard-table'>
        <thead>
          <tr>
            <th>Place</th>
            <th>Username</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((score, index) => (
            <tr key={index}>
              <td>{score.place}</td>
              <td>{score.username}</td>
              <td>{formatTime(score.time)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
        </>
    )
}

export default SplashScreen;