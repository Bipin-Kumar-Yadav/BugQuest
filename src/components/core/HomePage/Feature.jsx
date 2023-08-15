import React from "react";
import { TypeAnimation } from "react-type-animation";
import CTAButton from "./CTAButton";

const Feature = ({ src, heading, subheading, text, position, color }) => {
  return (
    <div
      className={`md:flex ${position} justify-between gap-4 items-center ml-5`}
    >
      <div className="w-[100%] md:w-[50%] md:h-[80%] sm:w-[100%]">
        <img
          src={src}
          alt=" "
          className="lg:h-[400px] sm:h-[300px] w-[75%]  rounded-lg"
        />
      </div>
      <div className="w-[100%] sm:w-[45%] mt-6 sm:mt-0">
        <h2 className="lg:text-2xl md:text-xl font-inter font-bold text-button">
          {heading}
        </h2>
        <h3
          className={`lg:text-xl md:text-[20px] sm:text-[15px] ${
            color ? "text-carribiangreen-300" : "text-blue-300"
          } font-semibold mt-3`}
        >
          {subheading}
        </h3>
        <div
          className={`ml-2 flex flex-row gap-5 mt-4 sm:mt-6 font-bold font-mono text-lg sm:text-xl ${
            color ? "text-carribiangreen-200" : "text-blue-200"
          } mb-4 sm:mb-10`}
        >
          <div className="mb-2 md:text-[15px] sm:text-[15px]">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
          </div>
          <div className="md:text-[15px] lg:text-[20px] sm-text-[15px]">
            <TypeAnimation
              sequence={[text, 2000, ""]}
              repeat={Infinity}
              cursor={true}
              style={{
                whiteSpace: "pre-line",
                display: "block",
              }}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
        <CTAButton active={true} linkto={"/signup"}>
          Join The Hunt
        </CTAButton>
      </div>
    </div>
  );
};

export default Feature;
