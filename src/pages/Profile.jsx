// src/components/Profile.js
import React, { useEffect, useState } from "react";
import { UserState } from "../context/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { ToastError, ToastSuccess } from "../utility/Toasts";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Navbar } from "../components";

const Profile = () => {
  // context get userinfo

  const { user, setUser, SetblogFarm } = UserState();
  const [cltFarms, SetCltFarms] = useState([]);

  const naviagete = useNavigate();
  const signOutUser = async (e) => {
    e.preventDefault();
    await signOut(auth)
      .then(() => {
        setUser(null);

        naviagete("/");
        window.location.reload();
        ToastSuccess("SingOut successfully");
      })
      .catch((error) => {
        ToastError("There is the error with singout");
      });
  };

  const getAllfarms = async (user) => {
    if (user.isFarmer === "true") {
      const q = query(
        collection(db, "farm"),
        where("farmerId", "==", user.userId)
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs;

      return data.map((el) => {
        if (el.data().userId) {
          return el;
        }
      });
    } else {
      console.log("this is not farmer");
      const q = query(
        collection(db, "farm"),
        where("userId", "==", user.userId)
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs;

      return data.map((el) => {
        if (el.data().userId) {
          return el;
        }
      });
    }
  };
  useEffect(() => {
    if (user.userId) {
      (async () => {
        const data = await getAllfarms(user);
        SetCltFarms(data);
      })();
    }
  }, []);

  console.log(cltFarms);
  return (
    <div className="container mx-auto mt-8">
      <div className="flex flex-col items-center justify-center lg:flex-row">
        <div className="mb-4 lg:mb-0 lg:mr-8 bg-gray-200 p-8 rounded-full">
          <img
            src={user.photoUrl}
            alt="Profile"
            className="rounded-full h-20 w-20 object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-gray-600 mb-2">{user.email}</p>
          <p className="text-gray-600 mb-2">{user.phone}</p>
          <p className="text-gray-600 mb-2">
            isVerified:{user.isVerified ? "true" : "false"}
          </p>
        </div>
      </div>

      <div className="m-4">
        {/* <h2 className="text-2xl font-bold">Followers</h2>
        <p className="text-gray-600">Followed by 500 people</p> */}
        {/* Display followers */}
        <NavLink to="/editpro">
          <button
            style={{ border: "1px solid", marginRight: "5px" }}
            className="py-2 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none undefined"
          >
            {user.userId ? "Edit Profile" : "Add Info"}
          </button>
        </NavLink>
        <NavLink to="/addFarm">
          <button
            style={{ border: "1px solid", marginRight: "5px" }}
            className="py-2 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none undefined"
          >
            add Farm
          </button>
        </NavLink>
        <button
          style={{ color: "red", marginRight: "5px" }}
          onClick={signOutUser}
          className="py-2 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none undefined"
        >
          sign Out
        </button>
      </div>

      {/* make good css here  */}
      <div>
        <p>address:{user.address}</p>
        <p>about:{user.about}</p>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl py-6 lg:max-w-none">
          <h2 className="text-2xl font-bold text-gray-900">Collections</h2>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {cltFarms.length !== 0 &&
              cltFarms.map(
                (callout) =>
                  callout && (
                    <div
                      key={callout.data().name}
                      className="group relative"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        e.preventDefault();
                        SetblogFarm(callout);
                        naviagete("/blog");
                      }}
                    >
                      <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                        <img
                          src={callout.data().images.imageUrl}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <h3 className="mt-6 text-sm text-gray-500">
                        <p>farmer Name: {callout.data().farmerName}</p>
                      </h3>
                      <p className="text-base font-semibold text-gray-900">
                        Customer Name : {callout.data().userName}
                      </p>
                    </div>
                  )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
