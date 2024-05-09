import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import RibbonImg from "../assets/img/ribbon-blue-large.png";

const DownloadPage = () => {
  const navigate = useNavigate();

  const goToBack = () => {
    navigate(-1);
  }

  const openTelehealth = () => {
    let url = "https://www.justanswer.com/sip/doctors-on-call"
    window.open(url, '_blank');
  }

  return (
    <div className="w-full flex flex-col public-sans">
      <div className="fixed flex flex-col w-full max-w-[800px] border-b-2 px-8 py-5 bg-white border-[#E0DFE4] flex items-center">
        <div className="w-full flex items-start">
          <div className="flex items-center text-[#0052FF] text-xl" onClick={goToBack}><FaChevronLeft className="mr-2 text-sm"/>Back</div>
        </div>
        <img className="w-1/3" src={RibbonImg} alt="ribbon" />
      </div>
      <div className="flex-1 p-8 mt-32 text-center">
        <div className="text-3xl font-bold">
          Talk to a Doctor
        </div>
        <div className="my-8">
          Ribbon recommends chatting with a telehealth doctor. 
        </div>
        <div className="">
          Chat with a doctor online, right now, without leaving your house for primary care, non-emergency care, therapy and nutrition. Affordable, convenient care by phone or video.
        </div>
      </div>
      <div className="fixed bottom-0 w-full max-w-[800px] px-4 py-4 flex flex-col bg-white border-t-2 border-[#E0DFE4]">
        <CustomButton width="w-full" isBlue title="Chat Now" func={openTelehealth} />
      </div>
    </div>
  )
}

export default DownloadPage;