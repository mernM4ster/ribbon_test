import ProgressBar from "@ramonak/react-progress-bar";
import { FaChevronRight } from "react-icons/fa";
import RibbonImg from "../assets/img/ribbon-blue.png";
import CustomButton from "../components/CustomButton";

const ResultPage = () => {
  return (
    <div className="w-full flex flex-col public-sans">
      <div className="fixed w-full max-w-[800px] border-b-2 p-8 bg-white border-[#E0DFE4] flex justify-center">
        <img src={RibbonImg} alt="ribbon" />
      </div>
      <div className="m-8 mt-32 p-8 border-2 bourder-[#E0DFE4] rounded-lg text-center">
        <div className="text-[#0052FF] text-xl font-bold">Good news!</div>
        <div className="text-3xl my-4 font-bold">10/10 results are normal today!</div>
        <div className="flex">
          <ProgressBar className="flex-1 flex items-center" completed={100} height="12px" isLabelVisible={false} bgColor="#1B995A" />
          <span className="ml-2">10/10</span>
        </div>
      </div>
      <div className="px-8">
        <div className="text-center mb-4 text-xl font-bold">Results View:</div>
        <div className="flex justify-between mb-4">
          <CustomButton isBlue small title="Your View" width="w-40" />
          <CustomButton small title="Doctor's View" width="w-40" />
        </div>
        <div className="flex">
          <div className="w-8" />
          <div className="flex-1 flex flex-col text-xl">
            <div className="flex justify-between mb-2">
              <div className="flex-1">White Blood Cell Test</div>
              <div className="flex items-center text-[#1B995A]">Normal <FaChevronRight className="ml-2 text-[#43465C] text-sm"/></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="">Bacteria Test</div>
              <div className="flex items-center text-[#1B995A]">Normal <FaChevronRight className="ml-2 text-[#43465C] text-sm"/></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="">1st Liver Test</div>
              <div className="flex items-center text-[#1B995A]">Normal <FaChevronRight className="ml-2 text-[#43465C] text-sm"/></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="">1st Kidney Test</div>
              <div className="flex items-center text-[#1B995A]">Normal <FaChevronRight className="ml-2 text-[#43465C] text-sm"/></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="">Acidity Test</div>
              <div className="flex items-center text-[#1B995A]">Normal <FaChevronRight className="ml-2 text-[#43465C] text-sm"/></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="">2nd Kidney Test</div>
              <div className="flex items-center text-[#1B995A]">Normal <FaChevronRight className="ml-2 text-[#43465C] text-sm"/></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="">Hydration Test</div>
              <div className="flex items-center text-[#1B995A]">Normal <FaChevronRight className="ml-2 text-[#43465C] text-sm"/></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="">1st Diabetes Test</div>
              <div className="flex items-center text-[#1B995A]">Normal <FaChevronRight className="ml-2 text-[#43465C] text-sm"/></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="">2nd Liver Test</div>
              <div className="flex items-center text-[#1B995A]">Normal <FaChevronRight className="ml-2 text-[#43465C] text-sm"/></div>
            </div>
            <div className="flex justify-between mb-2">
              <div className="">2nd Diabetes Test</div>
              <div className="flex items-center text-[#1B995A]">Normal <FaChevronRight className="ml-2 text-[#43465C] text-sm"/></div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-8 ">
        <CustomButton isBlue title="Get a Doctor's Opinion" width="w-full" />
      </div>
    </div>
  )
}

export default ResultPage;