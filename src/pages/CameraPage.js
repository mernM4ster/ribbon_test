import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import CustomButton from "../components/CustomButton";
import SpinnerImg from "../assets/img/spinner.gif";

const CameraPage = () => {
  const navigate = useNavigate();
	const videoRef = useRef(null);
	const canvasRef = useRef(null);
	const mediaStreamRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isVideo, setIsVideo] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const onTakePhoto = () => {
    setSelectedImage(canvasRef.current.toDataURL());

    if (mediaStreamRef.current && mediaStreamRef.current.getTracks) {
      mediaStreamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
    }
	}

  const reTake = () => {
    navigate(0);
  }

  const goBack = () => {
    navigate(-1);
  }

  const goToNext = async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 5000));
    localStorage.setItem("result", selectedImage);
    setIsLoading(false);
    navigate("/result")
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log("file", file)
    setSelectedImage(URL.createObjectURL(file));
  };

  useEffect(() => {
    if(isVideo === 1){
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
  
      const onLoad = () => {
        canvas.width = parseInt(canvas.style.width);
        canvas.height = parseInt(canvas.style.height);
  
        video.addEventListener('loadedmetadata', () => {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          requestAnimationFrame(tick);
        });
  
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
              handleImageUpload(event);
              fileInput.remove();
            });
  
            fileInput.addEventListener("cancel", () => {
              navigate(-1)
              fileInput.remove();
            });
          });
      };
  
      const tick = () => {
        requestAnimationFrame(tick);
  
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          snapshot();
        }
      };
  
  
  
      const snapshot = () => {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
      };
  
      onLoad();
    } else {
      setIsVideo(isVideo + 1)
    }
    // requestAnimationFrame( animate );

    return () => {
      if (mediaStreamRef.current && mediaStreamRef.current.getTracks) {
        mediaStreamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      }
      // Clean up any resources or event listeners here
    };
  }, [isVideo]);

  return (
    !isLoading
      ? <div className="w-full bg-black flex flex-col">
        <div className="text-white px-8 py-4" onClick={goBack}><FaChevronLeft color="white" /></div>
        {
          selectedImage
            ? <div className="flex-1 relative">
              <img className="w-full h-full object-cover" src={selectedImage} alt="img" />
              <div className="absolute w-full bottom-0 bg-white rounded-t-xl p-8 public-sans">
                <div className="font-bold text-xl mb-2">
                  Is your photo in focus and well lit?
                </div>
                <div className="text-lg mb-4">
                  Please make sure the entire test strip and scan card are visible.
                </div>
                <div className="flex justify-between">
                  <CustomButton width="w-40" title="Retake" func={reTake} />
                  <CustomButton isBlue width="w-40" title="Yes, looks good" func={goToNext} />
                </div>
              </div>
            </div>
            : <>
              <div className="text-white px-8 public-sans">
                <div className="text-xl font-bold">Capture Card and Test Strip</div>
                <div className="text-base">Avoid shadows. Move your phone closer and further from the card and strip until you capture an image.</div>
              </div>
              <div className="p-8 flex-1">
                <div id='camera-section' className='w-full h-full z-10 right-0'>
                  <div className='relative w-full h-full flex justify-center items-center'>
                    <video className='w-full h-full object-cover hidden' ref={videoRef} autoPlay playsInline />
                    <canvas ref={canvasRef} className="w-full h-full object-cover rounded-xl"></canvas>
                    <div className='absolute bottom-0 w-full p-8 flex items-center justify-center'>
                      <button
                        className='text-white text-2xl'
                        onClick={onTakePhoto}
                      ><div className='w-16 h-16 bg-white rounded-full'></div></button>
                    </div>
                  </div>
                </div>
              </div>
            </>
        }
      </div>
    : <div className='w-full h-full bg-[#0052FF] flex flex-col items-center justify-between beatrice-font text-white'>
      <img className='w-40 xxs:w-52 xs:w-60 mt-16' src={selectedImage} alt='img' />
      <div className='flex flex-col items-center public-sans'>
        <img className='w-40' src={SpinnerImg} alt='spinner' />
        <div className='text-xl'>AI Doc Engaged</div>
        <div className='text-lg'>Stix back and relax</div>
      </div>
      <div className='flex my-8'>
      </div>
    </div>
  );
}

export default CameraPage;