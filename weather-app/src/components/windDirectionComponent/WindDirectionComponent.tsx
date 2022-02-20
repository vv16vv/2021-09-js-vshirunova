import {WindDirection} from "../../types"
import {FC} from "react"

import arrow from "./arrow.svg"
import styles from "./WindDirectionComponent.module.css"

interface WindDirectionProps {
  direction: WindDirection
}

export const WindDirectionComponent: FC<WindDirectionProps> = ({direction}) => {
  let className
  let title

  switch (direction) {
    case "N":
      title = "северный"
      break;
    case "NW":
      className = styles.directionNW
      title = "северо-западный"
      break;
    case "W":
      className = styles.directionW
      title = "западный"
      break;
    case "SW":
      className = styles.directionSW
      title = "юго-западный"
      break;
    case "S":
      className = styles.directionS
      title = "южный"
      break;
    case "SE":
      className = styles.directionSE
      title = "юго-восточный"
      break;
    case "E":
      className = styles.directionE
      title = "восточный"
      break;
    case "NE":
      className = styles.directionNE
      title = "северо-восточный"
      break;

  }

  return <>
    <img
      className={className}
      src={arrow}
      width={11}
      height={11}
      alt={direction}
      title={title}
    />
  </>
}
