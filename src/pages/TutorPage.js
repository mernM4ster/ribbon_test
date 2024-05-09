import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CustomButton from "../components/CustomButton";

import { Player } from '@lottiefiles/react-lottie-player';
import lottieTwo from "../assets/lotties/2lottie.json";
import lottieFour from "../assets/lotties/4lottie.json";


const STEPS = [
  {
    title: "Your Urine",
    description: "Problems in your body may lead to issues in your liver and kidneys which may be detected in your urine.",
    img: lottieTwo
  },
  {
    title: "Our Goal",
    description: "Ribbon can't answer all the questions about your health. We provide a clue that something may be wrong, so medical professionals can look further into the issue.",
    sub_description: "*Ribbon still recommends visiting your doctor for annual checkups. This product is not intended for use in diagnosing diseases or other conditions; determining or monitoring the state of health; or curing, mitigating, treating or preventing and diseases.",
    img: lottieFour
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


  let lottieClass = "w-full";
  if (step === 0) {
    lottieClass = "w-full pb-5";
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="flex-1 w-full p-8 public-sans text-center overflow-auto mb-24">
        <Player
          src={STEPS[step].img}
          className={lottieClass}
          loop
          autoplay
        />
        <div className="font-bold text-3xl mt-2">{STEPS[step].title}</div>
        <div className="text-[#5E5D6C] text-xl font-medium mt-2">{STEPS[step].description}</div>
        {
          STEPS[step].sub_description && <div className="text-sm text-[#0052FF] mt-4">{STEPS[step].sub_description}</div>
        }
        {
          step === 0 &&
          <div className="text-[#ab0000] text-xl font-medium mt-2 flex-end mt-5">
            **Keep the test strip packaging closed when not in use.
            If the test strip packaging is left open the tests will be damaged.
          </div>

        }
      </div>

      <div className="gap-2 fixed bottom-0 w-full max-w-[800px] px-8 py-4 flex justify-between border-t-2 border-[#E0DFE4] bg-white">
        <CustomButton width="w-1/2" title="Skip Intro" func={skip} />
        <CustomButton width="w-1/2" isBlue title="Next" func={goToNext} />
      </div>
    </div>
  )
}

export default TutorPage;