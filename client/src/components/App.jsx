import { useState } from 'react'
import '../App.css'
import Signup from './Signup'
import Login from './Login'

function App() {
  const [user, setUser] = useState([])

  

  return (
    <>
      <div>
        <Signup></Signup>
        <Login></Login>
      </div>
    </>
  )
}

export default App
