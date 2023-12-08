import { BrowserRouter,Route,Routes } from "react-router-dom"
import Home from "./Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Farms from "./pages/Farms"
import Farm from "./pages/Farm";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/farms" element={<Farms />} />
        <Route path="/farm" element={<Farm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
