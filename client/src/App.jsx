import { Outlet } from "react-router-dom"
import Home from "./components/Home"
import Navbar from "./components/Navbar"

function App() {
 
  return (
    <div className="max-w-screen-xl container mx-auto">
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default App
