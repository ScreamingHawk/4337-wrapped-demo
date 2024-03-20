import useStyles from "./App.styles"
import { Header } from "./components/Header"
import { ThemeProvider } from "./components/ThemeProvider"
import { Router } from "./pages/Router"

const App: React.FC = () => {
  const classes = useStyles()

  return (
    <ThemeProvider>
      <div className={classes.wrapper}>
        <Header />
        <div className={classes.container}>
          <Router />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
