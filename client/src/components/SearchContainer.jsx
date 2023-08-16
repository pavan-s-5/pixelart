import React, { useEffect, useState } from 'react'
import {DataFetchLoader, Filter, MasonaryLayout} from './index'
import { useParams } from 'react-router'
import {fetchSearchQuery} from '../sanity'
import NoResultFoundImage from '../assets/NoResultsFound.png'

const SearchContainer = () => {

    const {searchTerm} = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [searchFeeds, setSearchFeeds] = useState(null)

    useEffect(() => {
      setIsLoading(true);
      fetchSearchQuery(searchTerm).then((data) => {
        setSearchFeeds(data);
        setIsLoading(false)
      })
    },[searchTerm])

  return (
    <div>
        <Filter/>

        <div className="">
         {
          isLoading ? (
            <div className='flex w-full justify-center items-center mt-5 mb-5'>  <DataFetchLoader/> </div>
          ) : <> 
            {
              searchFeeds?.length > 0 ? <> <MasonaryLayout feeds={searchFeeds}/> </> : <> 
              <div className="text-white  flex justify-center items-center">
                  <img src={NoResultFoundImage} alt="" className='flex justify-center items-center gap-3 text-2xl text-gray-500
                  opacity-[0.5]'/>
              </div> </>
            }
            </>
         }
        </div>
    </div>
  )
}

export default SearchContainer