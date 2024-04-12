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

    const contextAddStore = (newStore) => {
      const newStoresList = [...currentUser.stores, newStore]
      setCurrentUser({...currentUser, stores: newStoresList})
    }

    const contextDeleteStore = (deletedStoreId) => {
      const newStoresList = currentUser.stores.filter((store)=> store.id !== deletedStoreId)
      setCurrentUser({...currentUser, stores: newStoresList})
    }

    const contextUpdateStore = (updatedStore) => {
      const newStoresList = currentUser.stores.map((store)=> {
        if (store.id === updatedStore.id) {
          return updatedStore;
        } else {
          return store
        }
      });
      setCurrentUser({...currentUser, stores: newStoresList});
    }

    const contextAddPurchase = (newPurchase) => {
      const updatePurchases = [...currentUser.purchases, newPurchase]
      setCurrentUser({...currentUser, purchases: updatePurchases})
    }
  
    return (
      <UserContext.Provider 
        value={{currentUser, login, logout, contextAddStore, contextAddPurchase, contextUpdateStore, contextDeleteStore}}>
          { children }
      </UserContext.Provider>
    )
}

export { UserContext, UserProvider }

// const addNew puch =>
// updatePurchases = [...currentUser.purchases, newpurchase]
// {...currentUser, purchases: updatePurchases}