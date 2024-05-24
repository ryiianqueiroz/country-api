import { useState, useEffect } from "react";
import { useLocation, Link } from 'react-router-dom';
import ArrowBack from "../../assets/arrow-back.svg"
import { useOutletContext } from 'react-router-dom';

function CountryPage() {
    
    const { darkMode } = useOutletContext();
    const [api, setApi] = useState([]);
    const [ borders, setBorders ] = useState([])

    let location = useLocation();
    let ccn3 = location.pathname.replaceAll("/", "")

    let { nome, flag, population, region, sub_region, capital, top_level_domain } = ""
    let { native_name, nativo } = ""
    let { currencies, currencies_sub } = ""
    let { languages , languages_sub } = ""


    useEffect(() => {
      async function fetchApi(code) {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        const data = await response.json();
        console.log(data);

        if (Array.isArray(data[0].borders)) {
          const borderPromises = data[0].borders.map(async (borderCode) => {
            const borderResponse = await fetch(`https://restcountries.com/v3.1/alpha/${borderCode}`);
            const borderData = await borderResponse.json();
            return borderData[0].name.common;
          });
  
          const bordersNames = await Promise.all(borderPromises);
          setBorders(bordersNames);
        } else {
          setBorders([]);
        }

        setApi(data)
      }
    
      fetchApi(ccn3);
    }, [ccn3])

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
          <Link to="/"><button className={`${darkMode ? "bg-[#2b3945] text-white" : "" } text-[0.9rem] mb-[5%] flex px-8 py-1 rounded-sm shadow-[0_0px_3px_1px_rgba(0,0,0,0.3)] shadow-[#00000052] items-center cursor-pointer ml-[90px]`}><img src={ArrowBack} alt="#" className={`${ darkMode ? "invert-[1]" : "" } w-4 mr-1`}/> Back</button></Link>

          <div className="flex m-auto px-[90px] justify-between min-h-[300px]">
            <div className="w-[44%] my-auto lg:w-[46%]">
              <img src={flag} alt="#" className="w-full h-full mt-[-20px]"/>
            </div>

            <div className="w-[44%] flex flex-col justify-center lg:w-[46%]">
              <h1 className={`${ darkMode ? "text-white" : "" } text-[1.3rem] font-bold lg:text-[1rem]`}>{nome}</h1>

              <div className="grid grid-cols-2 mt-2">
                <div className="flex flex-col gap-1">
                  <h1 className={`${ darkMode ? "text-[#dadada]" : "" } text-[0.9rem] lg:text-[0.7rem]`}>Native Name: <span className={`${ darkMode ? "text-[#dadadab9]" : "" } text-[0.8rem] lg:text-[0.7rem]`}>{native_name}</span></h1>
                  <h1 className={`${ darkMode ? "text-[#dadada]" : "" } text-[0.9rem] lg:text-[0.7rem]`}>Population: <span className={`${ darkMode ? "text-[#dadadab9]" : "" } text-[0.8rem] lg:text-[0.7rem]`}>{population}</span></h1>
                  <h1 className={`${ darkMode ? "text-[#dadada]" : "" } text-[0.9rem] lg:text-[0.7rem]`}>Region: <span className={`${ darkMode ? "text-[#dadadab9]" : "" } text-[0.8rem] lg:text-[0.7rem]`}>{region}</span></h1>
                  <h1 className={`${ darkMode ? "text-[#dadada]" : "" } text-[0.9rem] lg:text-[0.7rem]`}>Sub Region: <span className={`${ darkMode ? "text-[#dadadab9]" : "" } text-[0.8rem] lg:text-[0.7rem]`}>{sub_region}</span></h1>
                  <h1 className={`${ darkMode ? "text-[#dadada]" : "" } text-[0.9rem] lg:text-[0.7rem]`}>Capital: <span className={`${ darkMode ? "text-[#dadadab9]" : "" } text-[0.8rem] lg:text-[0.7rem]`}>{capital}</span></h1>
                </div>
                
                <div className="flex flex-col gap-1">
                  <h1 className={`${ darkMode ? "text-[#dadada]" : "" } text-[0.9rem] lg:text-[0.7rem]`}>Top Level Domain: <span className={`${ darkMode ? "text-[#dadadab9]" : "" } text-[0.8rem] lg:text-[0.7rem]`}>{top_level_domain}</span></h1>
                  <h1 className={`${ darkMode ? "text-[#dadada]" : "" } text-[0.9rem] lg:text-[0.7rem]`}>Currencies: <span className={`${ darkMode ? "text-[#dadadab9]" : "" } text-[0.8rem] lg:text-[0.7rem]`}>{currencies}</span></h1>
                  <h1 className={`${ darkMode ? "text-[#dadada]" : "" } text-[0.9rem] lg:text-[0.7rem]`}>Languages: <span className={`${ darkMode ? "text-[#dadadab9]" : "" } text-[0.8rem] lg:text-[0.7rem]`}>{languages}</span></h1>
                </div>
              </div>

              { borders.length > 0 ? (
                <div className={`${ darkMode ? "text-white" : "" } py-[30px] grid grid-cols-3 items-center`}> <span className="my-auto mr-1 flex lg:min-h-[30px] lg:max-h-[30px] lg:mb-2 lg:items-center lg:justify-start lg:text-[0.54rem]">Borders Countries: </span>
                  { borders.map((item, index) => (
                    <button className={`${ darkMode ? "text-[#dadada] bg-[#2b3945] shadow-[#00000080]" : "bg-[#fafafa] shadow-[#b4b4b4]" } mb-2 shadow-[0_0px_3px_1px_rgba(0,0,0,0.3)] min-h-[35px] mr-3 text-[0.8rem] lg:min-h-[30px] lg:max-h-[30px] lg:mb-2 lg:my-auto lg:text-[0.7rem]`} key={index}>{item}</button>
                  )) }
                </div>
              ) : ( <p></p> ) }
            </div>
          </div>
        </div>
    )
}
  
export default CountryPage
  