import '../App.css'
import '../forms.css'
import { Outlet} from "react-router-dom"
import NavBar from './NavBar'
import { UserProvider } from '../context/UserContext';



function App() {
  return (
    <UserProvider>
      <NavBar/>
      <Outlet/>
    </UserProvider>
  )
}

export default App
