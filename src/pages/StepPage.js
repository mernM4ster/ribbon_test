import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaVolumeLow , FaVolumeOff  } from "react-icons/fa6";
import CustomButton from "../components/CustomButton";
import UrinePhoto from "../assets/img/photo_one_urine_16x9.jpg";
import FourPhoto from "../assets/img/take-photo-4.jpg";
import ThreePhoto from "../assets/img/photo_three_black_area.jpg";
import ribbonLoop from "../assets/mp4/Ribbon_Dip_Loop_Compressed.mp4";
import AlertMP3 from "../assets/audio/alert.mp3";

const STEPS = [
  {
    title: "Urinate in the provided test cup.",
    description: "Try to fill the cup at least 3/4 of the way to ensure a good result.",
    btn_title: "Next",
    media: UrinePhoto
  },
  {
    title: "Dip the test strip for 1-2 seconds, dry the edge, and place on color card.",
    description: "Confirm all pads have been wetted by clicking the button below.",
    btn_title: "All pads were wetted",
    media: ribbonLoop
  },
  {
    title: "Be sure the test strip is in the black area of color card.",
    description: "Don’t worry, as long as the strip is in the black rectangle, it can be upside down.",
    btn_title: "Next",
    media: ThreePhoto
  },
  {
    title: "When the timer runs out, take a photo.",
    description: "After the strip has developed you will be able to take a photo. Ribbon will then analyze your photo and show you the results.",
    btn_title: "Take photo",
    media: FourPhoto
  },
]

const audioElement = new Audio(AlertMP3);
audioElement.loop = true;

const TIMER_LENGTH = process.env.REACT_APP_TIMER_LENGTH;

const StepPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(0);
  const [timer, setTimer] = useState(TIMER_LENGTH);
	const [timerId, setTimerId] = useState(null);
  const [min, setMin] = useState("0");
  const [sec, setSec] = useState("00");
  const [isAlarmStart, setIsAlarmStart] = useState(false);
  const [onAudio, setOnAudio] = useState(true);
  const [isButtonDisaabled, setIsButtonDisabled] = useState(false);

  document.body.style = 'background: #FFFFFF;';

  const goToNext = () => {
    if (step < STEPS.length - 1) {
      navigate(`/step?step=${step + 1}`)
      if (step === 1 && timerId === null && timer > 0) {
        audioElement.play();
        audioElement.pause();
        const current = Math.floor(Date.now() / 1000);
        localStorage.setItem("target", current + parseInt(TIMER_LENGTH));
        const newTimerId = setInterval(onTimer, 1000);
        localStorage.setItem("timerId", newTimerId);
        setTimerId(newTimerId);
      }
    } else {
      localStorage.setItem("timerId", null);
      isAlarmStart && audioElement.pause();
      // navigate("/camera");
      const fileInput = document.createElement("input");
      fileInput.capture = "capture";
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.click();

      fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        fileInput.remove();
        navigate("/camera", {state: { data: file}});
      });

      fileInput.addEventListener("cancel", () => {
        navigate(0)
        fileInput.remove();
      });
    }
  }

  const handleFileChange = (event) => {
    localStorage.setItem("timerId", null);
    isAlarmStart && audioElement.pause();
    const file = event.target.files[0];
    navigate("/camera", {state: { data: file}});
  }

  const playAlarm = () => {
    setIsAlarmStart(true);
    audioElement.play();
    setTimeout(() => {
      audioElement.pause();
      setIsAlarmStart(false);
    }, 6000);
  };

  const onTimer = () => {
    const current = Math.floor(Date.now() / 1000);
    const target = parseInt(localStorage.getItem("target"));
    setTimer(target - current);
  }

  const switchAudio = (flag) => {
    setOnAudio(flag);
    audioElement.pause();
  }

  const back = () => {
    if (step > 0) {
      navigate(`/step?step=${step - 1}`);
      setIsButtonDisabled(false);
    } else {
      navigate(`/tutor?step=0`);
    }
  }

  useEffect(() => {
    if (timerId) {
      if (timer <= 0) {
        clearInterval(timerId);
        if (onAudio) {
          playAlarm()
        } 
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
    if (step === STEPS.length - 1 && timer > 0) {
      setIsButtonDisabled(true)
    } else {
      setIsButtonDisabled(false)
    }
  }, [step, timer])

  useEffect(() => {
    if (searchParams.get("step")) {
      setStep(parseInt(searchParams.get("step")));
    }
  }, [searchParams]);

  return (
    <div className="w-full flex flex-col items-center justify-center">
    <div className="flex-1 w-full public-sans text-left overflow-auto mb-40">
      {
        !!timerId &&
          <div className="flex items-center justify-center bg-[#0052FF] text-center py-2 text-white font-bold text-xl">
            <span>{min} : {sec}</span>
            {
              onAudio
                ? <button className='ml-2' onClick={() => switchAudio(false)}><FaVolumeLow  /></button>
                : <button className='ml-2' onClick={() => switchAudio(true)}><FaVolumeOff /></button>
            }
          </div>
      }
      <div className="overflow-y-hidden w-full h-48 bg-[#363636] text-[#4480FF] flex items-center justify-center text-3xl font-bold" >
        
        { [0, 2, 3].includes(step) &&
          <img className="w-full" src={STEPS[step].media} alt="step_img"/>
        }

        { [1].includes(step) &&
        <video playsInline muted autoPlay controls='' preload="auto" loop style={{pointerEvents: "none"}}>
          <source src={STEPS[step].media} type="video/mp4"/>
        </video>
        }

      </div>
      <div className="font-bold text-3xl mt-4 px-8">{STEPS[step].title}</div>
      <div className="text-[#5E5D6C] text-2xl font-medium mt-4 px-8">{STEPS[step].description}</div>
    </div>
    <div className="fixed bottom-0 w-full max-w-[800px] px-4 py-4 flex flex-col bg-white">
    {
      step === 3 ?
    <div className="flex w-full">
      <label 
        htmlFor="photoTaker"
        className={`text-center rounded-full p-4 public-sans font-bold text-base w-full bg-[#0052FF] text-white cursor-pointer ${isButtonDisaabled ? "opacity-30" : ""}`}>
        Take Photo
      </label>
      <input
        id="photoTaker"
        type="file"
        accept="image/*"
        className="hidden"
        capture
        onChange={handleFileChange}
        disabled={isButtonDisaabled}
        >
        </input>
    </div>
      :
      <CustomButton width="w-full" isBlue disabled={isButtonDisaabled} title={STEPS[step].btn_title} func={goToNext} />
    }
      <CustomButton width="w-full mt-4" title="Back" func={back} />
    </div>
  </div>
  )
}

export default StepPage;