import useStyles from "./App.styles"
import { Header } from "./components/Header"
import { AccountContextProvider } from "./providers/AccountProvider"
import { ThemeProvider } from "./providers/ThemeProvider"
import { Router } from "./pages/Router"

const App: React.FC = () => {
  const classes = useStyles()

  return (
    <ThemeProvider>
      <AccountContextProvider>
        <div className={classes.wrapper}>
          <Header />
          <div className={classes.container}>
            <Router />
          </div>
        </div>
      </AccountContextProvider>
    </ThemeProvider>
  )
}

export default App
