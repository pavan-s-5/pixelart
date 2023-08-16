import React, { useState } from "react";
import { GoCommentDiscussion } from "react-icons/go";
import { FaRegCommentDots } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { DataFetchLoader } from "./index";
import moment from "moment";
import { addToComments, fetchFeedDetail, fetchFeeds } from "../sanity";
import { useDispatch } from "react-redux";
import { SET_FEED } from "../redux/actions/feedActions";

const Comment = ({ feed, user, setFeed }) => {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(5);

  const dispatch = useDispatch();

  const saveComment = async (e) => {
    if (e.key === "Enter") {
      if (comment) {
        setIsLoading(true);
        setComment('')
        addToComments(feed?._id, user?.uid, comment).then(() => {
          fetchFeedDetail(feed?._id).then((newData) => {
            setFeed(newData[0]);

            fetchFeeds().then((data) => {
              dispatch(SET_FEED(data));
            });
            setIsLoading(false);
          });
        });
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <p className="flex justify-start items-center gap-2  text-xl text-gray-400">
        <GoCommentDiscussion />
        Comment
      </p>
      <div className="flex items-center  bg-gray-100 rounded-lg gap-2">
        <label className="text-2xl text-gray-500 ml-2">
          <FaRegCommentDots />
        </label>
        <input
          type="text"
          placeholder="Add a comment for the post.."
          className="rounded h-10 p-2 w-full border-none outline-none bg-transparent text-black"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={saveComment}
        />
        <button className="border h-full p-2 text-blue-600 text-2xl border-none flex items-center hover:text-blue-700">
          <RiSendPlaneFill />
          <span className="text-sm font-semibold"> Post </span>
        </button>
      </div>
      <div className="w-full flex flex-col items-center justify-center ">
        {isLoading ? (
          <div>
            {" "}
            <DataFetchLoader />
          </div>
        ) : (
          <div className="w-full">
            {feed?.comments ? (
              <div className="">
                {feed?.comments?.slice(0, index).map((message) => (
                  <div
                    key={message._id}
                    className="flex w-full gap-2  p-2 items-center"
                  >
                    <img
                      src={message?.users?.photoURL}
                      alt=""
                      className="rounded-full w-10 h-10"
                    />
                    <div className="w-full  flex flex-col items-start justify-start gap-2">
                      <div className="w-full flex items-center justify-between">
                        <p className="lowercase">
                          {message?.users?.displayName}
                        </p>
                        <p>{moment(message?._createdAt).fromNow()}</p>
                      </div>
                      <p>{message?.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center font-semibold text-gray-300">
                <span>No Comments yet</span>
                <span className="text-xs font-thin">
                  Start the Conversation
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;

<div className=""></div>;
