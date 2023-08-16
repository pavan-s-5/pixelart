import React, { useState } from "react";
import { useNavigate } from "react-router";
import { CiSearch } from "react-icons/ci";


const SearchInput = () => {

    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const searchIcon = () => {
        navigate(`search/${search}`,{replace : true})

    }

    const handleKeyDown = (e) =>{
        if(e.key === "Enter"){
            searchIcon()
        }
    }


  return (
    <div className="flex items-center justify-center bg-white w-full md:w-[25rem] lg:w-[40rem] md:rounded-full px-3 py-1">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        className=" h-8  text-black border-none outline-none ml-8
        w-[15rem] xxs:w-[18rem] xs:w-[21rem] md:w-full"
        placeholder="Search high-resolution images videos and more..."
      />

      <CiSearch className=" h-full text-4xl  text-gray-500 cursor-pointer hover:text-gray-600"
      onClick={searchIcon} />
    </div>
  );
};

export default SearchInput;
