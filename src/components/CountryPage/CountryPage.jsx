import { useState, useEffect } from "react";
import { useLocation, Link } from 'react-router-dom';
import ArrowBack from "../../assets/arrow-back.svg"
//import { useOutletContext } from 'react-router-dom';

function CountryPage() {
    
    //const { darkMode } = useOutletContext();
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
        <div>
          <Link to="/"><button><img src={ArrowBack} alt="#" /> Back</button></Link>

          <div className="flex">
              <div>
                <img src={flag} alt="#" />
              </div>

              <div className="">
                <h1>{nome}</h1>

                <div>
                  <div>
                    <h1>{native_name}</h1>
                    <h1>{population}</h1>
                    <h1>{region}</h1>
                    <h1>{sub_region}</h1>
                    <h1>{top_level_domain}</h1>
                  </div>
                  
                  <div>
                    <h1>{capital}</h1>
                    <h1>{currencies}</h1>
                    <h1>{languages}</h1>
                  </div>
                </div>

                <div>
                  {borders.length > 0 ? (
                    borders.map((item, index) => (
                      <p key={index}>{item}</p>
                    ))
                    ) : (
                      <p></p>
                    ) }
                </div>
              </div>
          </div>
        </div>
    )
}
  
export default CountryPage
  