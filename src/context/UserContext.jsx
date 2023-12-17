import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const UserContext = createContext();

// this to get all the variables declared
export const UserState = () => useContext(UserContext);

const UserProvider = (props) => {
  const [user, setUser] = useState({});
  const [load, setLoad] = useState(false);
const [whichF, SetWhichF] = useState(null);
const [blogFarm, SetblogFarm] = useState(null);
  const getuserInfo = async (user) => {
    const q = query(collection(db, "users"), where("userID", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs[0].data();
    setUser({
      name: data.username,
      authId: user.uid,
      email: data.email,
      userId: querySnapshot.docs[0].id,
      phone: data.phone,
      photoUrl: data.photoUrl.imageUrl,
      address: data.address,
      isVerified: user.emailVerified,
      about:data.about,
      isFarmer:data.isFarmer
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (userr) => {
      if (userr) {
        setUser({ authId: userr.uid, email: userr.email });
        getuserInfo(userr);
      }else{
        setUser(null);
      }
    });
  }, [load]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        load,
        setLoad,
        whichF,
        SetWhichF,
        SetblogFarm,
        blogFarm,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
