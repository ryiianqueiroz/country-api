import { useState } from "react"
import Moon from "./assets/moon.png"
import { Outlet } from "react-router-dom"

function App() {
  const [ darkMode, setDarkMode ] = useState(false)

  function setDark() {
    if ( darkMode == true ) {
      setDarkMode(false)
    } else {
      setDarkMode(true)
    }
  }

  return (
    <div className="font-customFont bg-gray-200 min-h-full relative">
      
      <nav className={`${darkMode ? "bg-[#2b3945]" : "bg-gray-200" } flex px-[90px] items-center h-[70px] fixed w-full shadow-md z-[9999] md:px-[7%] sm:px-[30px]`}>
        <h1 className={`${darkMode ? "text-[#e2e2e2]" : "text-black" } font-[900] text-[1.8rem] md:text-[1rem] sm:text-[0.79rem] mob:text-[0.69rem]`}>Where is the world?</h1>
        <div className="flex ml-auto items-center">
          <img src={Moon} alt="#" className={`${darkMode ? "invert-[1]" : ""} w-4 mr-2 cursor-pointer sm:w-3 mob:w-2`} onClick={() => setDark()}/>
          <h3 className={`${darkMode ? "text-white" : "text-black"} sm:text-[0.8rem] sm:my-auto sm:mt-[2px] mob:text-[0.69rem]`}>Dark Mode</h3>
        </div>
      </nav>

      <Outlet context={{ darkMode }} />

    </div>
  )
}

export default App
