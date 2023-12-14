import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Farms from "./pages/Farms";
import Farm from "./pages/Farm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile";

const App = () => {
  
  return (
    <>
      <ToastContainer
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/farms" element={<Farms />} />
          <Route path="/farm" element={<Farm />} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
