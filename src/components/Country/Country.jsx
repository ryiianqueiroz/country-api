/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Search from "../../assets/search.png"
import Arrow from "../../assets/arrow-down.png"
import { Link } from "react-router-dom";
import { useOutletContext } from 'react-router-dom';

function Country() {
    const { darkMode } = useOutletContext();
    const [ api, setApi ] = useState([]);
    const [ filter, setFilter ] = useState(false)

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setApi(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const ativarFilter = () => {
        if ( filter == false ) {
            setFilter(true)
        } else {
            setFilter(false)
        }
    }

    return (
        <div className={`${darkMode ? "bg-[#202c37]" : "" } py-[110px]`}>
            <div className="m-auto px-[90px] justify-between flex relative
                            ta:px-[50px]
                            sm:flex-col sm:px-[20px]">           
                <div className={`${darkMode ? "bg-[#2b3945]" : "bg-white"} flex h-[45px] shadow-md rounded-lg w-[45%]
                                ta:h-[40px] ta:w-[47%]
                                sm:w-full`}>
                    <div className="flex items-center p-4 pl-6
                                    ta:pl-4">
                        <img src={Search} alt="#" className={`${darkMode ? "invert-[1]" : ""} w-4 h-4
                                                             md:w-3 md:h-3 md:m-auto
                                                             ta:mt-[-1px] ta:w-3 ta:h-[10px]`}/>
                    </div>
                    <input type="text" id="search_country" 
                        className={`${darkMode ? "bg-[#2b3945] placeholder:text-white focus:text-white" : "bg-white"} w-full rounded-lg pl-2 text-[0.8rem] relative
                                   focus:outline-none
                                   lg:placeholder:text-[0.8rem]
                                   md:placeholder:text-[0.7rem] md:placeholder:absolute md:placeholder:top-[15px] md:text-[0.7rem]
                                   ta:placeholder:top-[13.5px] ta:placeholder:text-[0.55rem] ta:pl-0 ta:ml-[-5px]
                                   mob:placeholder:text-[0.5rem] mob:placeholder:top-[15px]`}
                        placeholder="Search for a country..." />
                </div>

                <div className={`${darkMode ? "bg-[#2b3945]" : "bg-white"} flex flex-col cursor-pointer w-[200px] px-6 relative shadow-lg rounded-md z-1
                                ta:w-[140px]
                                sm:w-[60%] sm:mt-3 sm:px-3`}  onClick={() => ativarFilter()}>
                    <div className="flex h-[45px] items-center justify-between
                                    ta:h-[40px]">                       
                        <span className={`${darkMode ? "text-white" : "text-black"} text-[0.9rem] my-auto
                                         md:text-[0.7rem]
                                         ta:text-[0.6rem] ta:my-auto`}>Filter by Region</span>
                        <img src={Arrow} alt="#" className={`${ darkMode ? "invert-[1]" : "" } w-6 relative
                                                            md:absolute md:w-4 md:right-5 md:top-[14px]
                                                            ta:top-[13px] ta:w-[14px]
                                                            sm:right-3`}/>
                    </div>

                    <ul className={`${filter ? "flex" : "hidden"} ${darkMode ? "bg-[#2b3945]" : "bg-white"} flex-col absolute left-0 w-full mt-12 p-4 pl-6 gap-1 shadow-lg rounded-md`}> 
                        <li className={`${darkMode ? "text-white" : "text-black"}`}>Africa</li>
                        <li className={`${darkMode ? "text-white" : "text-black"}`}>America</li>
                        <li className={`${darkMode ? "text-white" : "text-black"}`}>Asia</li>
                        <li className={`${darkMode ? "text-white" : "text-black"}`}>Europe</li>
                        <li className={`${darkMode ? "text-white" : "text-black"}`}>Oceania</li>
                    </ul>
                </div>
                
            </div>

            <div className="px-[90px] py-[50px] grid grid-cols-4 gap-[3.5rem] 
                            lg:grid-cols-3 
                            md:grid-cols-2 md:gap-[2rem] 
                            ta:px-[50px] 
                            sm:grid-cols-1 sm:py-[30px]">
                {api.map((post) => {
                    return (
                        <div key={post.id} className={`${darkMode ? "bg-[#2b3945]" : "bg-white"} shadow-md 
                                                     lg:max-h-[265px] ta:max-h-[220px] sm:max-h-[300px]`}>
                            <Link to={`/${post.ccn3}`}><img src={post.flags.png} alt="#" className="bg-cover w-full h-[47%] 
                                                                                                    sm:max-h-[113px]"/></Link>
                            <div className="p-[8%]">
                                <h1 className={`${darkMode ? "text-white" : "text-black" } text-[1vw] font-extrabold mb-3 mt-1 
                                               lg:text-[1.3vw] 
                                               ta:text-[1.9vw] 
                                               sm:text-[3.4vw] sm:mt-0`}>{post.name.common}</h1>
                                
                                <p className={`${darkMode ? "text-white" : "text-black" } font-bold text-[0.9vw] flex 
                                              lg:text-[1.2vw] 
                                              ta:text-[1.7vw] 
                                              sm:text-[2.7vw]`}>Population: <span className="font-normal ml-1">{post.population}</span> </p>
                                
                                <p className={`${darkMode ? "text-white" : "text-black" } font-bold text-[0.9vw] flex 
                                              lg:text-[1.2vw] 
                                              ta:text-[1.7vw] 
                                              sm:text-[2.7vw]`}>Region: <span className="font-normal ml-1">{post.region}</span> </p>
                                
                                <p className={`${darkMode ? "text-white" : "text-black" } font-bold text-[0.9vw] flex 
                                              lg:text-[1.2vw] 
                                              ta:text-[1.7vw] 
                                              sm:text-[2.7vw]`}>Capital: <span className="font-normal ml-1 max-w-[70%] break-words">{post.capital}</span> </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
  
export default Country
  