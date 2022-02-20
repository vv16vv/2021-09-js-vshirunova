import styles from "./Footer.module.css"

export const Footer = () => {
  return <>
      <footer className={styles.footer}>
        <div className="layout">
          <div className={`${styles.container}`}>
            <a className={`${styles.developer} link`} href="https://github.com/vv16vv">&copy; Viktoria Shirunova</a>
          </div>
        </div>
      </footer>
  </>
}
