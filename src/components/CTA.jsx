import styles from "../style";
import Button from "./Button";

const CTA = () => (
  <section
    className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-green-gradient rounded-[20px] box-shadow`}
  >
    <div className="flex-1 flex flex-col">
      <h2 className={styles.heading2}>Welcome to Sapling Farms!</h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Discover the freshest and finest produce straight from our sustainable
        farms. Cultivating goodness for a healthier tomorrow.
      </p>
    </div>

    <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
      <Button />
    </div>
  </section>
);

export default CTA;
