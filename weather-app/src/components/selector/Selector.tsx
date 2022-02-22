import {
  FC,
  useCallback,
  useState,
} from "react"

import arrowDown from "./arrow.down.svg"
import {CityInList} from "../cityInList/CityInList"
import {CityInListProps} from "../../types"
import styles from "./Selector.module.css"

interface SelectorProps {
  data: Array<CityInListProps>
}

export const Selector: FC<SelectorProps> = ({data}) => {
  let [isShown, setIsShown] = useState(false)

  const click = useCallback(() => {
    setIsShown(!isShown)
  }, [isShown])

  const buttonStyle = isShown
    ? `${styles.button} ${styles.buttonWithPopup}`
    : styles.button

  return <>
    <button className={buttonStyle} onClick={click}>
      <span className={styles.title}>Выберите город</span>
      <img className={styles.sign} src={arrowDown} alt=""/>
    </button>
    {isShown
      ? <ul className={styles.popup}>
        {
          data.map((item) => {
            return <li key={`${item.country}-${item.cityName}`} className={styles.cityItem}>
              <CityInList cityName={item.cityName} country={item.country} todayWeather={item.todayWeather}/>
            </li>
          })
        }
      </ul>
      : null
    }
  </>
}
