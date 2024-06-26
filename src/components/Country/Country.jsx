/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Search from "../../assets/search.png"
import Arrow from "../../assets/arrow-down.png"
import { Link } from "react-router-dom";
import GIF from "../../assets/loading-gif.gif"
import { useOutletContext } from 'react-router-dom';

function Country() {
    const { darkMode } = useOutletContext();
    const [ api, setApi ] = useState([]);
    const [ filter, setFilter ] = useState(false)
    const [ loading, setLoading ] = useState(true);
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [query, setQuery] = useState('');

    const [ countryRegion, setCountryRegion ] = useState("")

    useEffect(() => {
        const baseUrl = process.env.NODE_ENV === 'production' ? '/country-api' : '';
        fetch(`${baseUrl}/data.json`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setApi(data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        setFilteredCountries(
          api.filter(country =>
            country.name.toLowerCase().startsWith(query.toLowerCase())
          )
        );
    }, [query, api]);

    useEffect(() => {
        setFilteredCountries(
            api.filter((country) => {
                if ( countryRegion == "All" ) {
                    return country
                } else if ( countryRegion != "") {
                    return country.region == countryRegion
                } else {
                    return country
                }
            })
        )
    }, [countryRegion, api])

    const ativarFilter = () => {
        if ( filter == false ) {
            setFilter(true)
        } else {
            setFilter(false)
        }
    }

    if ( loading ) {
        return <div className="min-h-[100vh] flex items-center justify-center">
                  <img src={GIF} alt="#" className="w-10" />
               </div>
    }

    return (
        <>
            { api ? (
                <div className={`${darkMode ? "bg-[#202c37]" : "" } py-[110px]`}>
                    <div className="m-auto px-[90px] justify-between flex relative ta:px-[50px] sm:flex-col sm:px-[40px] mob:px-[25px]">           
                        <div className={`${darkMode ? "bg-[#2b3945]" : "bg-white"} flex h-[45px] shadow-md rounded-lg w-[45%] ta:h-[40px] ta:w-[47%] sm:h-[35px] sm:items-center sm:w-full`}>
                            <div className="flex items-center p-4 pl-6 ta:pl-4">
                                <img src={Search} alt="#" className={`${darkMode ? "invert-[1]" : ""} w-4 h-4 md:w-3 md:h-3 md:m-auto ta:mt-[-1px] ta:w-3 ta:h-[10px]`}/>
                            </div>
                            
                            <input type="text" 
                                id="search_country"
                                value={query}
                                onChange={e => setQuery(e.target.value)} 
                                className={`${darkMode ? "bg-[#2b3945] placeholder:text-white focus:text-white" : "bg-white"} w-full rounded-lg pl-2 text-[0.8rem] relative focus:outline-none lg:placeholder:text-[0.8rem] md:placeholder:text-[0.7rem] md:placeholder:absolute md:placeholder:top-[15px] md:text-[0.7rem] ta:placeholder:top-[13.5px] ta:placeholder:text-[0.55rem] ta:pl-0 ta:ml-[-5px] sm:placeholder:mt-[-12px] mob:placeholder:text-[0.5rem] mob:placeholder:top-[15px]`}
                                placeholder="Search for a country..." />
                        </div>

                        <div className={`${darkMode ? "bg-[#2b3945]" : "bg-white"} flex flex-col cursor-pointer w-[200px] px-6 relative shadow-lg rounded-md z-1 ta:w-[140px] sm:w-[60%] sm:mt-3`}  onClick={() => ativarFilter()}>
                            <div className="flex h-[45px] items-center justify-between ta:h-[40px] sm:h-[35px]">                       
                                <span className={`${darkMode ? "text-white" : "text-black"} text-[0.9rem] my-auto md:text-[0.7rem] ta:text-[0.6rem] ta:my-auto sm:ml-[-5px]`}>Filter by Region</span>
                                <img src={Arrow} alt="#" className={`${ darkMode ? "invert-[1]" : "" } w-6 relative md:absolute md:w-4 md:right-5 md:top-[14px] ta:top-[13px] ta:w-[14px] sm:right-3 sm:top-[10px]`}/>
                            </div>

                            <ul className={`${filter ? "flex" : "hidden"} ${darkMode ? "bg-[#2b3945]" : "bg-white"} flex-col absolute left-0 w-full mt-12 p-4 pl-6 gap-1 shadow-lg rounded-md ta:text-[0.8rem] sm:text-[0.7rem] sm:w-[110px]`}> 
                                <li onClick={() => setCountryRegion("All")} className={`${darkMode ? "text-white" : "text-black"}`}>All</li>
                                <li onClick={() => setCountryRegion("Africa")} className={`${darkMode ? "text-white" : "text-black"}`}>Africa</li>
                                <li onClick={() => setCountryRegion("Americas")} className={`${darkMode ? "text-white" : "text-black"}`}>Americas</li>
                                <li onClick={() => setCountryRegion("Asia")} className={`${darkMode ? "text-white" : "text-black"}`}>Asia</li>
                                <li onClick={() => setCountryRegion("Europe")} className={`${darkMode ? "text-white" : "text-black"}`}>Europe</li>
                                <li onClick={() => setCountryRegion("Oceania")} className={`${darkMode ? "text-white" : "text-black"}`}>Oceania</li>
                            </ul>
                        </div>
                        
                    </div>

                    <div className="px-[90px] py-[50px] grid grid-cols-4 gap-[3.5rem] lg:grid-cols-3 md:grid-cols-2 md:gap-[2rem] ta:px-[50px] sm:grid-cols-1 sm:py-[30px] sm:px-[40px] mob:px-[25px]">
                        { filteredCountries.length != 0 ? (
                            filteredCountries.map((post) => {
                                return (
                                    <div key={post.numericCode} className={`${darkMode ? "bg-[#2b3945]" : "bg-white"} shadow-md lg:max-h-[265px] ta:max-h-[220px] sm:max-h-[300px]`}>
                                        <Link to={`/country-api/${post.numericCode}`}><img src={post.flags.png} alt="#" className="bg-cover w-full h-[47%] sm:max-h-[155px]"/></Link>
                                        <div className="p-[8%]">
                                            <h1 className={`${darkMode ? "text-white" : "text-black" } text-[1vw] font-extrabold mb-3 mt-1 lg:text-[1.3vw] md:text-[2vw] ta:text-[1.9vw] sm:text-[3.4vw] sm:mt-0`}>{post.name}</h1>
                                            
                                            <p className={`${darkMode ? "text-white" : "text-black" } font-bold text-[0.9vw] flex lg:text-[1.2vw] md:text-[1.6vw] ta:text-[1.7vw] sm:text-[2.7vw]`}>
                                                Population: <span className="font-normal ml-1">{post.population}</span> </p>
                                            
                                            <p className={`${darkMode ? "text-white" : "text-black" } font-bold text-[0.9vw] flex lg:text-[1.2vw] md:text-[1.6vw] ta:text-[1.7vw] sm:text-[2.7vw]`}>
                                                Region: <span className="font-normal ml-1">{post.region}</span> </p>
                                            
                                            <p className={`${darkMode ? "text-white" : "text-black" } font-bold text-[0.9vw] flex lg:text-[1.2vw] md:text-[1.6vw] ta:text-[1.7vw] sm:text-[2.7vw]`}>
                                                Capital: <span className="font-normal ml-1 max-w-[70%] break-words">{post.capital}</span> </p>                            </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="w-full min-h-[40vh] justify-center items-center flex">
                                <h1 className="text-gray-500 text-[2vw]">no matches found...</h1>
                            </div>
                        ) }
                    </div>
                </div>
            ) : (
                <div className="text-[1rem] m-auto">{`Error :(`}</div>
            )
            }
        </>
    )
}
  
export default Country
  