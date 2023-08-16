import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router";

const SearchBar = () => {


    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const handleKeyDown = (e) =>{
        if(e.key === "Enter"){
            navigate(`search/${search}`,{replace : true})
        }
    }

  return (
    <div className="flex flex-col  justify-center items-center w-full gap-5 p-2">

      <p className=" text-sm md:text-2xl font-semibold w-full flex justify-center items-center ">
        <span className="text-2xl md:text-4xl font-bold text-blue-800">PIXEL </span>
        <span className="text-2xl md:text-4xl font-bold text-red-700 mr-2">ART </span>
        Stunning royalty-free images & royalty-free stock
      </p>

      <p className="w-full flex justify-center items-center text-xs">
        Over 4.1 million+ high quality stock images, videos gifs and more shared
        by our talented community.
      </p>


      <p className="text-gray-300 text-xs md:text-normal ">
        <span className="text-red-400">Trending Now : </span>flowerwall,
        papersback, groundshappy, love
      </p>

    </div>
  );
};

export default SearchBar;
