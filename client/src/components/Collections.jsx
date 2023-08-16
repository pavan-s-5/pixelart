import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataFetchLoader from './loaders/DataFetchLoader'
import MasonaryLayout from './MasonaryLayout'
import { fetchFeeds } from '../sanity'
import { SET_FEED } from '../redux/actions/feedActions'
import {AiOutlineCompress} from 'react-icons/ai'

const Collections = () => {

  const [isLoading, setIsLoading] = useState(false);
  const feeds = useSelector((state) => state.feeds)
  const user = useSelector((state) => state.user);
  const [saved, setSaved] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!feeds) {
      setIsLoading(true)
      fetchFeeds().then((data) => {
        dispatch(SET_FEED(data))
        setIsLoading(false)
      })
    }
  },[])

  useEffect(() => {
    if(feeds && saved.length === 0){
      feeds?.map((feed) => {
        feed?.collections?.map((colc) => {
          if(colc._id === user?.uid){
            setSaved((prevArray) => [...prevArray, feed])
          }
        })
      })
    }
  },[])

  return (
    <div className='flex justify-center w-full'>
        {
          isLoading ? (<DataFetchLoader/>) : (<>
            <div>
              {
                saved?.length > 0 ? (<MasonaryLayout feeds={saved}/>) : (
                  <p className='text-2xl text-gray-500 flex justify-center items-center gap-2 select-none'>
                     <AiOutlineCompress/> Nothing saved to your collection Yet!
                  </p>
                )
              }
              
            </div>
          </>)
        }
    </div>
  )
}

export default Collections