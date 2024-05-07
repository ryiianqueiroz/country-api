import Moon from "../../assets/moon.png"

function Nav() {
    return (
      <nav className="flex bg-white px-[90px] items-center h-[80px] fixed w-full shadow-md z-[9999]
                      ta:px-[50px]
                      sm:px-[15px]">
        <h1 className="font-[900] text-[1.8rem] 
                       md:text-[1rem]
                       mob:text-[0.8rem]">Where is the world?</h1>

        <div className="flex ml-auto items-center">
          <img src={Moon} alt="#" className="w-4 mr-2
                                             sm:w-3"/>
          <h3 className="sm:text-[0.8rem] sm:my-auto sm:mt-[2px]
                         mob:text-[0.7rem]">Dark Mode</h3>
        </div>
      </nav>
    )
  }
  
  export default Nav
  