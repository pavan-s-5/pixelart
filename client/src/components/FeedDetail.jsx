import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFeedDetail, addToCollections } from "../sanity";
import {
  BsFillPersonCheckFill,
  BsBookmarksFill,
  BsBookmarks,
} from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { useSelector } from "react-redux";
import { Filter, MasonaryLayout } from "./index";
import {Comment} from "./index";

const FeedDetail = () => {
  const [feed, setFeed] = useState(null);
  const user = useSelector((state) => state.user);
  const feeds = useSelector((state) => state.feeds);

  const [saved, setSaved] = useState(false);

  const { _id } = useParams();

  useEffect(() => {
    fetchFeedDetail(_id).then((data) => {
      setFeed(data[0]);
    });
  }, [feeds, _id]);

  useEffect(() => {
    setSaved(
      feed?.collections?.filter((item) => item._id === user?.uid)?.length
    );
  }, [feed, user]);

  const saveToCollections = async (id, uid) => {
    if (!saved) {
      addToCollections(id, uid).then(() => {
        setSaved(true);
      });
    }
  };

  return (

    
    <div className="w-full items-center ">
      <Filter/>
    <div className="w-full h-auto p-2  grid grid-col-1 md:grid-cols-2 text-white md:max-w-[1200px] m-auto">
      
       {/* gird 1 ====================== */}

      <div className="flex flex-col items-start justify-start gap-4">
        <div className="flex items-center justify-center flex-col overflow-hidden  rounded-lg h-auto md:h-[600px]  w-full mr-2 my-2">
          {feed?.mainImage && (
            <img
              src={feed.mainImage.asset.url}
              alt=""
              className="w-full h-full object-cover"
            />
          )}
          {feed?.otherMedia && (
            <video
              src={feed.otherMedia.asset.url}
              alt=""
              className="w-full h-full object-cover"
              loop
              muted
              autoPlay
            />
          )}
        </div>


        {/* comment section  */}

        <div className="w-full py-4 flex flex-col items-start justify-start  px-2">
          <Comment feed={feed} user={user} setFeed={setFeed} />
        </div>


      </div>

      {/* gird 2 ====================== */}

      <div className="flex flex-col w-full items-start justify-start gap-2 ml-5">
        <div className="flex  w-full items-center p-1 gap-2">
          <div className="flex items-center">
            <span className="flex justify-center items-cemter ">
              <BsFillPersonCheckFill className="bg-gray-600 rounded-full text-xl p-1" />
            </span>
            <span className="flex justify-center items-cemter p-1 text-gray-400 ">
              Uploaded By :
            </span>
          </div>
          <p>{feed?.users?.displayName}</p>
          <img
            src={feed?.users?.photoURL}
            alt=""
            className="rounded-full w-8 h-8"
          />
          
        </div>

        <div className="flex  w-full items-center p-1 gap-5">
          <div className="flex border justify-center items-center px-2 gap-2 rounded-lg bg-gray-50">
            <FcLike className=" text-3xl p-1 gap-2 cursor-pointer" />
            {feed?.collections?.length > 0 ? (
              <p className="text-black">{feed?.collections?.length}</p>
            ) : (
              <p className="text-black font-medium select-none">0</p>
            )}
          </div>
          <div
            className=" flex items-center gap-2 cursor-pointer hover:text-green-500 transition-all duration-150 ease-in-out"
            onClick={() => saveToCollections(feed?._id, user?.uid)}
          >
            {saved ? (
              <div className="flex gap-2">
                <span>Saved to Collections</span>
                <BsBookmarksFill className="text-xl text-green-500" />
              </div>
            ) : (
              <div className="flex gap-2">
                <span>Save to Collections</span>
                <BsBookmarks className="text-xl " />
              </div>
            )}
          </div>
        </div>

        {feed?.keywords?.length > 0 && (
          <> 
          <p className="flex  w-full mt-5 gap-5 text-gray-200 text-lg items-start">
           <span className="text-gray-400 font-semibold">Title </span> {feed?.title}
          </p>

          <p className="flex flex-wrap mb-5 mt-5 gap-2 text-gray-400 items-center">
            Related Tags :
            {feed?.keywords?.map((tag, i) => (
              <span
                key={i}
                className="text-gray-200 text-sm rounded-lg p-1 bg-slate-500"
              >
                {tag}
              </span>
            ))}
          </p>
          </>
        )}

        {user && (
          <>
            {feed?.mainImage && (
              <a
                href={`${feed?.mainImage?.asset.url}?dl`}
                className="bg-green-500 hover:bg-green-600 p-2 rounded"
              >
                Download
              </a>
            )}
            {feed?.otherMedia && (
              <a
                href={`${feed?.otherMedia?.asset.url}?dl`}
                className="bg-green-500 hover:bg-green-600 p-2 rounded"
              >
                Download
              </a>
            )}
          </>
        )}

        <div className="w-full h-[1px] border border-gray-600 my-2"></div>

        <p className="text-gray-300">{feed?.description}</p>
        <p className="text-gray-100 mt-5 font-medium">Suggested Posts </p>

        <div className="w-full items-center justify-center flex-wrap gap-3">
          <MasonaryLayout
            isSuggestions={true}
            feeds={
              feeds?.otherMedia
                  ? feeds?.filter((item) => item.otherMedia).slice(0, 6)
                  : feeds?.filter((item) => item.mainImage).slice(0, 6)
            }

          />
        </div>
      </div>


    </div>
    <div className="">
    <div className="w-full px-16 ">
        <p className="text-gray-100 mt-5 font-medium text-2xl mb-3">Related Posts </p>

        <div className="w-full items-center justify-center flex-wrap gap-3">
          <MasonaryLayout
              feeds={
                  feeds?.otherMedia
                    ? feeds?.filter((item) => item.otherMedia).slice(0, 12)
                    : feeds?.filter((item) => item.mainImage).slice(0, 12)
              }
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default FeedDetail;
