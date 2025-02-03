import './App.css'
import theme from './theme/Theme'
import Routers from './router/Routers'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'

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
