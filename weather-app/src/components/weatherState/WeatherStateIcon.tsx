import {FC} from "react"

import {WeatherState} from "../../types"

import cloudy from "./cloudy.png"
import rainy from "./rainy.png"
import snow from "./snow.png"
import sunny from "./sunny.png"
import styles from "./WeatherStateIcon.module.css"

interface WeatherStateIconProps {
    state: WeatherState
}

export const WeatherStateIcon: FC<WeatherStateIconProps> = ({state}) => {
    let icon
    switch (state) {
        case "cloudy":
            icon = cloudy
            break
        case "sunny":
            icon = sunny
            break
        case "rainy":
            icon = rainy
            break
        case "snow":
            icon = snow
            break
    }

    return <>
        <img
            className={styles.stateIcon}
            src={icon}
            width="64"
            height="64"
            alt={state}
        />
    </>
}
