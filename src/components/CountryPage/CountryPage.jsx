import { useState, useEffect } from "react";
import { useLocation, Link } from 'react-router-dom';
import ArrowBack from "../../assets/arrow-back.svg"
import { useOutletContext } from 'react-router-dom';

function CountryPage() {
    
    const { darkMode } = useOutletContext();
    const [api, setApi] = useState([]);

    let location = useLocation();
    let ccn3 = location.pathname.replaceAll("/", "")

    let { nome, flag, population, region, sub_region, capital, top_level_domain } = ""
    let { native_name, nativo } = ""
    let { currencies, currencies_sub } = ""
    let { languages , languages_sub } = ""

    const [ borders, setBorders ] = useState([])

    useEffect(() => {
        async function fetchApi() {
          const response = await fetch(`https://restcountries.com/v3.1/alpha/${ccn3}`);
          const data = await response.json();
          console.log(data);

          if ( Array.isArray(data[0].borders) ) {
            setBorders(data[0].borders)
          } else {
            setBorders([])
          }

          setApi(data)
        }
      
        fetchApi();
    }, [])

    api.map((post) => {
        nome = post.name.common
        population = post.population
        region = post.region
        sub_region = post.subregion
        capital = post.capital
        top_level_domain = post.tld[0]
        flag = post.flags.png
        

        Object.keys(post.name.nativeName).forEach(function(prop) {
          nativo = prop
        });

        Object.keys(post.currencies).forEach(function(prop) {
          currencies_sub = prop
        });

        Object.keys(post.languages).forEach(function(prop) {
          languages_sub = prop
        });

        native_name = post.name.nativeName[`${nativo}`].common
        currencies = post.currencies[`${currencies_sub}`].symbol
        languages = post.languages[`${languages_sub}`]
    })

    return (
        <div className={`${darkMode ? "bg-[#202c37]" : "" } min-h-[100vh] py-[100px]`}>
          <Link to="/"><button className={`${darkMode ? "bg-[#2b3945] text-white" : "" } text-[0.9rem] flex px-8 py-1 rounded-sm shadow-[0_0px_3px_1px_rgba(0,0,0,0.3)] shadow-black items-center cursor-pointer ml-[90px]`}><img src={ArrowBack} alt="#" className={`${ darkMode ? "invert-[1]" : "" } w-4 mr-1`}/> Back</button></Link>

          <div className="flex m-auto px-[90px] justify-between py-[40px]">
            <div className="w-[44%]">
              <img src={flag} alt="#" className="w-full"/>
            </div>

            <div className="w-[44%] py-[40px]">
              <h1 className={`${ darkMode ? "text-white" : "" } text-[1.5rem] font-bold`}>{nome}</h1>

              <div className="grid grid-cols-2 mt-2">
                <div className="flex flex-col gap-1">
                  <h1 className={`${ darkMode ? "text-[#dadada]" : "" }`}>Native Name: <span className={`${ darkMode ? "text-[#dadadab9]" : "" }`}>{native_name}</span></h1>
                  <h1 className={`${ darkMode ? "text-[#dadada]" : "" }`}>Population: <span className={`${ darkMode ? "text-[#dadadab9]" : "" }`}>{population}</span></h1>
                  <h1 className={`${ darkMode ? "text-[#dadada]" : "" }`}>Region: <span className={`${ darkMode ? "text-[#dadadab9]" : "" }`}>{region}</span></h1>
                  <h1 className={`${ darkMode ? "text-[#dadada]" : "" }`}>Sub Region: <span className={`${ darkMode ? "text-[#dadadab9]" : "" }`}>{sub_region}</span></h1>
                  <h1 className={`${ darkMode ? "text-[#dadada]" : "" }`}>Capital: <span className={`${ darkMode ? "text-[#dadadab9]" : "" }`}>{capital}</span></h1>
                </div>
                
                <div className="flex flex-col gap-1">
                  <h1 className={`${ darkMode ? "text-[#dadada]" : "" }`}>Top Level Domain: <span className={`${ darkMode ? "text-[#dadadab9]" : "" }`}>{top_level_domain}</span></h1>
                  <h1 className={`${ darkMode ? "text-[#dadada]" : "" }`}>Currencies: <span className={`${ darkMode ? "text-[#dadadab9]" : "" }`}>{currencies}</span></h1>
                  <h1 className={`${ darkMode ? "text-[#dadada]" : "" }`}>Languages: <span className={`${ darkMode ? "text-[#dadadab9]" : "" }`}>{languages}</span></h1>
                </div>
              </div>

              { borders.length > 0 ? (
                <div className={`${ darkMode ? "text-white" : "" } py-[50px]`}> Borders Countries: 
                  { borders.map((item, index) => (
                    <button className={`${ darkMode ? "text-[#dadada] bg-[#2b3945] shadow-[#00000080]" : "bg-[#fafafa] shadow-[#b4b4b4]" } mb-2 shadow-[0_0px_3px_1px_rgba(0,0,0,0.3)] mr-2 px-8 py-1 cursor-pointer`} key={index}>{item}</button>
                  )) }
                </div>
              ) : ( <p></p> ) }
            </div>
          </div>
        </div>
    )
}
  
export default CountryPage
  