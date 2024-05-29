import { useState, useEffect } from "react";
import { useLocation, Link } from 'react-router-dom';
import ArrowBack from "../../assets/arrow-back.svg"
import { useOutletContext } from 'react-router-dom';

function CountryPage() {

  const { darkMode } = useOutletContext();
  const [api, setApi] = useState([]);
  const [borders, setBorders] = useState([])

  let location = useLocation();
  let ccn3 = location.pathname.replaceAll("/", "")

  let { nome, flag, currencies, currencies_sub, languages, languages_sub } = ""
  let top_level_domain = []

  //  useEffect(() => {
  //    async function fetchApi(code) {
  //      const response = await fetch(`https:restcountries.com/v3.1/alpha/${code}`);
  //      const data = await response.json();
  //      console.log(data);

  //       USAR DATA.JSON

  //      if (Array.isArray(data[0].borders)) {
  //        const borderPromises = data[0].borders.map(async (borderCode) => {
  //          const borderResponse = await fetch(`https:restcountries.com/v3.1/alpha/${borderCode}`);
  //          const borderData = await borderResponse.json();
  //          return borderData[0].name.common;
  //        });

  //        const bordersNames = await Promise.all(borderPromises);
  //        console.log(bordersNames)
  //        setBorders(bordersNames);
  //      } else {
  //        setBorders([]);
  //      }

  //      setApi(data)
  //    }

  //    fetchApi(ccn3);
  //  }, [ccn3])

  useEffect(() => {
    async function fetchApi(code) {
      fetch('/data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const indexPosition = ( dados ) => { if ( dados.numericCode == code ) { return true } }

        const index = data.findIndex( indexPosition )
        setApi([data[index]])
      })
      .catch(error => console.error('Error fetching countries:', error));
    }

    // async function fetchBorders(code) {
    //   const response = await fetch("/data.json");
    //   const data = await response.json();     
    // } 

    fetchApi(ccn3)
    //fetchBorders(ccn3)
  }, [ccn3])

  console.log(api)

  api.map(post => {
    console.log("sim")
    nome = post.name
    flag = post.flags.png

    Object.keys(post.currencies).forEach(function (prop) {
      currencies_sub = prop
    });

    Object.keys(post.languages).forEach(function (prop) {
      languages_sub = prop
    });

    top_level_domain = post.topLevelDomain
    currencies = post.currencies[`${currencies_sub}`].symbol
    languages = post.languages[`${languages_sub}`].name

    console.log(top_level_domain, currencies, languages)
  })

  return (
    <div className={`${darkMode ? "bg-[#202c37]" : ""} min-h-[100vh] py-[100px]`}>
      <Link to="/"><button className={`${darkMode ? "bg-[#2b3945] text-white" : ""} text-[0.9rem] mb-[5%] flex px-8 py-1 rounded-sm shadow-[0_0px_3px_1px_rgba(0,0,0,0.3)] shadow-[#00000052] items-center cursor-pointer ml-[90px]`}><img src={ArrowBack} alt="#" className={`${darkMode ? "invert-[1]" : ""} w-4 mr-1`} /> Back</button></Link>

      <div className="flex m-auto px-[90px] justify-between min-h-[300px]">
        <div className="w-[44%] my-auto lg:w-[44%]">
          <img src={flag} alt="#" className="w-full h-full mt-[-20px]" />
        </div>

        <div className="w-[44%] flex flex-col justify-center lg:w-[49%]">
          <h1 className={`${darkMode ? "text-white" : ""} text-[1.3rem] font-bold lg:text-[1rem]`}>{nome}</h1>

          {/* <div className="grid grid-cols-2 mt-2">
            <div className="flex flex-col gap-1">
              <h1 className={`${darkMode ? "text-[#dadada]" : ""} text-[0.9rem] lg:text-[0.7rem] font-bold`}>Native Name: <span className={`${darkMode ? "text-[#dadadab9]" : ""} text-[0.8rem] lg:text-[0.7rem] font-normal`}>{nome}</span></h1>
              <h1 className={`${darkMode ? "text-[#dadada]" : ""} text-[0.9rem] lg:text-[0.7rem] font-bold`}>Population: <span className={`${darkMode ? "text-[#dadadab9]" : ""} text-[0.8rem] lg:text-[0.7rem] font-normal`}>{population}</span></h1>
              <h1 className={`${darkMode ? "text-[#dadada]" : ""} text-[0.9rem] lg:text-[0.7rem] font-bold`}>Region: <span className={`${darkMode ? "text-[#dadadab9]" : ""} text-[0.8rem] lg:text-[0.7rem] font-normal`}>{region}</span></h1>
              <h1 className={`${darkMode ? "text-[#dadada]" : ""} text-[0.9rem] lg:text-[0.7rem] font-bold`}>Sub Region: <span className={`${darkMode ? "text-[#dadadab9]" : ""} text-[0.8rem] lg:text-[0.7rem] font-normal`}>{sub_region}</span></h1>
              <h1 className={`${darkMode ? "text-[#dadada]" : ""} text-[0.9rem] lg:text-[0.7rem] font-bold`}>Capital: <span className={`${darkMode ? "text-[#dadadab9]" : ""} text-[0.8rem] lg:text-[0.7rem] font-normal`}>{capital}</span></h1>
            </div>

            <div className="flex flex-col gap-1">
              <h1 className={`${darkMode ? "text-[#dadada]" : ""} text-[0.9rem] lg:text-[0.7rem] font-bold`}>Top Level Domain: <span className={`${darkMode ? "text-[#dadadab9]" : ""} text-[0.8rem] lg:text-[0.7rem] font-normal`}>{top_level_domain}</span></h1>
              <h1 className={`${darkMode ? "text-[#dadada]" : ""} text-[0.9rem] lg:text-[0.7rem] font-bold`}>Currencies: <span className={`${darkMode ? "text-[#dadadab9]" : ""} text-[0.8rem] lg:text-[0.7rem] font-normal`}>{currencies}</span></h1>
              <h1 className={`${darkMode ? "text-[#dadada]" : ""} text-[0.9rem] lg:text-[0.7rem] font-bold`}>Languages: <span className={`${darkMode ? "text-[#dadadab9]" : ""} text-[0.8rem] lg:text-[0.7rem] font-normal`}>{languages}</span></h1>
            </div>
          </div> */}

          {api.map((post) => (
            <div key={post.numericCode} className="grid grid-cols-2 mt-2">
              <div className="flex flex-col gap-1">
                <h1 className={`${darkMode ? "text-[#dadada]" : ""} text-[0.9rem] lg:text-[0.7rem] font-bold`}>Native Name: <span className={`${darkMode ? "text-[#dadadab9]" : ""} text-[0.8rem] lg:text-[0.7rem] font-normal`}>{post.name}</span></h1>
                <h1 className={`${darkMode ? "text-[#dadada]" : ""} text-[0.9rem] lg:text-[0.7rem] font-bold`}>Population: <span className={`${darkMode ? "text-[#dadadab9]" : ""} text-[0.8rem] lg:text-[0.7rem] font-normal`}>{post.population}</span></h1>
                <h1 className={`${darkMode ? "text-[#dadada]" : ""} text-[0.9rem] lg:text-[0.7rem] font-bold`}>Region: <span className={`${darkMode ? "text-[#dadadab9]" : ""} text-[0.8rem] lg:text-[0.7rem] font-normal`}>{post.region}</span></h1>
                <h1 className={`${darkMode ? "text-[#dadada]" : ""} text-[0.9rem] lg:text-[0.7rem] font-bold`}>Sub Region: <span className={`${darkMode ? "text-[#dadadab9]" : ""} text-[0.8rem] lg:text-[0.7rem] font-normal`}>{post.sub_region}</span></h1>
                <h1 className={`${darkMode ? "text-[#dadada]" : ""} text-[0.9rem] lg:text-[0.7rem] font-bold`}>Capital: <span className={`${darkMode ? "text-[#dadadab9]" : ""} text-[0.8rem] lg:text-[0.7rem] font-normal`}>{post.capital}</span></h1>
              </div>

              <div className="flex flex-col gap-1">
                <h1 className={`${darkMode ? "text-[#dadada]" : ""} text-[0.9rem] lg:text-[0.7rem] font-bold`}>Top Level Domain: <span className={`${darkMode ? "text-[#dadadab9]" : ""} text-[0.8rem] lg:text-[0.7rem] font-normal`}>{top_level_domain}</span></h1>
                <h1 className={`${darkMode ? "text-[#dadada]" : ""} text-[0.9rem] lg:text-[0.7rem] font-bold`}>Currencies: <span className={`${darkMode ? "text-[#dadadab9]" : ""} text-[0.8rem] lg:text-[0.7rem] font-normal`}>{currencies}</span></h1>
                <h1 className={`${darkMode ? "text-[#dadada]" : ""} text-[0.9rem] lg:text-[0.7rem] font-bold`}>Languages: <span className={`${darkMode ? "text-[#dadadab9]" : ""} text-[0.8rem] lg:text-[0.7rem] font-normal`}>{languages}</span></h1>
              </div>
            </div>
          ))}

          {/* {borders.length > 0 ? (
            <div className={`${darkMode ? "text-white" : ""} mt-4 flex`}>
              <div className="grid grid-cols-3 gap-x-2 gap-y-3 items-center">
                <span className="mr-3 text-[0.9rem] font-bold lg:text-[0.7rem] lg:text-nowrap">Borders Countries: </span>              
                {borders.map((item, index) => (
                  <button className={`${darkMode ? "text-[#dadada] bg-[#2b3945] shadow-[#00000080]" : "bg-[#fafafa] shadow-[#b4b4b4]"} shadow-[0_0px_3px_1px] shadow-[#0505051f] text-[0.8rem] p-1 lg:text-[0.6rem] lg:max-w-[100px]`} key={index}>{item}</button>
              ))}
              </div>
            </div>
          ) : (<p></p>)} */}
        </div>
      </div>
    </div>
  )
}

export default CountryPage
