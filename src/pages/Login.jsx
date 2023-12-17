// Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastError, ToastSuccess } from "../utility/Toasts";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleUsernameChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      ToastError("Please provide all documents");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      ToastSuccess("SignUp successfully");
      navigate("/");
      window.location.reload();

    } catch (error) {
      if (error.code === "auth/user-not-found") {
        ToastError("There is no user with this email ");
      } else if (error.code === "auth/invalid-email") {
        ToastError("Invalid Email");
      } else if (error.code === "auth/wrong-password") {
        ToastError("Wrong password");
      } else if (error.code === "auth/invalid-credential") {
        ToastError("invalid-credential");
      } else {
        ToastError(" something went  Wrong,Please try again later ");

        console.log(error.code, "login");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-screen bg-primary">
        <div className="w-full max-w-xs">
          <form className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="username"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded bg-gray-800 w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline focus:bg-gray-800"
                id="username"
                type="text"
                placeholder="registed email"
                value={email}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none bg-gray-800 focus:shadow-outline focus:bg-gray-800"
                id="password"
                type="password"
                placeholder="******************"
                value={password}
                onChange={handlePasswordChange}
              />
              <p className="text-red-500 text-xs italic">
                Please choose a password.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSignIn}
              >
                Sign In
              </button>
            </div>
            <div className="mt-4">
              <Link to="/signup" className="text-white">
                <span className="py-4">Already have an account?</span>
              </Link>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy;2023 sapling . All rights reserved.
          </p>
        </div>
      </div>
      <div className="bg-gray-500 p-6">
        <Footer />
      </div>
    </>
  );
};

export default Login;
