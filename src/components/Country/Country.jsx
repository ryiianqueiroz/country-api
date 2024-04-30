import React, { useState, useEffect } from "react";
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
        <div className="px-[90px] py-[150px] grid grid-cols-4 gap-[3.5rem] bg-gray-200">
            {api.map((post) => {
                return (
                    <div key={post.id} className="bg-white">
                        <img src={post.flags.png} alt="#" className="bg-cover w-full h-[45%]"/>
                        <div className="p-[8%]">
                            <h1 className="text-[0.8rem] font-bold mb-3 mt-1">{post.name.common}</h1>
                            
                            <p className="font-medium text-[0.7rem] flex">Population: <span className="font-normal ml-1">{post.population}</span> </p>
                            
                            <p className="font-medium text-[0.7rem] flex">Region: <span className="font-normal ml-1">{post.region}</span> </p>
                            
                            <p className="font-medium text-[0.7rem] flex">Capital: <span className="font-normal ml-1">{post.capital}</span> </p>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}
  
export default Country
  