import React, { useState } from "react";
import Masonry from "react-masonry-css";
import { Feed } from "./index";

const breakpointsObj = {
  default: 4,
  3000: 5,
  2000: 4,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonaryLayout = ({ feeds, isSuggestions }) => {
  const [visibleItemCount, setVisibleItemCount] = useState(20);
  const itemsIncrement = 20;

  const handleViewMore = () => {
    setVisibleItemCount(visibleItemCount + itemsIncrement);
  };

  const limitedFeeds = feeds?.slice(0, visibleItemCount);

  return (
    <>
      <Masonry
        className="flex px-0 md:px-5  justify-center"
        breakpointCols={!isSuggestions ? breakpointsObj : 2}
      >
        {limitedFeeds?.map((feed, i) => (
          <Feed key={i} data={feed} />
        ))}
      </Masonry>
      {limitedFeeds?.length < feeds?.length && (
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleViewMore}
          >
            View More
          </button>
        </div>
      )}
    </>
  );
};

export default MasonaryLayout;
