import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import SplashScreen from './pages/SplashScreen';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SplashScreen/>}></Route>
      </Routes>
    </Router>
  )
}

export default App;
