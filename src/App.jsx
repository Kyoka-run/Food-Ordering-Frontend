import './App.css'
import theme from './theme/Theme'
import Navbar from './component/shared/Navbar'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <ThemeProvider theme={theme}>
        <CssBaseline />
          <Navbar />
        </ThemeProvider>
      </Router>
    </>
  )
}

export default App
