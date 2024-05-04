import React, { useState, useEffect } from "react";
import Search from "../../assets/search.png"
import Arrow from "../../assets/arrow-down.png"
//import CountryPage from "./components/CountryPage/CountryPage"

function Country() {
    
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
        <div className="py-[110px]">
            <div className="m-auto px-[90px] justify-between flex relative">
                <div className="flex h-[45px] bg-white shadow-md rounded-lg w-[40%]">
                    <div className="flex items-center p-4 pl-6">
                        <img src={Search} alt="#" className="w-4 h-4"/>
                    </div>
                    <input type="text" id="search_country" className="w-full rounded-lg" placeholder="Search for a country..." />
                </div>

                <div className="flex flex-col bg-white w-[200px] px-6 relative shadow-lg rounded-md">
                    <div className="flex h-[45px] items-center justify-between cursor-pointer" onClick={() => ativarFilter()}>                        <span className="text-[0.9rem] my-auto">Filter by Region </span>
                        <img src={Arrow} alt="#" className="w-6"/>
                    </div>

                    <ul className={`${filter ? "flex" : "hidden"} flex-col absolute bg-white left-0 w-full mt-12 p-4 pl-6 gap-1 shadow-lg rounded-md`}> 
                        <li>Africa</li>
                        <li>America</li>
                        <li>Asia</li>
                        <li>Europe</li>
                        <li>Oceania</li>
                    </ul>
                </div>
            </div>

            <div className="px-[90px] py-[50px] grid grid-cols-4 gap-[3.5rem] lg:grid-cols-3 md:grid-cols-2 md:gap-[2rem] ta:px-[50px] sm:grid-cols-1">
                {api.map((post) => {
                    return (
                        <div key={post.id} className="bg-white shadow-md lg:max-h-[265px] ta:max-h-[220px] sm:max-h-[300px]">
                            <img src={post.flags.png} alt="#" className="bg-cover w-full h-[47%] sm:max-h-[113px]"/>
                            <div className="p-[8%]">
                                <h1 className="text-[1vw] font-extrabold mb-3 mt-1 lg:text-[1.3vw] ta:text-[1.9vw] sm:text-[3.4vw] sm:mt-0">{post.name.common}</h1>
                                
                                <p className="font-bold text-[0.9vw] flex lg:text-[1.2vw] ta:text-[1.7vw] sm:text-[2.7vw]">Population: <span className="font-normal ml-1">{post.population}</span> </p>
                                
                                <p className="font-bold text-[0.9vw] flex lg:text-[1.2vw] ta:text-[1.7vw] sm:text-[2.7vw]">Region: <span className="font-normal ml-1">{post.region}</span> </p>
                                
                                <p className="font-bold text-[0.9vw] flex lg:text-[1.2vw] ta:text-[1.7vw] sm:text-[2.7vw]">Capital: <span className="font-normal ml-1 max-w-[70%] break-words">{post.capital}</span> </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
  
export default Country
  