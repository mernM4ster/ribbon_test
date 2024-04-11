import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RibbonImg from "../assets/img/ribbon.png";
import BodyImg from "../assets/img/body.png";
import UrineImg from "../assets/img/urine.png";
import DetectionImg from "../assets/img/detection.png";
import GoalImg from "../assets/img/goal.png";

const images = [BodyImg, UrineImg, DetectionImg, GoalImg];

const SplashPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/tutor?step=0");
    }, 1000);
  });

  return (
    <div className="w-full bg-[#0052FF] flex flex-col items-center justify-center relative mx-auto animate-fade">
      {
        images.map((image) => <img className="hidden" src={image} alt="pre-load" />)
      }
      <img className="w-60" src={RibbonImg} alt="ribbon" />
      <span className="absolute public-sans text-white text-3xl bottom-8">Checkup</span>
    </div>
  )
}

export default SplashPage;