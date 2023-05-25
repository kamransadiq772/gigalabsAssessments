import React from 'react';
import logo from './logo.svg';
import './App.css';
import PostCard from './Components/PostCard/PostCard';
import { Container } from '@mui/joy';
import Home from './pages/Home/Home';
import {BrowserRouter,Router,Routes, Route} from 'react-router-dom'
import Login from './pages/LogIn/Login';
import SignUp from './pages/SignUp/SignUp';
import CustomRoutes from './routes'

function App() {
  return (
    <Container sx={{ py: 5 }} >
      <BrowserRouter>
      <Routes>
        {CustomRoutes}
      </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
