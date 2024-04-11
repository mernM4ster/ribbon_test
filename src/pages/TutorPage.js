import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BodyImg from "../assets/img/body.png";
import UrineImg from "../assets/img/urine.png";
import DetectionImg from "../assets/img/detection.png";
import GoalImg from "../assets/img/goal.png";
import CustomButton from "../components/CustomButton";

const STEPS = [
  {
    title: "The Body",
    description: "The human body contains five organs that are considered vital for survival. They are the heart, brain, kidneys, liver, and lungs.",
    img: BodyImg
  },
  {
    title: "Your Urine",
    description: "Problems in our bodies may lead to issues in our liver and kidneys which may eventually be detected in our urine.",
    img: UrineImg
  },
  {
    title: "Detection",
    description: "Common diseases that can be detected by urine tests include Diabetes, Kidney Disease, Liver Disease and certain types of Cancer.",
    img: DetectionImg
  },
  {
    title: "Our Goal",
    description: "Ribbon can't answer all the questions about your health. We provide a clue that something may be wrong, so medical professionals can look further into the issue.",
    sub_description: "*Ribbon still recommends visiting your doctor for annual checkups. This product is not intended for use in diagnosing diseases or other conditions; determining or monitoring the state of health; or curing, mitigating, treating or preventing and diseases.",
    img: GoalImg
  },
]

const TutorPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(0);

  const goToNext = () => {
    if (step < STEPS.length - 1) {
      navigate(`/tutor?step=${step + 1}`)
    } else {
      navigate("/step?step=0");
    }
  }

  const skip = () => {
    navigate("/step");
  }

  useEffect(() => {
    if (searchParams.get("step")) {
      setStep(parseInt(searchParams.get("step")));
    }
  }, [searchParams]);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="flex-1 w-full p-8 public-sans text-center overflow-auto mb-24">
        <img className="w-full" src={STEPS[step].img} alt="tutor" />
        <div className="font-bold text-3xl mt-2">{STEPS[step].title}</div>
        <div className="text-[#5E5D6C] text-xl font-medium mt-2">{STEPS[step].description}</div>
        {
          STEPS[step].sub_description && <div className="text-sm text-[#0052FF] mt-4">{STEPS[step].sub_description}</div>
        }
      </div>
      <div className="fixed bottom-0 w-full max-w-[800px] px-8 py-4 flex justify-between border-t-2 border-[#E0DFE4] bg-white">
        <CustomButton width="w-40" title="Skip Intro" func={skip} />
        <CustomButton width="w-40" isBlue title="Next" func={goToNext} />
      </div>
    </div>
  )
}

export default TutorPage;