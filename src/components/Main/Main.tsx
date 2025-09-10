import styles from "./Main.module.css";

const Main = ({ children }: { children: any }) => {
  return (
    <main>
      {/* <div className={styles.corners}>
        <div className={styles.tr}></div>
        <div className={styles.tl}></div>
      </div> */}
      {children}
    </main>
  );
};

export default Main;
