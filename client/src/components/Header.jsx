import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; 
import useGameTimer from '../hooks/useGameTimer';

function Header({ isGameStarted, characterImage }) {
      const time = useGameTimer(isGameStarted);

      return (
        <header>
            <nav>
                <div className="logo">
                    <Link to='/'><h1>PhotoTagApp.</h1></Link>
                </div>
                <div className="nav-right">
                    {!isGameStarted && (
                        <>
                            <h3>Home</h3>
                            <h3 onClick={() => document.getElementById('how-to-play').scrollIntoView({ behavior: 'smooth' })}>
                                How to Play
                            </h3>
                            <h3 onClick={() => document.getElementById('select-level').scrollIntoView({ behavior: 'smooth' })}>
                                Select Level
                            </h3>
                        </>
                    )}
                    {isGameStarted && (
                        <>
                        <div className='nav-right-game'>
                            <div className='timer'>{time}</div>
                            <div className='image-container'>
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
    )
}

export default Header;
