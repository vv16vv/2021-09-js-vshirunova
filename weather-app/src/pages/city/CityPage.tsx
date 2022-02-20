import {useState} from "react"
import {useEffect} from "react"

import {City} from "../../types"
import {data} from "../../data/data"
import {WeatherDetailed} from "../../components/weatherDetailed/WeatherDetailed"
import styles from "./CityPage.module.css"

export const CityPage = () => {
  const [city, setCity] = useState<City>()

  useEffect(() => {
    const params = window.location.pathname.split("/")
    const country = decodeURIComponent(params[params.length - 2])
    const name = decodeURIComponent(params[params.length - 1])
    const city = data.find(c => c.name === name && c.country === country)
    setCity(city)
  }, [])

  return <main className="layout">
    <div className={styles.container}>
      <h1 className={styles.city}>{city?.name}</h1>
      <p className={styles.country}>{city?.country}</p>
      <ul className={styles.forecast}>
        {
          city?.forecast.map(weather => {
            return <li key={weather.date.toDateString()} className={styles.item}>
              <WeatherDetailed weather={weather}/>
            </li>
          })
        }
      </ul>
    </div>
  </main>
}
