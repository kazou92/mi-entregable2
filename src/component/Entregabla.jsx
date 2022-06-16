import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Entregabla = () => {
  const [objet, setObjet] = useState()
  const [weater, setWeater] = useState({})
  const [weather, setWeather] = useState(true)
  

  let long, lat

  const getLongLat = () => {
    const succes = (pos) => {
      console.log(pos)
      long = pos.coords.longitude
      lat = pos.coords.latitude
      setObjet({ long, lat })
    }


    navigator.geolocation.getCurrentPosition(succes)
   

  }


  

 

  const api_key = "dc91283d4994d89690129a89c97d1de3"
  useEffect(() => {
    if (objet !== undefined) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${objet?.lat}&lon=${objet?.long}&appid=${api_key}`
      axios.get(url)
        .then(res => setWeater((res.data)))
        .catch(err => console.log(err))
    }

  }, [objet])
  console.log(weater)

  let button=weather.main?.temp
  let faren = (button - 273.15).toFixed(this)
  console.log(button)
  
    button = ()=> setWeather(faren)
    console.log(weather)

 




  return (
    <div className='padre'>
      <h1 className='tit' > Wheather App </h1>
      <p className='class-titulo'>{`${weater.name},${weater.sys?.country}` }</p>
      <div className='fils'>
        <img className='image' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlKhGTzMTuLQbqlURXd0SVec5nWsTFYJkkeQ&usqp=CAU" alt="" />

        <ul className="list">
          <li className="list-item"> <b>Wind Speed:</b>{weater.wind?.speed} m/s</li>
          <li className="list-item"> <b>Clouds:</b> {weater.clouds?.all} %</li>
          <li className="list-item">  <b>Pressure:</b>{weater.main?.pressure} mb</li>

          <li  className='list-item'> <b>Temp :</b> {weater.main?.temp}</li>
        </ul>
      </div>


      <button className='btn' onClick={getLongLat} >getLongLat</button>
    </div>
  )
}

export default Entregabla

