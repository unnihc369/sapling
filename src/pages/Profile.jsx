// src/components/Profile.js
import React, { useEffect, useState } from "react";
import { UserState } from "../context/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { ToastError, ToastSuccess } from "../utility/Toasts";
import { collection, getDocs, query, where } from "firebase/firestore";
import Header from "../components/Header";
import Footer from "../components/Footer"

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
    <>
      <Header />
      <div className="container mx-auto mt-32">
        <div className="flex flex-col items-center justify-center lg:flex-row">
          <div className="mb-4 lg:mb-0 lg:mr-8 bg-gray-200 p-1 rounded-full overflow-hidden">
            <img
              src={user.photoUrl}
              alt="Profile"
              className="rounded-full h-28 w-28 object-cover border-2 border-white"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-gray-600 mb-2">{user.email}</p>
            <p className="text-gray-600 mb-2">{user.phone}</p>
          </div>
        </div>

        <div className="flex space-x-4">
          <NavLink to="/editpro">
            <button className="btn-primary bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring focus:border-blue-300">
              {user.userId ? "Edit Profile" : "Add Info"}
            </button>
          </NavLink>
          <NavLink to="/addFarm">
            <button className="btn-primary bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring focus:border-green-300">
              Add Farm
            </button>
          </NavLink>
          <button
            className="btn-danger bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring focus:border-red-300"
            onClick={signOutUser}
          >
            Sign Out
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
      <div className="bg-gray-500 p-6">
        <Footer />
      </div>
    </>
  );
};

export default Profile;
