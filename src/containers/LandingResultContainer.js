import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import { FaChevronRight } from "react-icons/fa";
import CustomButton from "../components/CustomButton";
import RibbonImg from "../assets/img/ribbon-blue-large.png";
import LiverImg from "../assets/img/liver.png";
import KidneyImg from "../assets/img/kidney.png";
import DiabetesImg from "../assets/img/diabetes.png";
import InfectionImg from "../assets/img/infection.png";
import HydrationImg from "../assets/img/hydration.png";
import PHImg from "../assets/img/ph.png";

const LandingResultContainer = (props) => {
  const navigate = useNavigate();
  const { goToDetail, data } = props;
  const [state, setState] = useState({
    kidney: 1,
    liver: 1,
    diabetes: 1,
    infection: 1,
    hydration: 1,
    ph: 1,
  })
  const stateList = [
    {key: "kidney", img: KidneyImg, title: "Kidney"},
    {key: "liver", img: LiverImg, title: "Liver"},
    {key: "diabetes", img: DiabetesImg, title: "Glucose"},
    {key: "infection", img: InfectionImg, title: "Infection"},
    {key: "hydration", img: HydrationImg, title: "Hydration"},
    {key: "ph", img: PHImg, title: "pH"},
  ]

  const [result, setResult] = useState(10);

  const goToDoctor = () => {
    navigate("/download");
  }

  const goToDetailPage = () => {
    navigate("/detail");
  }

  useEffect(() => {
    const newState = {
      kidney: data.predictions.pro > 0 || data.predictions.blo > 0 ? 0 : 1,
      liver: data.predictions.bil > 0 || data.predictions.uro > 1 ? 0 : 1,
      diabetes: data.predictions.glu > 0 || data.predictions.ket > 0 ? 0 : 1,
      infection: data.predictions.leu > 0 || data.predictions.nit > 0 ? 0 : 1,
      hydration: 1,
      ph: 1,
    };
    let newResult = 0;
    Object.keys(data.predictions).forEach(key => {
      if (key !== "uro" && key !== "ph" && key !== "sg") {
        if (data.predictions[key] === 0) newResult++
      } else if (key === "uro") {
        if (data.predictions.uro === 0 || data.predictions.uro === 1) newResult++
      } else {
        newResult++
      }
    })

    setResult(newResult);
    setState(newState);
  }, [data])

  return (
    <div className="w-full flex flex-col public-sans">
      <div className="fixed w-full max-w-[800px] border-b-2 p-5 bg-white border-[#E0DFE4] flex justify-center">
        <img className="w-1/3" src={RibbonImg} alt="ribbon" />
      </div>
      <div className="m-8 mt-24 p-8 border-2 bourder-[#E0DFE4] rounded-lg text-center">
        { result < 10 ?
          <div className="text-[#0052FF] text-xl font-bold">Attention!</div>
        :
          <div className="text-[#0052FF] text-xl font-bold">Good news!</div>
        }
        { result < 10 ?
          <div className="text-3xl my-4 font-bold">{10-result}/10 results are abnormal today!</div>
          :
          <div className="text-3xl my-4 font-bold">{result}/10 results are normal today!</div>
        }
        <div className="flex">
        {
          result < 10 ?
          <ProgressBar className="flex-1 flex items-center" completed={(10-result) * 10} height="12px" isLabelVisible={false} bgColor="#DD1313" />
          :
          <ProgressBar className="flex-1 flex items-center" completed={result * 10} height="12px" isLabelVisible={false} bgColor="#1B995A" />
        }
        { result < 10 ?
          <span className="ml-2">{10-result}/10</span>
          :
          <span className="ml-2">{result}/10</span>
        }
        </div>
      </div>
      <div className="px-8 pb-32">
        {
          stateList.map((item, index) =>
            <div key={index} className="flex items-center justify-between p-8 border-2 bourder-[#E0DFE4] rounded-lg mb-8">
              <div className="flex items-center">
                <img className="mr-2" src={item.img} alt="kidney_img" />
                <span className="text-xl">{item.title}</span>
              </div>
              <div className={`flex items-center ${state[item.key] ? "text-[#1B995A]" : "text-[#D02B2B]"} text-xl`} onClick={() => goToDetail(true)}>
                {state[item.key] ? "Normal" : "Abnormal"}
                  <FaChevronRight className="ml-2 text-[#43465C] text-2xl"/>
              </div>
            </div>
          ) 
        }
      </div>
      <div className="gap-2 fixed bottom-0 w-full max-w-[800px] px-8 py-4 flex justify-between border-t-2 border-[#E0DFE4] bg-white">
        <CustomButton isBlue title="Full Report" width="w-1/2" func={() => goToDetail(true)} />
        <CustomButton title="Talk to Doctor" width="w-1/2" func={goToDoctor} />
      </div>
    </div>
  )
}

export default LandingResultContainer;