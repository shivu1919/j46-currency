import { useState, useEffect } from 'react';
import './App.css'
import axios from "axios"

export default function App() {

  const [list, setList] = useState([])
  const[isDataPresent, setIsDataPresent] = useState(false)


  const[fromCurrency, setFromCurrency] = useState('')
  const[toCurrency, setToCurrency] = useState('')
  const[fromValue, setFromValue] = useState(0)
  const[toValue, setToValue] = useState(0)

  //fetching the currency list
  useEffect(() => {
    axios.get("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json")
    .then((res)=>{
      
      let arr = Object.entries(res.data)
      arr = arr.filter((item) => item[1]!='')
      setList(arr)
      setIsDataPresent(true)
    })
  }, [0])


 

  function calculate(){

    if(fromCurrency=='' || toCurrency=='' || fromValue<0){
        alert("Please fill the details properly")
        setFromValue(0)
    }

    else{
      axios.get(`https://latest.currency-api.pages.dev/v1/currencies/${fromCurrency}.json`)
      .then((res)=> {
        
        setToValue(fromValue * res.data[fromCurrency][toCurrency])
      })
    }
      
  }



  return (
    <>
        <div id='resume'>
          <a href="/wings-of-fire.pdf" download="Shivam_resume.pdf">
            <button>Download my resume</button>
          </a>
        </div>

        {isDataPresent && <div id="main">
        <h1>Currency App</h1>

        <div id="card">
          <div className='container'>
            <h1>From</h1>
          <select value={fromCurrency} onChange={(event)=> {setFromCurrency(event.target.value); setFromValue(0); setToValue(0)}}>
            <option value="">Choose "FROM" currency</option>
            
            {list.map((item, index)=> <option value={item[0]} key={index}>{item[1]}</option>)}
          </select>
          </div>

          <div className='container'>
            <h1>To</h1>
           <select value={toCurrency} onChange={(event)=> {setToCurrency(event.target.value); setFromValue(0); setToValue(0)}}>
            <option value="">Choose "TO" currency</option>
            {list.map((item, index)=> <option value={item[0]} key={index}>{item[1]}</option>)}
          </select>
          </div>


          <input 
          type="number"
          placeholder='enter the values'
          value={fromValue}
          onChange={(event)=> setFromValue(event.target.value)}
          />

          <button onClick={calculate}>Calculate</button>

          <input type="text" readOnly value={toValue}/>
        </div>
      </div>}
    </>
  );
}

