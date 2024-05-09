import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RibbonImg from "../assets/img/ribbon.png";

import RibbonImgLarge from "../assets/img/ribbon-blue-large.png";
import SpinnerImg from "../assets/img/spinner.gif";
import PhotoOne from "../assets/img/photo_one_urine_16x9.jpg";
import PhotoThree from "../assets/img/photo_three_black_area.jpg";
import PhotoFour from "../assets/img/take-photo-4.jpg";
import RibbonDipLoop from "../assets/mp4/Ribbon_Dip_Loop_Compressed.mp4";

const images = [RibbonImgLarge, PhotoOne, PhotoThree, PhotoFour, SpinnerImg];

const SplashPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/tutor?step=0");
    }, 1500);
  });

  return (
    <div className="w-full bg-[#0052FF] flex flex-col items-center justify-center relative mx-auto animate-fade">
      {
        images.map((image, index) => <img key={index} className="hidden" src={image} alt="pre-load" />)
      }
      <link rel="prefetch" href={RibbonDipLoop} as="video" type="video/mp4"/>

      <img className="w-60" src={RibbonImg} alt="ribbon" />
      <span className="absolute public-sans text-white text-3xl bottom-8">Checkup</span>
    </div>
  )
}

export default SplashPage;