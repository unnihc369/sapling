// Login.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = () => {
    // Implement your sign-in logic here
    console.log("Signing in with:", username, password);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-primary">
      <div className="w-full max-w-xs">
        <form className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded bg-gray-800 w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline focus:bg-gray-800"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
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
          &copy;2020 Acme Corp. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
