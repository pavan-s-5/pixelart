import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DataFetchLoader from './loaders/DataFetchLoader'
import MasonaryLayout from './MasonaryLayout'

const Mymedia = ({feeds}) => {

  const [isLoading, setIsLoading] = useState(false)
  const [filteredFeed, setFilteredFeed] = useState(null)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    setIsLoading(true);
    setFilteredFeed(feeds?.filter((data) => data.users._id === user?.uid))
    setIsLoading(false);
  },[])

  return (
    <div>
      {
        isLoading ? (<DataFetchLoader/>) : (<>
        <div className="">
          <MasonaryLayout feeds={filteredFeed} />
        </div>
        </>)
      }
    </div>
  )
}

export default Mymedia