import './App.css'
import theme from './theme/Theme'
import Navbar from './component/navbar/Navbar'
import { ThemeProvider, CssBaseline } from '@mui/material'

function App() {
  return (
    <div className="text-center">
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <Navbar />
      </ThemeProvider>
    </div>
  )
}

export default App
