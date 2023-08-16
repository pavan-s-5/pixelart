import React from "react";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import { BsPinterest, BsFillTelephoneFill, BsWhatsapp } from "react-icons/bs";
import { BiLogoGmail } from "react-icons/bi";
import { footer } from "../utils/footer.json";

const Footer = () => {
  return (
    <>
      <div className="flex flex-col text-white bg-black  w-full p-5">

        <div className="flex flex-wrap mb-10 justify-between p-10 ">

          <div className="flex mb-10 flex-col justify-start items-start">
            <h1 className="text-blue-500 font-extralight text-2xl">PIXELART</h1>
            <h1 className="text-gray-500 text-xs">
              Over 4.3 million+ high quality stock images, videos and music
              shared by our talented community.
            </h1>
            <h1 className="text-gray-500 mt-5"> Reach out to Developer </h1>

            <ul className="text-gray-500  mt-5 flex gap-5 text-2xl">
              <li className="hover:text-gray-300 cursor-pointer">
               <a href="https://www.linkedin.com/in/pavan-s-5b80951aa/" target="_blank"> <AiFillLinkedin /> </a> 
              </li>
              <li className="hover:text-gray-300 cursor-pointer">
                <a href="https://github.com/pavan-s-5" target="_blank">  <AiFillGithub /> </a>
              </li>
              <li className="hover:text-gray-300 cursor-pointer">
                <a href="https://personal-portfolio-three-sable.vercel.app/" target="_blank">  <BsPinterest /> </a>
              </li>
              <li className="hover:text-gray-300 cursor-pointer">
                <a href="https://wa.me/918310492341" target="_blank">  <BsWhatsapp /> </a>
              </li>
            </ul>

            <ul className="mt-5 flex gap-2 flex-col text-gray-500">
              <li className="flex gap-2  items-center">
                <BiLogoGmail /> pavansgowda500@gamil.com
              </li>
              <li className="flex gap-2  items-center">
                <BsFillTelephoneFill /> +91 8310492341
              </li>
            </ul>
          </div>

          <div className="flex gap-20 flex-wrap">
            <div className="flex flex-col">
              <h2 className="text-xl mb-3">Discover</h2>
              <ul className="text-gray-500 flex flex-col gap-3">
                {footer
                  ?.find((item) => item.name === "Discover")
                  ?.Discoverli.map((li, i) => (
                    <li key={i} className="hover:text-gray-300 cursor-pointer">
                      {li}
                    </li>
                  ))}
              </ul>
            </div>

            <div className="flex flex-col">
              <h2 className="text-xl mb-3">Community</h2>
              <ul className="text-gray-500 flex flex-col gap-3">
                {footer
                  ?.find((item) => item.name === "Community")
                  ?.Communityli.map((li, i) => (
                    <li key={i} className="hover:text-gray-300 cursor-pointer">
                      {li}
                    </li>
                  ))}
              </ul>
            </div>

            <div className="flex flex-col">
              <h2 className="text-xl mb-3">About</h2>
                <ul className="text-gray-500 flex flex-col gap-3">
                  {footer
                    ?.find((item) => item.name === "About")
                    ?.Aboutli.map((li, i) => (
                      <li
                        key={i}
                        className="hover:text-gray-300 cursor-pointer"
                      >
                        {li}
                      </li>
                    ))}
                </ul>
            </div>
          </div>

        </div>

      </div>
      
      <div className="text-gray-500 text-[8px] md:text-xs w-full  flex justify-center items-center h-20 p-5">
        <p>
          {" "}
          PIXELART Copyrights &copy; 2023 All rights Reserved - This site is
          protected by reCAPTCHA and the Google Privacy Policy and Terms of
          Service apply.
        </p>
      </div>
    </>
  );
};

export default Footer;
