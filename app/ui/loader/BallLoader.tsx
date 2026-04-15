import React from "react";

type Props = {};

const LoaderBall = (props: Props) => {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="flex justify-center items-center space-x-2">
        <div
          className="w-3 h-3 bg-mixerColor rounded-full animate-bounce"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="w-3 h-3 bg-mixerColor rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-3 h-3 bg-mixerColor rounded-full animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
    </div>
  );
};

export default LoaderBall;
