import { Route, Routes } from "react-router-dom";
import { HomeContainer, NewPost } from "./containers";
import { FeedDetail, Footer, Header, MainLoader, SearchContainer, SubFooter } from "./components";
import { slides } from "./containers/testimonial.json";
import { useEffect, useState } from "react";
import { firebaseAuth } from "../config/firebase.config";
import { createNewUser } from "./sanity";
import { useDispatch } from "react-redux";
import { SET_USER } from "./redux/actions/useActions";
import { BsAndroid } from "react-icons/bs";

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((result) => {
      if(result) { 
      createNewUser(result?.providerData[0]).then(() => {
        dispatch(SET_USER(result?.providerData[0]));
          setIsLoading(false)
      })
    } else{
        setIsLoading(false)
    }
    });
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col justify-start">
      {isLoading ? (
        <> <MainLoader/> </>

      ) : (
        <div className="flex flex-col">
          <Header />
          <main className="w-full h-full flex  first-letter:items-center justify-center">
            <Routes>
              <Route path="/*" element={<HomeContainer data={slides} />} />
              <Route path="/newPost/*" element={<NewPost/>} />
              <Route path="/feed-detail/:_id" element={<FeedDetail/>} />
              <Route path="/search/:searchTerm" element={<SearchContainer/>} />
            </Routes>
          </main>
          <SubFooter/>
          <Footer/>
        </div>
      )}
    </div>
  );
}

export default App;