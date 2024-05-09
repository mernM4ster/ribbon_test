import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import CustomButton from "../components/CustomButton";
import RibbonImg from "../assets/img/ribbon-blue-large.png";
import { DETAIL, ABNORMAL_DETAILS } from "../consts/const";

const DetailPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [abnormalDetails, setAbnormalDetails] = useState([])

  const goToBack = () => {
    navigate(-1);
  }

  const goToDoctor = () => {
    navigate("/download");
  }

  useEffect(() => {
    console.log(state)
    const sortedDetail = DETAIL.filter(item => state.data[item].value.indexOf("+") > -1 || state.data[item].value.indexOf("Trace") > -1)
    let newAbnormalDetails = [];
    sortedDetail.forEach(item => {
      newAbnormalDetails.push({
        title: state.data[item].title,
        description: ABNORMAL_DETAILS[item],
        value: state.data[item].value,
        color: state.data[item].color
      })
    })

    setAbnormalDetails(newAbnormalDetails);
  }, [state])

  return (
        <div className="w-full flex flex-col public-sans">
      <div className="fixed flex flex-col w-full max-w-[800px] border-b-2 px-8 py-5 bg-white border-[#E0DFE4] flex items-center">
        <div className="w-full flex items-start">
          <div className="flex items-center text-[#0052FF] text-xl" onClick={goToBack}><FaChevronLeft className="mr-2 text-sm"/>Back</div>
        </div>
        <img className="w-1/3" src={RibbonImg} alt="ribbon" />
      </div>
      <div className="flex-1 p-8 mt-24 pb-28">
        {
          abnormalDetails.map((detail, index) => 
            <div key={index} className="flex bg-[#F7F7FF] rounded-lg mb-4 p-4">
              <div className="w-10 h-10 mr-2 rounded-lg" style={{backgroundColor: `rgb(${detail.color})`}} />
              <div className="flex-1">
                <div className="font-bold">{detail.title}</div>
                <div className="text-[#D02B2B]">{detail.value}</div>
                <div className="text-[#5E5D6C]">{detail.description}</div>
              </div>
            </div>
          )
        }
      </div>
      <div className="fixed bottom-0 w-full max-w-[800px] px-8 py-4 flex justify-between border-t-2 border-[#E0DFE4] bg-white">
        <CustomButton width="w-full" isBlue title="Chat with a Doctor" func={goToDoctor} />
      </div>
    </div>
  )
}

export default DetailPage;