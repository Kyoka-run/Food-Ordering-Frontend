import './App.css'
import theme from './theme/Theme'
import { Routers } from './router/Routers'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <ThemeProvider theme={theme}>
        <CssBaseline />
          <Routers />
        </ThemeProvider>
      </Router>
    </>
  )
}

export default App
