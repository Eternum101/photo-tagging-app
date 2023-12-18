import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; 
import { IoMdArrowDropdown } from "react-icons/io";

function Header({ isGameStarted, isSplashScreen, characterImage, time }) {

      const [isDropdownVisible, setIsDropdownVisible] = useState(false);

      const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
      };

      return (
        <header className={isGameStarted ? 'sticky' : ''}>
            <nav>
                <div className="logo">
                    <Link to='/'><h1>PhotoTagApp.</h1></Link>
                </div>
                <div className="nav-right">
          {isSplashScreen ? (
            <>
              <h3 onClick={() => document.getElementById('how-to-play').scrollIntoView({ behavior: 'smooth' })}>
                How to Play
              </h3>
              <h3 onClick={() => document.getElementById('select-level').scrollIntoView({ behavior: 'smooth' })}>
                Select Level
              </h3>
              <h3 onClick={() => document.getElementById('leaderboard').scrollIntoView({ behavior: 'smooth' })}>Leaderboard</h3>
            </>
          ) : (
            <>
              <div className='nav-right-game'>
                <button onClick={toggleDropdown} className='dropdown-button'>
                  Characters
                  <IoMdArrowDropdown />
                </button>
                <div className='timer'>{time}</div>
                <div className={`image-container ${isDropdownVisible ? 'show' : ''}`}>
                  {characterImage.map((character, index) => (
                    <div className='character-container' key={index}>
                      <img src={`/${character.image}`} alt={character.name} />
                      <p>{character.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
