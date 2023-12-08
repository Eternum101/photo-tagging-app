import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import SplashScreen from './pages/SplashScreen';
import Header from './components/Header';
import Game from './pages/Game';
import { useState, useEffect } from 'react';

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [level, setLevel] = useState(1);
  const [characterImage, setCharacterImage] = useState([]);
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  
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
      <Header isGameStarted={isGameStarted} setIsGameStarted={setIsGameStarted} characterImage={characterImage} isGameCompleted={isGameCompleted}/>
      <Routes>
        <Route path='/' element={<SplashScreen setLevel={setLevel} setIsGameStarted={setIsGameStarted}/>}></Route>
        <Route path='/game' element={<Game isGameStarted={isGameStarted} setIsGameStarted={setIsGameStarted} level={level} setIsGameCompleted={setIsGameCompleted}/>}/>
      </Routes>
    </Router>
  )
}

export default App;
