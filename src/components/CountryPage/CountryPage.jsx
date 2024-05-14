import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

function CountryPage() {
    
    const [api, setApi] = useState([]);

    let location = useLocation();

    let ccn3 = location.pathname.replaceAll("/", "")

    let { nome, flag, population, region, sub_region, capital, top_level_domain } = ""
    let { native_name, nativo } = ""
    let { currencies, currencies_sub } = ""
    let { languages , languages_sub } = ""

    useEffect(() => {
        async function fetchApi() {
          const response = await fetch(`https://restcountries.com/v3.1/alpha/${ccn3}`);
          const data = await response.json();
          console.log(data);
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
          <img src={flag} alt="#" />
          <h1>{nome}</h1>
          <h1>{native_name}</h1>
          <h1>{population}</h1>
          <h1>{region}</h1>
          <h1>{sub_region}</h1>
          <h1>{top_level_domain}</h1>
          <h1>{capital}</h1>
          <h1>{currencies}</h1>
          <h1>{languages}</h1>
        </div>
    )
}
  
export default CountryPage
  