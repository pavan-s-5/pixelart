import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsBookmarks, BsBookmarksFill } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import {useSelector} from "react-redux"
import { feedDelete, addToCollections } from "../sanity";

const Feed = ({ data }) => {
  const [saved, setSaved] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const user = useSelector(state => state.user)

  const deleteFeed = () => {
    feedDelete(data._id).then(() => {
        window.location.reload();
    })
  }

  const saveToCollections = async(id, uid) => {
    if(!saved){
        addToCollections(id, uid).then(() => {
          setSaved(true)
        })
    }
  }

  useEffect(() => {
    setSaved(!!(data?.collections?.filter((item) => item?._id === user?.uid).length))
  },[data, user])

  return (
    <div
      className="m-2 relative"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="relative cursor-pointer w-auto h-auto shadow-xs overflow-hidden bg-red-500 rounded">
        {data?.mainImage && (
          <Link
            to={`/feed-detail/${data?._id}`}
            className="w-full h-full bg-red-500"
          >
            <img
              src={data.mainImage.asset.url}
              alt=""
              className="w-full h-full object-cover"
            />
          </Link>
        )}
        {data?.otherMedia && (
          <Link
            to={`/feed-detail/${data?._id}`}
            className="w-full h-full bg-red-500"
          >
            <video
              src={data.otherMedia.asset.url}
              alt=""
              className="w-full h-full object-cover"
              loop
              muted
              autoPlay
            />
          </Link>
        )}

        {isHover && (
          <>
            <div className="absolute inset-x-0 top-0 px-3 py-2 flex items-center ">
              <div
                className={`w-8 h-8 rounded-full p-2 bg-[#000000ca] flex items-center 
                justify-center`}
                onClick={() => saveToCollections(data?._id, user?.uid)}
                >
                {saved ? (
                  <BsBookmarksFill className="text-xl text-green-500" />
                ) : (
                  <BsBookmarks className="text-xl text-white" />
                )}
              </div>
            </div>

            {data?.keywords.length > 0 && (
              <div className="absolute flex gap-2  truncate bottom-0 bg-[#000000b5] w-full px-2 py-2 lowercase ">
                {data?.keywords.slice(0, 3).map((tag, i) => (
                  <p key={i} className="text-white text-xs">
                    {tag}
                  </p>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      {
        user?.uid === data?.users?._id && (
            <div className="absolute top-3 right-5 cursor-pointer bg-[#000000a5] p-2 rounded-full text-red-500 text-lg"
            onClick={deleteFeed}>
                <RiDeleteBin6Line/>
            </div>
        )
      }
    </div>
  );
};

export default Feed;
