import { AccountContextProvider } from "./providers/AccountProvider"
import { ThemeProvider } from "./providers/ThemeProvider"
import { Router } from "./pages/Router"

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AccountContextProvider>
        <Router />
      </AccountContextProvider>
    </ThemeProvider>
  )
}

export default App
