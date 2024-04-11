import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CustomButton from "../components/CustomButton";

const STEPS = [
  {
    title: "Urinate in the provided test cup.",
    description: "Try to fill the cup at least 3/4 of the way to ensure a good result.",
    btn_title: "Next",
    img: ""
  },
  {
    title: "Dip the full test strip for 1-2 seconds and dry edge. ",
    description: "Confirm all pads have been wetted by clicking the button below.",
    btn_title: "All pads were wetted",
    img: ""
  },
  {
    title: "Place test strip on black area of scan card.",
    description: "Don’t worry, as long as the strip is in the black rectangle, it can be upside down.",
    btn_title: "Next",
    img: ""
  },
  {
    title: "When the timer runs out, take a photo.",
    description: "After the strip has developed you will be able to take a photo. Ribbon will then analyze your photo and show you the results.",
    btn_title: "Take photo",
    img: ""
  },
]

const TIMER_LENGTH = 95;

const StepPage = () => {
  const mediaStreamRef = useRef();
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(0);
  const [timer, setTimer] = useState(TIMER_LENGTH);
	const [timerId, setTimerId] = useState(null);
  const [min, setMin] = useState("0");
  const [sec, setSec] = useState("00");

  const goToNext = () => {
    if (step < STEPS.length - 1) {
      navigate(`/step?step=${step + 1}`)
      if (step === 2 && timerId === null && timer > 0) {
        const current = Math.floor(Date.now() / 1000);
        localStorage.setItem("target", current + parseInt(TIMER_LENGTH));
        const newTimerId = setInterval(onTimer, 1000);
        localStorage.setItem("timerId", newTimerId);
        setTimerId(newTimerId);
      }
    } else {
      localStorage.setItem("timerId", null);
      // navigate("/camera");
      document.getElementById("photoTaker").click()
    }
  }

  const onTimer = () => {
    const current = Math.floor(Date.now() / 1000);
    const target = parseInt(localStorage.getItem("target"));
    setTimer(target - current);
  }

  const back = () => {
    if (step > 0) {
      navigate(`/step?step=${step - 1}`);
    } else {
      navigate(`/tutor?step=0`);
    }
  }

  const handleFileChange = () => {}

  const handleInputClick = (e) => {
    e.preventDefault();
    console.log("click")
    const video = videoRef.current;
    navigator.mediaDevices
          .getUserMedia({ video: {facingMode: 'environment'} })
          .then(function (stream) {
            if ('srcObject' in video) {
              mediaStreamRef.current = stream;
              video.srcObject = stream;
            } else {
              video.src = window.URL.createObjectURL(stream);
            }
          })
          .catch(function (err) {
            console.log(err.name + ': ' + err.message);
            const fileInput = document.createElement("input");
            fileInput.capture = "capture";
            fileInput.type = "file";
            fileInput.accept = "image/*";
            fileInput.click();
  
            fileInput.addEventListener("change", (event) => {
              // handleImageUpload(event);
              fileInput.remove();
            });
  
            fileInput.addEventListener("cancel", () => {
              navigate(-1)
              fileInput.remove();
            });
          });
  }

  useEffect(() => {
    if (timerId) {
      if (timer <= 0) {
        clearInterval(timerId);
        setSec("00");
        localStorage.setItem("timerId", null);
        localStorage.setItem("timer", 0);
      } else {
        localStorage.setItem("timer", timer);
        const newMin = Math.floor(timer / 60);
        const newSec = timer % 60;
        setMin(newMin.toString());
        setSec(newSec < 10 ? `0${newSec}` : newSec.toString())
      }
    } else {
      setTimer(TIMER_LENGTH);
    }
  }, [timer, timerId])

  useEffect(() => {
    if (searchParams.get("step")) {
      setStep(parseInt(searchParams.get("step")));
    }
  }, [searchParams]);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <video className='w-full h-full object-cover hidden' ref={videoRef} autoPlay playsInline />
      <div className="flex-1 w-full public-sans text-left overflow-auto mb-40">
        {
          !!timerId &&
            <div className="bg-[#0052FF] text-center py-2 text-white font-bold text-xl"><span>{min} : {sec}</span></div>
        }
        <div className="w-full h-48 bg-[#363636] text-[#4480FF] flex items-center justify-center text-3xl font-bold" src={STEPS[step].img}>{`IMG ${step + 1}`}</div>
        <div className="font-bold text-3xl mt-4 px-8">{STEPS[step].title}</div>
        <div className="text-[#5E5D6C] text-2xl font-medium mt-4 px-8">{STEPS[step].description}</div>
      </div>
      <div className="fixed bottom-0 w-full max-w-[800px] px-4 py-4 flex flex-col bg-white">
        <CustomButton width="w-full" isBlue title={STEPS[step].btn_title} func={goToNext} />
        <CustomButton width="w-full mt-4" title="Back" func={back} />
      </div>
      <input id="photoTaker" type="file" accept="image/*" className="hidden" onChange={handleFileChange} onClick={handleInputClick} />
    </div>
  )
}

export default StepPage;