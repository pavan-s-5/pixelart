import React, { useState, useEffect } from "react";
import { filterMenu } from "../utils/supports";
import { NavLink, useLocation } from "react-router-dom";

const Filter = () => {
  return (
    <div className="flex  flex-wrap justify-center md:justify-center items-center mb-5 p-10 ">
      {filterMenu &&
        filterMenu.map((menu) => (
          <FilterButtons
            key={menu.id}
            label={menu.label}
            icon={menu.icon}
            to={menu.to}
          />
        ))}
    </div>
  );
};

export const FilterButtons = ({ label, icon, to }) => {
  const Icon = icon;
  const [active, setActive] = useState(false);
  const location = useLocation();
  const isActive = location.pathname === to

  useEffect(() => {
    setActive(window.location.pathname === to);
  }, [to]);

  return (
    <NavLink to={to}>
      <div className={`flex justify-center items-center gap-2  py-2 px-5 rounded-full ${isActive && "bg-red-600" }`} >
        <Icon className={`${isActive ? "text-black" : "text-yellow-500"} text-xl font-bold`}/>
        <p className=" text-white font-semibold">{label}</p>
      </div>
    </NavLink>
  );
};

export default Filter;
