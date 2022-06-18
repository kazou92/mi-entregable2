import React, { useEffect, useState } from 'react'
import axios from 'axios'


const Entregabla = () => {
  const [objet, setObjet] = useState({})
  const [weater, setWeater] = useState({})
  const [weather, setWeather] = useState(true)

  const celcuis = () => setWeather(!weather)





  useEffect(() => {
    const succes = (pos) => {
      console.log(pos)
      const long = pos.coords.longitude
      const lat = pos.coords.latitude
      setObjet({ long, lat })
    }


    navigator.geolocation.getCurrentPosition(succes)

  }, [])






  useEffect(() => {
    if (objet.lat !== undefined) {
      const api_key = "dc91283d4994d89690129a89c97d1de3"
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${objet?.lat}&lon=${objet?.long}&appid=${api_key}`
      axios.get(url)
        .then(res => setWeater((res.data)))
        .catch(err => console.log(err))
    }



  }, [objet])
  let kelvin = (weater.main?.temp)

  let cel = (kelvin - 273.15).toFixed()





  return (
    <div className='padre'>
      <h1 className='tit' > Wheather App </h1>
      <p className='class-titulo'>{`${weater?.name},${weater.sys?.country}`}</p>
      <div className='fils'>
        <img className='image' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlKhGTzMTuLQbqlURXd0SVec5nWsTFYJkkeQ&usqp=CAU" alt="" />

        <ul className="list">
          <li className="list-item">
            <i class="fa-solid fa-wind">
            </i>
            <b>Wind Speed:</b>
            {weater.wind?.speed} m/s
          </li>
          <li className="list-item"> <i class="fa-solid fa-cloud"></i> <b>Clouds:</b> {weater.clouds?.all} %</li>
          <li className="list-item"> <i class="fa-solid fa-temperature-empty"></i> <b>Pressure:</b>{weater.main?.pressure} mb</li>

          <li className='list-item'>
            <i class="fa-solid fa-tire-pressure-warning"></i>
            <b>Temp :</b>
            {
              weather ? `${cel} °C` : `${kelvin} K`
            }

          </li>
        </ul>
      </div>


      <button className='btn' onClick={celcuis} >
        {weather ? " Cambiar Grado Kelvin" : " Cambiar Grado Celcuis "}
      </button>

    </div>
  )
}

export default Entregabla

