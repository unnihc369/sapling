import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../Firebase";

const UserContext = createContext();

// this to get all the variables declared
export const UserState = () => useContext(UserContext);

const UserProvider = (props) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth,async(userr)=>{
      if(userr){
        setUser(userr);
      }
    })
  }, [])
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
