import { useState, useEffect } from "react";
import { useLocation, Link } from 'react-router-dom';
import ArrowBack from "../../assets/arrow-back.svg"
import GIF from "../../assets/loading-gif.gif"
import { useOutletContext } from 'react-router-dom';

function CountryPage() {

  const { darkMode } = useOutletContext();
  const [api, setApi] = useState([]);
  const [borders, setBorders] = useState([])
  const [loading, setLoading] = useState(true);

  let location = useLocation();
  let ccn3 = location.pathname.replaceAll("/country-api/", "")

  let { nome, flag, currencies, currencies_sub, languages } = ""
  let top_level_domain = []

  useEffect(() => {
    async function fetchApi(code) {
      fetch('/public/data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Não foi possivel puxar dados');
        }
        return response.json();
      })
      .then(data => {
        const indexPosition = ( dados ) => { if ( dados.numericCode === code ) { return true } }

        const index = data.findIndex( indexPosition )
        setApi([data[index]])
        setLoading(false)
      })
      .catch((error) => {
        console.error('Erro:', error)
        setLoading(false);
      });
    }

    fetchApi(ccn3)
  }, [ccn3])

  useEffect(() => {
    async function fetchBorders() {
      api.map( async (post) => {
        if (Array.isArray(post.borders)) {
          const borderPromises = post.borders.map( async (borderCode) => {
            const borderResponse = await fetch("/data.json");
            const borderData = await borderResponse.json();

            const indexPosition = ( dados ) => { if ( dados.alpha3Code === borderCode ) { return true } }

            const index = borderData.findIndex( indexPosition )
            let result = borderData[index].name.replace(/\s*\(.*?\)\s*/g, ''); 
            return result
          });

          const bordersNames = await Promise.all(borderPromises);
          console.log(bordersNames)
          setBorders(bordersNames);
        } else {
          setBorders([]);
        }
      })
    }

    fetchBorders()
  }, [api])

  api.map(post => {
    nome = post.name
    flag = post.flags.png

    Object.keys(post.currencies).forEach(function (prop) {
      currencies_sub = prop
    });

    top_level_domain = post.topLevelDomain
    currencies = post.currencies[`${currencies_sub}`].symbol
    languages = post.languages[0].name
  })

  if ( loading ) {
    return <div className="min-h-[100vh] flex items-center justify-center">
              <img src={GIF} alt="#" className="w-10" />
           </div>
  }

  return (
    <>
      { api ? (
        <div className={`${darkMode ? "bg-[#202c37]" : ""} min-h-[100vh] py-[100px]`}>
          <Link to="/country-api"><button className={`${darkMode ? "bg-[#2b3945] text-white" : ""} text-[0.9rem] mb-[5%] flex px-8 py-1 rounded-sm shadow-[0_0px_3px_1px_rgba(0,0,0,0.3)] shadow-[#00000052] items-center cursor-pointer ml-[90px] md:ml-[7%] sm:text-[0.7rem] sm:px-5`}><img src={ArrowBack} alt="#" className={`${darkMode ? "invert-[1]" : ""} w-4 mr-1`} /> Back</button></Link>
    
          <div className="flex m-auto px-[90px] justify-between min-h-[300px] md:flex-col md:px-[7%]">
            <div className="w-[44%] my-auto lg:w-[44%] md:w-full md:mt-[30px]">
              <img src={flag} alt="#" className="w-full h-full mt-[-20px]" />
            </div>
    
            <div className="w-[44%] flex flex-col justify-center lg:w-[49%] md:w-full md:mt-[20px]">
              <h1 className={`${darkMode ? "text-white" : ""} text-[1.3rem] font-bold lg:text-[1rem] md:text-[1.4rem]`}>{nome}</h1>
              
              {api.map((post) => (
                <div key={post.numericCode} className="grid grid-cols-2 mt-2 gap-1 md:gap-4 sm:grid-cols-1 sm:gap-[4px] sm:mt-5">
                  <div className="flex flex-col gap-1">
                    <h1 className={`${darkMode ? "text-[#dadada]" : ""} text-[0.9rem] lg:text-[0.7rem] font-bold sm:text-[0.9rem]`}>Native Name: <span className={`${darkMode ? "text-[#dadadab9]" : ""} text-[0.8rem] lg:text-[0.7rem] font-normal sm:text-[0.9rem]`}>{post.name}</span></h1>
                    <h1 className={`${darkMode ? "text-[#dadada]" : ""} text-[0.9rem] lg:text-[0.7rem] font-bold sm:text-[0.9rem]`}>Population: <span className={`${darkMode ? "text-[#dadadab9]" : ""} text-[0.8rem] lg:text-[0.7rem] font-normal sm:text-[0.9rem]`}>{post.population}</span></h1>
                    <h1 className={`${darkMode ? "text-[#dadada]" : ""} text-[0.9rem] lg:text-[0.7rem] font-bold sm:text-[0.9rem]`}>Region: <span className={`${darkMode ? "text-[#dadadab9]" : ""} text-[0.8rem] lg:text-[0.7rem] font-normal sm:text-[0.9rem]`}>{post.region}</span></h1>
                    <h1 className={`${darkMode ? "text-[#dadada]" : ""} text-[0.9rem] lg:text-[0.7rem] font-bold sm:text-[0.9rem]`}>Sub Region: <span className={`${darkMode ? "text-[#dadadab9]" : ""} text-[0.8rem] lg:text-[0.7rem] font-normal sm:text-[0.9rem]`}>{post.subregion}</span></h1>
                    <h1 className={`${darkMode ? "text-[#dadada]" : ""} text-[0.9rem] lg:text-[0.7rem] font-bold sm:text-[0.9rem]`}>Capital: <span className={`${darkMode ? "text-[#dadadab9]" : ""} text-[0.8rem] lg:text-[0.7rem] font-normal sm:text-[0.9rem]`}>{post.capital}</span></h1>
                  </div>
    
                  <div className="flex flex-col gap-1">
                    <h1 className={`${darkMode ? "text-[#dadada]" : ""} text-[0.9rem] lg:text-[0.7rem] font-bold sm:text-[0.9rem]`}>Top Level Domain: <span className={`${darkMode ? "text-[#dadadab9]" : ""} text-[0.8rem] lg:text-[0.7rem] font-normal sm:text-[0.9rem]`}>{top_level_domain}</span></h1>
                    <h1 className={`${darkMode ? "text-[#dadada]" : ""} text-[0.9rem] lg:text-[0.7rem] font-bold sm:text-[0.9rem]`}>Currencies: <span className={`${darkMode ? "text-[#dadadab9]" : ""} text-[0.8rem] lg:text-[0.7rem] font-normal sm:text-[0.9rem]`}>{currencies}</span></h1>
                    <h1 className={`${darkMode ? "text-[#dadada]" : ""} text-[0.9rem] lg:text-[0.7rem] font-bold sm:text-[0.9rem]`}>Languages: <span className={`${darkMode ? "text-[#dadadab9]" : ""} text-[0.8rem] lg:text-[0.7rem] font-normal sm:text-[0.9rem]`}>{languages}</span></h1>
                  </div>
                </div>
              ))}
    
              {borders.length > 0 ? (
                <div className={`${darkMode ? "text-white" : ""} mt-4 flex flex-col sm:flex-col`}>
                  <span className="hidden mr-3 text-[0.9rem] font-bold lg:text-[0.7rem] lg:text-nowrap sm:flex sm:text-[0.95rem] sm:mb-5">Borders Countries: </span>
                  <div className="grid grid-cols-3 gap-x-2 gap-y-3 items-center md:grid-cols-[repeat(auto-fill,_minmax(100px,_1fr))] sm:gap-x-1 sm:w-full mob:grid-cols-2">
                    <span className="mr-3 text-[0.8rem] font-bold lg:text-[1.3vw] lg:text-nowrap md:text-[0.7rem] sm:hidden">Borders Countries: </span>              
                    {borders.map((item, index) => (
                      <button className={`${darkMode ? "text-[#dadada] bg-[#2b3945] shadow-[#00000080]" : "bg-[#fafafa] shadow-[#b4b4b4]"} shadow-[0_0px_3px_1px] shadow-[#0505051f] text-[0.8rem] p-1 lg:text-[0.6rem] lg:min-w-[90%] lg:mr-auto sm:ml-[0] sm:text-[0.8rem] sm:min-w-full mob:text-[0.7rem]`} key={index}>{item}</button>
                  ))}
                  </div>
                </div>
              ) : (<p></p>)}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-[1rem] m-auto">{`Error :(`}</div>
      ) }
    </>
  )
}

export default CountryPage
