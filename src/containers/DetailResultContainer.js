import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import CustomButton from "../components/CustomButton";
import RibbonImg from "../assets/img/ribbon-blue-large.png";
import { PREFIX, SUFFIX, DETAIL } from "../consts/const";

const DetailResultContainer = (props) => {
  const { goToBack, data } = props;
  const navigate = useNavigate();
  const [isDoctor, setIsDoctor] = useState(false);
  const [userViewData, setUserViewData] = useState({
    "leu": { "title": "White Blood Cell", "value": 1, "color": [0, 0, 0]},
    "nit": { "title": "Bacteria Test", "value": 1, "color": [0, 0, 0] },
    "uro": { "title": "1st Liver Test", "value": 1, "color": [0, 0, 0] },
    "pro": { "title": "1st Kidney Test", "value": 1, "color": [0, 0, 0] },
    "ph": { "title": "pH Test", "value": 1, "color": [0, 0, 0] },
    "blo": { "title": "2nd Kidney Test", "value": 1, "color": [0, 0, 0] },
    "sg": { "title": "Hydration Test", "value": 1, "color": [0, 0, 0] },
    "ket": { "title": "1st Glucose Test", "value": 1, "color": [0, 0, 0] },
    "bil": { "title": "2nd Liver Test", "value": 1, "color": [0, 0, 0] },
    "glu": { "title": "2nd Glucose Test", "value": 1, "color": [0, 0, 0] },
  });

  const [doctorViewData, setDoctorViewData] = useState({
    "leu": { "title": "Leukocytes", "value": "0", "color": [0, 0, 0]},
    "nit": { "title": "Nitrite", "value": "0", "color": [0, 0, 0] },
    "uro": { "title": "Urobilinogen", "value": "0", "color": [0, 0, 0] },
    "pro": { "title": "Protein", "value": "0", "color": [0, 0, 0] },
    "ph": { "title": "pH", "value": "0", "color": [0, 0, 0] },
    "blo": { "title": "Blood", "value": "0", "color": [0, 0, 0] },
    "sg": { "title": "Specific Gravity", "value": "0", "color": [0, 0, 0] },
    "ket": { "title": "Ketone", "value": "0", "color": [0, 0, 0] },
    "bil": { "title": "Bilirubin", "value": "0", "color": [0, 0, 0] },
    "glu": { "title": "Glucose", "value": "0", "color": [0, 0, 0] },
  });

  const goToDoctor = () => {
    navigate("/download");
  }
  
  const goToDetail = () => {
    navigate("/detail", {state: { data: doctorViewData }});
  }

  useEffect(() => {
    const newUserViewData = {...userViewData};
    const newDoctorViewData = {...doctorViewData};
    DETAIL.forEach(item => {
      newDoctorViewData[item].value = PREFIX[item][data.predictions[item]] + " " + SUFFIX[item][data.predictions[item]];
      newUserViewData[item].color = data.reagent_colors[item];
      newDoctorViewData[item].color = data.reagent_colors[item];

      if (item !== "uro" && item !== "ph" && item !== "sg") {
        if (data.predictions[item] > 0) newUserViewData[item].value = 0;
        else newUserViewData[item].value = 1;
      } else if (item === "uro") {
        if (data.predictions[item] > 1) newUserViewData[item].value = 0;
        else newUserViewData[item].value = 1;
      } else {
        newUserViewData[item].value = 1;
      }
    })

    setUserViewData(newUserViewData);
    setDoctorViewData(newDoctorViewData);
  }, [data])

  return (
    <div className="w-full flex flex-col public-sans">
      <div className="fixed flex flex-col w-full max-w-[800px] border-b-2 px-8 py-5 bg-white border-[#E0DFE4] flex items-center">
        <div className="w-full flex items-start">
          <div className="flex items-center text-[#0052FF] text-xl" onClick={goToBack}><FaChevronLeft className="mr-2 text-sm"/>Back</div>
        </div>
        <img className="w-1/3" src={RibbonImg} alt="ribbon" />
        <span className="text-xl font-bold my-4">Detailed Results View</span>
        <div className="w-full flex justify-between">
          <CustomButton isBlue={!isDoctor} small title="Your View" width="w-40" func={() => setIsDoctor(false)} />
          <CustomButton isBlue={isDoctor} small title="Doctor's View" width="w-40" func={() => setIsDoctor(true)} />
        </div>
      </div>
      <div className="flex mt-56 pb-32">
        {
          !isDoctor
            ? <div className="flex-1 flex flex-col text-xl px-8">
              {
                DETAIL.map((item, index) =>
                  <div key={index} className="flex items-center justify-between mb-2">
                    <div className="w-7 h-7 mr-2" style={{backgroundColor: `rgb(${userViewData[item].color})`}} />
                    <div className="flex-1">{userViewData[item].title}</div>
                    <div className={`flex items-center cursor-pointer ${userViewData[item].value ? "text-[#1B995A]" : "text-[#D02B2B]"}`} onClick={goToDetail}>
                      {userViewData[item].value ? "Normal" : "Abnormal"} 
                      <FaChevronRight className="ml-2 text-[#43465C] text-sm"/>
                    </div>
                  </div>
                )
              }
            </div>
            : <div className="flex-1 flex flex-col text-xl px-8">
              {
                DETAIL.map((item, index) =>
                  <div key={index} className="flex items-center justify-between mb-2">
                    <div className="w-7 h-7 mr-2" style={{backgroundColor: `rgb(${doctorViewData[item].color})`}} />
                    <div className="flex-1">{doctorViewData[item].title}</div>
                    <div className={`flex items-center cursor-pointer ${userViewData[item].value ? "text-[#1B995A]" : "text-[#D02B2B]"}`} onClick={goToDetail}>
                      {doctorViewData[item].value} <FaChevronRight className="ml-2 text-[#43465C] text-sm"/>
                      {console.log(doctorViewData[item])}
                    </div>
                  </div>
                )
              }
            </div>
        }
      </div>
      <div className="gap-2 fixed bottom-0 w-full max-w-[800px] px-8 py-4 flex justify-between border-t-2 border-[#E0DFE4] bg-white">
        <CustomButton width="w-full" isBlue title="Chat with a Doctor" func={goToDoctor} />
      </div>
    </div>
  )
}

export default DetailResultContainer;