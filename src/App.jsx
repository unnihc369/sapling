import { BrowserRouter,Route,Routes } from "react-router-dom"
import Home from "./Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} exact/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
