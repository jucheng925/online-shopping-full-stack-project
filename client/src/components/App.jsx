import '../App.css'
import '../forms.css'
import { Outlet} from "react-router-dom"
import NavBar from './NavBar'
import { UserProvider } from '../context/UserContext'
import CheckSession from './CheckSession'



function App() {


  return (
    <UserProvider>
      <CheckSession/>
      <NavBar/>
      <Outlet/>
    </UserProvider>
  )
}

export default App
