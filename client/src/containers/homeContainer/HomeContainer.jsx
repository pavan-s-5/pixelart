import "./homeContainer_Style.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeeds } from "../../sanity";
import { SET_FEED } from "../../redux/actions/feedActions";
import { DataFetchLoader, Filter, SearchBar } from "../../components/index";
import {MasonaryLayout} from '../../components/index'

const HomeContainer = ({ data }) => {
  const [slide, setSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const feeds = useSelector((state) => state.feeds);

  const nextSlide = () => {
    setSlide(slide === data?.length - 1 ? 0 : slide + 1);
  };

  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  });

  // fecting the data from sanity
  useEffect(() => {
    if (!feeds) {
      setIsLoading(true);
      fetchFeeds().then((data) => {
        dispatch(SET_FEED(data));
        setInterval(() => {
          setIsLoading(false);
        }, 2000);
      });
    }
  }, []);

  return (
    <div className="relative">
      <div className="flex w-screen h-80  relative overflow-x-hidden">
        {data?.map((src, i) => {
          return (
            <div
              key={i}
              className={`min-w-[100vw] h-full flex-shrink-0 
        ${slide === i ? "block" : "hidden"} `}
            >
              <img
                src={src.image}
                alt=""
                className={`min-w-[100vw] h-full object-fill opacity-[0.5]`}
              />
            </div>
          );
        })}
      <div className="gradient w-screen h-56  absolute bottom-0 "></div>

      <div className="absolute flex h-full text-white w-full">
        <SearchBar/>
      </div>

      </div>
       
      <Filter/>

      <div>
      {isLoading ? (
        <div className="flex w-full items-center justify-center p-12 mt-10">
          <DataFetchLoader />
        </div>
      ) : ( 
        <div className="w-full flex justify-center items-center p-1 "> {/* {bg-[#04152d]} */}
          <div className="text-white w-full rounded md:max-w-7xl  justify-between items-center flex-wrap gap-3"
          >  
            <MasonaryLayout feeds={feeds} /> 
          </div>
        </div>
      )}
       </div>
    </div>
  );
};

export default HomeContainer;
