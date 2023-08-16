import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../assets/sampleimage.png";
import { BsPersonCircle } from "react-icons/bs";
import {
  GoogleAuthProvider,
  reload,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { firebaseAuth } from "../../config/firebase.config";
import { createNewUser } from "../sanity";
import { SET_USER, SET_USER_NULL } from "../redux/actions/useActions";
import { useDispatch, useSelector } from "react-redux";
import { GrFormUpload } from "react-icons/gr";
import { mainMenu } from "../utils/supports";
import { RiLogoutBoxRLine } from "react-icons/ri";
import {SearchInput} from "./index";
import { CiSearch } from "react-icons/ci";
import { GrClose } from "react-icons/gr";

const Header = () => {
  const [isSearchIconClicked, setIsSearchIconClicked] = useState(false);
  const [screenSize, setScreenSize] = useState(window.innerWidth < 768);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMenu, setIsMenu] = useState(false);

  const user = useSelector((state) => state.user);

  const provider = new GoogleAuthProvider();

  const loginWithGmail = async () => {
    await signInWithRedirect(firebaseAuth, provider).then((result) => {
      createNewUser(result?.user?.providerData[0]).then(() => {
        console.log("New User Created");
        dispatch(SET_USER(result?.providerData[0]));
      });
    });
  };

  const logout = async () => {
    await firebaseAuth.signOut().then(() => {
      dispatch(SET_USER_NULL());
      navigate("/", { replace: true });
    });
  };

  const reload = () => {
    window.location.reload();
  };

  // Search bar for screen size less than 475px

  const handleSearchButtonClick = () => {
    setIsSearchIconClicked(true);
  };

  const handleCloseButtonClick = () => {
    setIsSearchIconClicked(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="sticky top-0 left-0 flex justify-between items-center w-full h-20 bg-gray-100 z-[1000] gap-2
    p-2 md:px-10 py-10 sm:px-10 ">
      <h1
        className=" font-extralight  text-xl md:text-3xl text-blue-800"
        onClick={reload}
      >
        <Link to={"/"}>PIXELART</Link>
      </h1>

      {screenSize ? (
        <div>
          <CiSearch className="text-2xl cursor-pointer" onClick={handleSearchButtonClick}/>
          <div
            className={` flex w-full absolute h-full bg-white justify-center items-center
            top-[0] left-0 ${isSearchIconClicked ? "translate-y-0" : "translate-y-[-80px]"} transition-all duration-150 ease-in-out
             z-20 `}>
            <SearchInput />
            <GrClose className="absolute top-[50%] translate-y-[-50%] left-3 text-xl cursor-pointer"
              onClick={handleCloseButtonClick}
            />
          </div>
        </div>
      ) : (
        <SearchInput />
      )}

      <div className="flex justify-center items-center gap-3">
        {user && (
          <Link
            to={"/newPost/upload"}
            className=" flex justify-center items-center gap-1
              rounded-full  bg-green-600 text-white hover:bg-green-700 transition-all ease-in duration-150
              px-2 py-1 md:p-2 text-xs md:text-sm font-semibold ">
            Upload
            <GrFormUpload className="text-lg md:text-2xl text-white font-semibold" />
          </Link>
        )}

        {user ? (
          <div className="relative cursor-pointer">
            <img
              src={user?.photoURL}
              className="rounded-full w-7 h-7 md:w-10 md:h-10 object-cover z-10"
              alt=""
              referrerPolicy="no-referrer"
              onClick={() => setIsMenu(!isMenu)}
            />

            {isMenu && (
              <div
                className="absolute right-0 top-14 rounded-md shadow-md w-64 px-4 py-3 bg-black flex flex-col gap-3"
                onMouseLeave={() => setIsMenu(false)}
              >
                <h2 className="text-red-500 font-semibold border-b-[2px] border-gray-500 border-solid pb-2">
                  <span className="text-gray-200">Logged in as </span>{" "}
                  {user?.displayName}
                </h2>

                {mainMenu &&
                  mainMenu.map((menu) => (
                    <Link
                      className="hover:text-white  text-gray-500"
                      key={menu.id}
                      to={`/newPost/${menu?.slug}`}
                    >
                      {menu?.name}
                    </Link>
                  ))}

                <div
                  className="flex  justify-center items-center gap-2 border-t-2 border-gray-500 pt-2
                 hover:text-red-800 text-gray-500"
                  onClick={logout}
                >
                  <RiLogoutBoxRLine /> Logout
                </div>
              </div>
            )}
          </div>
        ) : (
          <div
            className="flex items-center gap-2 justify-center border border-gray-400 rounded-full px-1 py-1
        cursor-pointer hover:border-blue-600 active:scale-95 select-none hover:text-green-600 transition-all 
        ease-in-out duration-150"
            onClick={loginWithGmail}
          >
            <BsPersonCircle className="text-xl text-red-700 md:text-2xl" />
            <span className="text-sm font-semibold ">Login</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
