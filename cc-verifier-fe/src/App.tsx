import HomeComponent from './components/home.component'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BoardComponent from './components/board.component';
import CardFormComponent from './components/cardForm.component';
import { ThemeProvider } from '@emotion/react';
import './App.css'
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/board" element={<BoardComponent />} />
          <Route path="/cards/create" element={<CardFormComponent />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
