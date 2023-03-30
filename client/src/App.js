import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import AuthScreen from './screens/AuthScreen';
import BookingScreen from './screens/BookingScreen';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
          <Route path='/' element={<HomeScreen />} exact />
          <Route path='/auth' element={<AuthScreen />} />
          <Route path='/trains' element={<BookingScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
