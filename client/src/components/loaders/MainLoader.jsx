import React from "react";
import { Dna, RotatingTriangles } from "react-loader-spinner";

const MainLoader = () => {
  return (
    <div className="text-white fixed inset-0 items-center justify-center flex">
      <RotatingTriangles
        visible={true}
        height="80"
        width="80"
        ariaLabel="rotating-triangels-loading"
        wrapperStyle={{}}
        wrapperClass="rotating-triangels-wrapper"
      />
      <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};

export default MainLoader;
