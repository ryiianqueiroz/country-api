import React, { useState, useEffect } from "react";
import Search from "../../assets/search.png"
import Arrow from "../../assets/arrow-down.png"
//import CountryPage from "./components/CountryPage/CountryPage"

function Country() {
    
    const [api, setApi] = useState([]);

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

    return (
        <div className="py-[110px]">
            <div className="flex m-auto px-[90px] justify-between">
                <div className="flex h-[45px] bg-white w-[300px]">
                    <div className="flex items-center p-4 pl-6">
                        <img src={Search} alt="#" className="w-4 h-4"/>
                    </div>
                    <input type="text" id="search_country" placeholder="Search for a country..." />
                </div>

                <div className="flex flex-col bg-white w-[200px] px-6">
                    <div className="flex h-[45px] items-center justify-between">
                        <span className="text-[0.9rem] my-auto">Filter by Region </span>
                        <img src={Arrow} alt="#" className="w-6"/>
                    </div>

                    <ul className="flex-col hidden"> 
                        <li>Africa</li>
                        <li>America</li>
                        <li>Asia</li>
                        <li>Europe</li>
                        <li>Oceania</li>
                    </ul>
                </div>
            </div>

            <div className="px-[90px] py-[50px] grid grid-cols-4 gap-[3.5rem] lg:grid-cols-3">
                {api.map((post) => {
                    return (
                        <div key={post.id} className="bg-white shadow-md">
                            <img src={post.flags.png} alt="#" className="bg-cover w-full h-[47%]"/>
                            <div className="p-[8%]">
                                <h1 className="text-[1vw] font-extrabold mb-3 mt-1">{post.name.common}</h1>
                                
                                <p className="font-bold text-[0.9vw] flex">Population: <span className="font-normal ml-1">{post.population}</span> </p>
                                
                                <p className="font-bold text-[0.9vw] flex">Region: <span className="font-normal ml-1">{post.region}</span> </p>
                                
                                <p className="font-bold text-[0.9vw] flex">Capital: <span className="font-normal ml-1">{post.capital}</span> </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
  
export default Country
  