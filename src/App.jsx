import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Farms from "./pages/Farms";
import Farm from "./pages/Farm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import FarmDetails from "./pages/FarmDetails";
import PaymentPage from "./pages/PaymentPage";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog";

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
          <Route path="/profile" element={<Profile />} />
          <Route path="/editpro" element={<EditProfile />} />
          <Route path="/addfarm" element={<FarmDetails />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
