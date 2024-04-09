import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext({});

const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate()
  
    const login = (user) => {
      setCurrentUser(user)
    }
  
    const logout = () => {
      setCurrentUser(null);
      navigate("/")
    }
  
    return <UserContext.Provider value={{currentUser, login, logout}}>{ children }</UserContext.Provider>
}

export { UserContext, UserProvider }

// const addNew puch =>
// updatePurchases = [...currentUser.purchases, newpurchase]
// {...currentUser, purchases: updatePurchases}