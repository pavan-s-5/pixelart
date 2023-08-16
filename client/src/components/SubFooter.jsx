import React from "react";
import { BsChatRightHeartFill } from "react-icons/bs";

const SubFooter = () => {
  return (
    <div className="w-full text-white flex flex-col justify-center items-center bg-black">

      <div className="flex flex-col lg:flex-row w-full px-5 lg:px-20 py-10  justify-center items-cemter gap-10 ">
          <BsChatRightHeartFill className=" rounded-full text-4xl text-red-500 w-full lg:w-10" />
       
        <div className="flex flex-col gap-5">
          <h1 className="text-red-500">Free media you can use anywhere</h1>
          <p>
            PixaelArt is a vibrant community of creatives, sharing royalty-free
            images, videos, audio and other media. All content is released by
            Pixelart under the Content License, which makes it safe to use
            without asking for permission or giving credit to the artist - even
            for certain commercial purposes.
          </p>
        </div>
      </div>
      <div className="border-[0.2px] border-gray-800 w-[95%] mt-5 mb-5"></div>
    </div>
  );
};

export default SubFooter;
