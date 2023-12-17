import styles from "../style";
import { discount, robot } from "../assets";
import GetStarted from "./GetStarted";

const Farm = () => {
  return (
    <section
      id="home"
      className={`flex md:flex-row flex-col ${styles.paddingY}`}
    >
      <div
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}
      >
        <div
          className={`flex flex-row items-center py-[6px] px-4 bg-green-gradient rounded-[10px] mb-2`}
        >
          <img src={discount} alt="tractor" className="w-[32px] h-[32px]" />
          <p className={`${styles.paragraph} ml-2`}>
            <span className="text-white">Farm-Fresh</span> Produce For{" "}
            <span className="text-white">Healthy Living</span>
          </p>
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-bold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
            Welcome to <br className="sm:block hidden" />{" "}
            <span className="text-gradient">Sapling Farms</span>{" "}
          </h1>
          <div className="ss:flex hidden md:mr-4 mr-0">
            <GetStarted />
          </div>
        </div>

        <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full">
          Fresh and Sustainable Produce.
        </h1>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Explore our wide range of farm-fresh produce. We follow sustainable
          farming practices to bring you the best quality crops.
        </p>
      </div>

      <div
        className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}
      >
        <img
          src={robot}
          alt="crops"
          className="w-[100%] h-[100%] relative z-[5]"
        />

        {/* gradient start */}
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 green__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
        {/* gradient end */}
      </div>

      <div className={`ss:hidden ${styles.flexCenter}`}>
        <GetStarted />
      </div>
    </section>
  );
};

export default Farm;
