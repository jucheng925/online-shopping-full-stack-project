import '../App.css'
import { Outlet} from "react-router-dom"
import NavBar from './NavBar'
import { UserProvider } from '../context/UserContext';


function App() {
  return (
    <UserProvider>
      <header>
        <NavBar/>
      </header>
      <Outlet/>
    </UserProvider>
  )
}

export default App
