import {FC} from "react"
import {Link} from "react-router-dom"

import styles from "./Header.module.css"
import logo from "./favicon.png"

interface HeaderProps {
  main?: boolean
}

export const Header: FC<HeaderProps> = ({main = true}) => {
  return <>
    <header className={styles.header}>
      <div className="layout">
        <div className={`${styles.container}`}>
          <img
            className={styles.logo}
            src={logo}
            width="64"
            height="64"
            alt="Логотип Погода везде."/>
          <p className={styles.title}>Погода везде</p>
          {
            main
              ? null
              : <Link to={"/"} className={`${styles.back} link`}>На главную</Link>
          }
        </div>
      </div>
    </header>
  </>
}
