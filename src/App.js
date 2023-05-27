import React from 'react'
import './App.css';
import { useEffect, useState } from 'react';
import InfoBox from './InfoBox';
import Map from './Map';
import {sortData} from './util.js';
import Table from './Table';
// import util from './util';
// import { Line } from 'react-chartjs-2';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";


function App() {
  // making an array named countries having name of countries

  const [countries,setcountries] =useState([]);
  const [country,setCountry] =useState('worldwide');
  const [countryInfo,setCountryInfo]=useState({});
  const [tableData,setTableData] =useState([]);
  const [mapCenter,setMapCenter] = useState({lat:23.30,lng:80.00});
  const [mapZoom,setMapZoom] = useState(3);
  const [mapCountries,setMapCountries]=useState([])


 //Api call for worldwide data
  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all").then(response => response.json()).then(data =>{
      setCountryInfo(data);
    })
  })
  
//API call for all countries name
useEffect(()=>{
const getcountriesdata = async()=>{

await fetch( `https://disease.sh/v3/covid-19/countries`).then((response)=> response.json())
.then((data)=>{
  // calling api
  // through use of fetch 
  // storing response in the form json i.e object array
  // for every object(data) storing name and country code
  //in object array named countries 
const countries = data.map((country) =>(
  {name:country.country,
  value:country.countryInfo.iso2,
  }
));
// displaying data in sorted form on the basis of cases
const sortedData = sortData(data);
setTableData(sortedData);
setcountries(countries);
setMapCountries(data)


});
};
getcountriesdata();
//function call
},[])
// it will run once as [] has no condition, so it will run once page loads 
  // https://disease.sh/v3/covid-19/countries
//useEffect runs a code for a condition

const oncountrychange=async(event)=>{
  const countryCode = event.target.value;
  setCountry(countryCode);

  //filling infoboxes 
  // checking if selected option is worldwide or ny country
  const url = countryCode === "Worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`

  await fetch(url)
  .then(response => response.json())
  .then(data => {

    setCountry(countryCode);   
    setCountryInfo(data);
    setMapCenter([data.countryInfo.lat,data.countryInfo.long]);
    setMapZoom(4)
console.log(mapCenter);
  })
 
}
  return (
    <div className="app">
      <div className='left'>
      <div className="header mb-4 ">
      <h1>covid-19 tracker</h1>
      <select className="form-select " aria-label="Default select example" value={country} onChange={oncountrychange}>
  <option >Worldwide</option>
 
  {
    // loop through countries and show a dropdown 
    // using a function to set  the value of option using map
    countries.map((country)=> (
      <option value ={country.value}>{country.name}</option>
      )
      )
    }
</select>
</div>

<div className="boxes">
  <InfoBox title="Corona Virus Cases" cases={countryInfo.todayCases} total={countryInfo.cases + " Total"}/>
  <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered + " Total"}/>
  <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths + " Total"}/>
</div>
{/* map */}
<Map countries={mapCountries} center={mapCenter} zoom={mapZoom} /> 
 
    </div>
    
    <div className="right">
    <div className="card" >
    <div className="card-body">
    <h5 className="card-title text-secondary">Live cases by Country</h5>
    <hr />
        <Table countries ={tableData}/>
    </div>
    {/* <hr/> */}
    {/* <h5 className="card-title new text-secondary">Worldwide Cases</h5> */}
    <LineGraph />
    {/* <Graph /> */}
    </div>

    </div>

    </div>
  );
}

export default App;
