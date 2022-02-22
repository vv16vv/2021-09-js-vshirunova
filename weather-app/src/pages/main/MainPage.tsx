import {useEffect, useState} from "react"

import {CityInListProps} from "../../types"
import {data} from "../../data/data"
import {Selector} from "../../components/selector/Selector"
import styles from "./MainPage.module.css"
import {getCityInList, isCityInListStored, putCityInListToStorage} from "../../data/dataStorage"

export const MainPage = () => {
  const [cities, setCities] = useState<Array<CityInListProps> | null>(null)
  useEffect(() => {
    isCityInListStored()
      .then(value => {
        if (value) {
          return getCityInList()
        } else {
          const cities: Array<CityInListProps> = []
          for (let city of data) {
            cities.push({
              cityName: city.name,
              country: city.country,
              todayWeather: city.forecast[0],
            })
          }
          putCityInListToStorage(cities).catch(err => console.log(err))
          return Promise.resolve(cities)
        }
      })
      .then(cities => setCities(cities))
      .catch(err => console.log(err))
  })

  return <>
    {cities !== null ?
      <main className="layout">
        <div className={styles.container}>
          <Selector data={cities}/>
        </div>
      </main>
      : null
    }
  </>
}
