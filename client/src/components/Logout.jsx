import React from 'react'
import { useNavigate } from 'react-router-dom'


const Logout = ({logout}) => {
  const navigate = useNavigate()
  return (
    <div>
      Logging Out
      {logout()}
      {navigate("/")}

    </div>
  )
}

export default Logout
