import {useEffect, useState} from "react"

import {CityInListProps} from "../../types"
import {data} from "../../data/data"
import {Selector} from "../../components/selector/Selector"
import styles from "./MainPage.module.css"

export const MainPage = () => {
  const [cities, setCities] = useState<Array<CityInListProps>>([])
  useEffect(() => {
    const cities: Array<CityInListProps> = []
    for (let city of data) {
      cities.push({
        cityName: city.name,
        country: city.country,
        todayWeather: city.forecast[0],
      })
    }
    setCities(cities)
  })

  return <>
    <main className="layout">
      <div className={styles.container}>
        <Selector data={cities}/>
      </div>
    </main>
  </>
}
