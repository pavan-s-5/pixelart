import { v4 as uuidv4 } from "uuid";

import {BiSolidHome} from 'react-icons/bi'
import {ImCamera} from 'react-icons/im'
import {RiPaintFill} from 'react-icons/ri'
import {AiFillVideoCamera, AiTwotoneFire} from 'react-icons/ai'

export const mainMenu = [
  { id: uuidv4(), name: "My Media", slug: "my-media" },
  { id: uuidv4(), name: "Upload", slug: "upload" },
  { id: uuidv4(), name: "My Collections", slug: "my-collections" },
];

export const subMenu = [
  { id: uuidv4(), name: "Upload", slug: "upload" },
  { id: uuidv4(), name: "My Media", slug: "my-media" },
  { id: uuidv4(), name: "My Collections", slug: "my-collections" },
];

export const categoriesList = [
  { id: uuidv4(), name: "Nature" },
  { id: uuidv4(), name: "Graphics" },
  { id: uuidv4(), name: "Illustration" },
  { id: uuidv4(), name: "Photos" },
  { id: uuidv4(), name: "Music" },
  { id: uuidv4(), name: "Videos" },
  { id: uuidv4(), name: "Gifs" },
  { id: uuidv4(), name: "Anime" },
  { id: uuidv4(), name: "Background" },
  { id: uuidv4(), name: "Sky" },
  { id: uuidv4(), name: "Money" },
  { id: uuidv4(), name: "Water" },
  { id: uuidv4(), name: "Cat" },
  { id: uuidv4(), name: "Baby" },
  { id: uuidv4(), name: "Dog" },
  { id: uuidv4(), name: "Food" },
  { id: uuidv4(), name: "Car" },
  { id: uuidv4(), name: "Flower" },
  { id: uuidv4(), name: "Artifacts" },
  { id: uuidv4(), name: "4k wallpaper" },
  { id: uuidv4(), name: "Wallpaper" },
  { id: uuidv4(), name: "Beach" },
  { id: uuidv4(), name: "Camera" },
  { id: uuidv4(), name: "Resort" },
  { id: uuidv4(), name: "Friends" },
  { id: uuidv4(), name: "Others" },
];

export const fetchQuery = `*[_type == 'post' ]| order(_createdAt desc){
    _id,
      title,
      keywords,
      categories,
      otherMedia {
      asset -> {
        url
      }
      },
      mainImage {
          asset -> {
        url
      }
      },
    description,
      _createdAt,
      users -> {
        _id,
        displayName,
        photoURL
      },
      collections [] -> {
         _id,
        displayName,
        photoURL
      },
      comments [] -> {
        _id,
        comment,
        _createdAt,
        users -> {
        _id,
        displayName,
        photoURL
      },
      }
}`;

export const fetchDetailQuery = (feedId) => {

  const query = `*[_type == 'post' &&  _id == '${feedId}']{
    _id,
      title,
      keywords,
      categories,
      otherMedia {
      asset -> {
        url
      }
      },
      mainImage {
          asset -> {
        url
      }
      },
    description,
      _createdAt,
      users -> {
        _id,
        displayName,
        photoURL
      },
      collections [] -> {
         _id,
        displayName,
        photoURL
      },
      comments [] -> {
        _id,
        comment,
        _createdAt,
        users -> {
        _id,
        displayName,
        photoURL
      },
      }
}`;
return query
}

export const filterMenu = [
  {id : uuidv4(), to : "/", label : "Home", icon : BiSolidHome},
  {id : uuidv4(), to : "/search/photos", label : "Photos", icon : ImCamera},
  {id : uuidv4(), to : "/search/illustration", label : "Illustration", icon : RiPaintFill},
  {id : uuidv4(), to : "/search/videos", label : "Videos", icon :AiFillVideoCamera},
  {id : uuidv4(), to : "/search/gifs", label : "Gifs", icon :AiTwotoneFire},
]

export const searchQuery = (searchTerm) => {

  const query = `*[_type == 'post' &&  title match '${searchTerm}*'
|| categories match '${searchTerm}*' 
|| keywords match '${searchTerm}*']{
    _id,
      title,
      keywords,
      categories,
      otherMedia {
      asset -> {
        url
      }
      },
      mainImage {
          asset -> {
        url
      }
      },
    description,
      _createdAt,
      users -> {
        _id,
        displayName,
        photoURL
      },
      collections [] -> {
         _id,
        displayName,
        photoURL
      },
      comments [] -> {
        _id,
        comment,
        _createdAt,
        users -> {
        _id,
        displayName,
        photoURL
      },
      }
}`;
return query
}








