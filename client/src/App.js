import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import SplashScreen from './pages/SplashScreen';
import Header from './components/Header';
import Game from './pages/Game';
import { useState, useEffect } from 'react';
import useGameTimer from './hooks/useGameTimer';

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [level, setLevel] = useState(1);
  const [characterImage, setCharacterImage] = useState([]);
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const time = useGameTimer(isGameStarted, isGameCompleted);
  const [isSplashScreen, setIsSplashScreen] = useState(true);
  
  useEffect(() => {
    if (isGameStarted) {
      fetch(`/api/character/${level}`)
        .then(response => response.json())
        .then(data => setCharacterImage(data))
        .catch(error => console.error('Error:', error));
    }
  }, [level, isGameStarted]);

  return (
    <Router>
      <Header key={level} isGameStarted={isGameStarted} setIsGameStarted={setIsGameStarted} isSplashScreen={isSplashScreen} characterImage={characterImage} isGameCompleted={isGameCompleted} time={time}/>
      <Routes>
      <Route path='/' element={<SplashScreen setLevel={setLevel} setIsGameStarted={setIsGameStarted} setIsSplashScreen={setIsSplashScreen} setIsGameCompleted={setIsGameCompleted}/>}></Route>
        <Route path='/game' element={<Game isGameStarted={isGameStarted} setIsGameStarted={setIsGameStarted} level={level} setIsGameCompleted={setIsGameCompleted} time={time}/>}/>
      </Routes>
    </Router>
  )
}

export default App;
