import Moon from "../../assets/moon.png"

function Nav() {
    return (
      <nav className="flex bg-white px-[90px] items-center h-[80px] fixed w-full shadow-md ta:px-[50px]">
        <h1 className="font-[900] text-[1.8rem] md:text-[1rem]">Where is the world?</h1>

        <div className="flex ml-auto items-center">
          <img src={Moon} alt="#" className="w-4 mr-2"/>
          <h3>Dark Mode</h3>
        </div>
      </nav>
    )
  }
  
  export default Nav
  