import './App.css'
import theme from './theme/Theme'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
          <CssBaseline />
            <Routers />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </>
  )
}

export default App
