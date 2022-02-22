import {FC} from "react"
import {Link} from "react-router-dom"

import {CityInListProps} from "../../types"
import styles from "./CityInList.module.css"
import {WeatherStateIcon} from "../weatherState/WeatherStateIcon"

export const CityInList: FC<CityInListProps> = ({cityName, country, todayWeather}) => {
  return <Link to={`/cities/${country}/${cityName}`} className={`${styles.link}`}>
    <span>
      <span>{cityName},&nbsp;</span>
      <span className={styles.country}>{country}</span>
    </span>
    <span className={`${styles.temperature} temperature`}>{todayWeather.temperature}</span>
    <WeatherStateIcon state={todayWeather.state}/>
  </Link>
}
