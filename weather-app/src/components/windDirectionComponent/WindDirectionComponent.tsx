import {WindDirection} from "../../types"
import {FC} from "react"

import arrow from "./arrow.svg"
import styles from "./WindDirectionComponent.module.css"

interface WindDirectionProps {
  direction: WindDirection
}

const windDirectionRu: Readonly<Map<WindDirection, string>> = Object.freeze(new Map([
  ['N', 'Северный'],
  ['NW', 'Северо-западный'],
  ['W', 'Западный'],
  ['SW', 'Юго-западный'],
  ['S', 'Южный'],
  ['SE', 'Юго-восточный'],
  ['E', 'Восточный'],
  ['NE', 'Северо-восточный'],
]) as Map<WindDirection, string>)

const classNames: Readonly<Map<WindDirection, string>> = Object.freeze(new Map([
  ['N', ""],
  ['NW', styles.directionNW],
  ['W', styles.directionW],
  ['SW', styles.directionSW],
  ['S', styles.directionS],
  ['SE', styles.directionSE],
  ['E', styles.directionE],
  ['NE', styles.directionNE],
]) as Map<WindDirection, string>)

export const WindDirectionComponent: FC<WindDirectionProps> = ({direction}) => {
  return <>
    <img
      className={classNames.get(direction)}
      src={arrow}
      width={11}
      height={11}
      alt={direction}
      title={windDirectionRu.get(direction)}
    />
  </>
}
