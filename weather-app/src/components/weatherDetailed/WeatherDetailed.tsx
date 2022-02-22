import {FC, useMemo} from "react"

import styles from "./WeatherDetailed.module.css"
import {Weather} from "../../types"
import {WeatherStateIcon} from "../weatherState/WeatherStateIcon"
import {WindDirectionComponent} from "../windDirectionComponent/WindDirectionComponent"

interface WeatherDetailedProps {
  weather: Weather
}

const dateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric"
}

export const WeatherDetailed: FC<WeatherDetailedProps> = ({weather}) => {
  const dateFormatter = useMemo(() => new Intl.DateTimeFormat("ru-RU", dateOptions), [])

  return <>
    <span className={styles.date}>{dateFormatter.format(weather.date)}</span>
    <span className={`${styles.temperature} temperature`}>{weather.temperature}</span>
    <WeatherStateIcon state={weather.state}/>
    <span className={`${styles.windForce} windForce`}>{weather.wind.force}</span>
    <span className={styles.windDirection}><WindDirectionComponent direction={weather.wind.direction}/></span>
  </>
}
