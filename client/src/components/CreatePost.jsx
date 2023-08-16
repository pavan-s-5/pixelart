import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import "../assets/SwiperCss/swiperStyles.scss";
import { categoriesList } from "../utils/supports";
import { deleteUploadedAsset, savePost, uploadAsset } from "../sanity";
import { IoIosAddCircleOutline } from "react-icons/io";
import { BiCloudUpload } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiDeleteOutline } from "react-icons/ti";
import { TiDelete } from "react-icons/ti";
import {useSelector} from 'react-redux'
import {UploadLoader} from './index'

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [asset, setAsset] = useState(null);
  const [alert, setAlert] = useState(null);
  const [keywords, setKeywords] = useState('')
  const [tags, setTags] = useState([])
  const [description, setDescription] = useState('')

  const user = useSelector(state => state.user)
  
  const handleFileSelect = async (e) => {
    //uploading file to sanity
    setIsLoading(true);
    const file = e.target.files[0];

    if (file && isAllowed(file)) {
      await uploadAsset(file).then((data) => {
        console.log("Uploaded asset", data);
        setAsset(data);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
      setAsset(null);
      setAlert(
        "Invalid File Type - Please select only mp4, mp3, gif, jpeg, png, avi, wav, jpg"
      );
      setInterval(() => {
        setAlert(null);
      }, 5000);
    }
  };

  const isAllowed = (file) => {
    const allowedTypes = [
      "audio/mp3",
      "audio/wav",
      "video/avi",
      "video/mp4",
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
    ];
    return allowedTypes.includes(file.type);
  };

  const deleteAsset = async (id) => {
    setIsLoading(true);
    await deleteUploadedAsset(id).then((data) => {
      console.log(data);
      setAsset(null);
      setIsLoading(false);
    });
  };

  // tag section :

  // adding tag when clicking the plus symbol

  const addTags = () => { // on click of plus button
    if(keywords.trim() !== ''){
      setTags((previousTags) => [...previousTags, ...keywords.split(',').map(tag => tag.trim())]);
    }
      setKeywords('');
      console.log(tags)
  }

  const handleKeyUp = (e) => {  // on pressiing of enter key
    if(e.key === 'Enter'){
      addTags()
    }
  }

  // save data section 

  const saveData = async() => {
    if(!title || !asset || !category || !tags){
      setAlert('Please fill all the details')
      setInterval(() => {
        setAlert(null)
      }, 5000);
    }else{
      if(asset?.mimeType.split('/')[0] === 'image'){
        const doc = {
          _type : "post",
          title,
          keywords : tags,
          description,
          filesource : asset?.mimeType.split('/')[0] === 'image'? 'image' : 'others',
          mainImage : {
            _type : "mainImage",
            asset : {
              _type : 'reference',
              _ref : asset?._id,
            }
          },
          categories : category,
          users : {
            _type : "reference",
            _ref : user?.uid
          }
        }
        // saving the data to sanity of image
        await savePost(doc).then(() => {
          setAlert('Data Saved Sucessfully')
          setTitle('')
          setCategory(null) 
          setKeywords('')
          setAsset(null)
          setTags([])
          setDescription('')
          setInterval(() => {
            setAlert(null)
          }, 3000);
        })
      }else{
        // Saving data to sanity of other mdedia like video gig mp3

        const doc = {
          _type : "post",
          title,
          keywords : tags,
          description,
          filesource : asset?.mimeType.split('/')[0] === 'image'? 'image' : 'others',
          otherMedia : {
            _type : "otherMedia",
            asset : {
              _type : 'reference',
              _ref : asset?._id,
            }
          },
          categories : category,
          users : {
            _type : "reference",
            _ref : user?.uid
          }
        };
        await savePost(doc).then(() => {
          setAlert('Data Saved Sucessfully')
          setTitle('')
          setCategory(null) 
          setKeywords('')
          setAsset(null)
          setTags([])
          setDescription('')
          setInterval(() => {
            setAlert(null)
          }, 3000);
        });
        window.location.reload()      
      }
      
    }
  }

  return (
    <div className="w-full h-auto flex items-center justify-start flex-col gap-4">
      {alert && (
        <div className="w-full px-4 py-3 rounded-md bg-red-100 text-red-700 shadow-inner flex items-center justify-center">
          {alert}
        </div>
      )}

      <input
        type="text"
        placeholder="Add title to your post"
        className="w-full p-2 rounded-md bg-transparent border bg-gray-200 text-white"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Swiper
        slidesPerView={10}
        centeredSlides={false}
        spaceBetween={10}
        grabCursor={true}
        pagination={{ clickable: true }}
        className="mySwiper"
      >
        {categoriesList &&
          categoriesList.map((list) => (
            <SwiperSlide key={list.id}>
              <div
                className={`px-2 py-1 flex items-center justify-center rounded-md border border-red-500 hover:bg-red-600
              ${category === list.name && "bg-red-600"}`}
                onClick={() => setCategory(list.name)}
              >
                {list.name}
              </div>
            </SwiperSlide>
          ))}
      </Swiper>

      <div className="w-full bg-gray-200 backdrop-blur-md h-80 rounded-md cursor-pointer flex items-center justify-center">
        {isLoading ? (
          <div className="flex"> <UploadLoader/> </div>
        ) : (
          <div className="w-full h-full">
            {!asset ? (
              <label className="bg-red-500 w-full h-full cursor-pointer">
                <div className="flex flex-col justify-center items-center h-full">
                  <div className="flex  gap-3 justify-center items-center cursor-pointer">
                    <BiCloudUpload className="text-6xl text-green-600 " />
                    <span className="text-2xl text-gray-500 font-bold hover:text-gray-700">
                      Click to Upload
                    </span>
                  </div>
                </div>
                <input
                  type="file"
                  className="w-0 h-0"
                  accept=".mp3,.wav,.avi,.mp4,.jpeg,.png,.gif,.jpg"
                  onChange={handleFileSelect}
                />
              </label>
            ) : (
              <>
                {asset &&
                  [
                    "image/jpeg",
                    "image/jpg",
                    "image/png",
                    "image/gif",
                  ].includes(asset?.mimeType) && (
                    <div className=" h-full flex justify-center items-center">
                      <img
                        src={asset?.url}
                        alt=""
                        className=" h-full object-fill"
                      />
                    </div>
                  )}
                {asset &&
                  ["video/mp4", "video/avi", "video/mov", "video/wav"].includes(
                    asset?.mimeType
                  ) && (
                    <div className=" h-full flex justify-center items-center">
                      <video
                        src={asset?.url}
                        alt=""
                        controls
                        className=" h-full object-fill"
                      />
                    </div>
                  )}
              </>
            )}
          </div>
        )}
        {asset && (
          <div className="bg-black bg-opacity-[0.7] rounded-full flex items-center justify-center p-2 absolute top-5 right-5">
            <RiDeleteBin6Line
              className="text-white text-2xl"
              onClick={() => deleteAsset(asset?._id)}
            />
          </div>
        )}
      </div>

      {/* tag section */}
      <div className="flex flex-col w-full h-auto gap-4 items-center justify-center">
        <div className="flex w-full h-10 gap-2 items-center justify-center bg-gray-200 p-2 rounded-full">
          <input type="text" placeholder="Add #tags to your post seperated by comma (#anime, #nature, #Beach, #Ocean etc., )"
          value={keywords} onChange={(e) => setKeywords(e.target.value)} 
          className="flex-1 h-10  text-black text-lg placeholder:text-base  items-center bg-transparent border-0 outline-0 pl-2 md:pl-5" 
            onKeyUp={handleKeyUp}
          />
          <IoIosAddCircleOutline className="text-3xl text-black cursor-pointer hover:text-red-600" 
            onClick={addTags}
          />
          <TiDeleteOutline className="text-3xl text-black cursor-pointer hover:text-red-600"
          onClick={() => {
            setKeywords('')
            setTags([])
          }}
          />
        </div>
        {
          tags.length > 0 && (
            <div className=" text-black w-full h-auto flex rounded p-1 items-center justify-start flex-wrap gap-2">
              {
                tags.map((tag,i) => (
                  <div key={i} className="flex justify-center h-full items-center gap-2  p-1 rounded bg-blue-500 text-white">
                    <p className="text-xl">{tag}</p>
                    < TiDelete className="text-2xl cursor-pointer text-black hover:text-white transition-all duration-150"
                    onClick={() => {
                      setTags(tags.filter((value) => value !== tag))
                    }}/> 
                  </div>
                ))
              }
            </div>
          )}
      </div>

      <textarea className="w-full h-72 rounded p-5 bg-gray-200 text-2xl text-black placeholder:text-lg" 
      placeholder="Add Description to your post.."  value={description} type='text'
      onChange={(e) => setDescription(e.target.value)}
      />

      <div className="flex justify-end w-full">
        <button className=" w-full xs:w-20 bg-blue-600 rounded p-2 text-lg hover:bg-blue-700 transition-all ease-in-out duration-150"
        onClick={saveData}>
          Save
        </button>
      </div>

    </div>
  );
};

export default CreatePost;
