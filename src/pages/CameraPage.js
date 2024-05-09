import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaChevronLeft } from "react-icons/fa";
import CustomButton from "../components/CustomButton";
import { SERVER_URL } from "../consts/const";
import SpinnerImg from "../assets/img/spinner.gif";
import posthog from 'posthog-js';

const CameraPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
	const videoRef = useRef(null);
	const canvasRef = useRef(null);
	const mediaStreamRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isVideo, setIsVideo] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [reTakePhoto, setReTakePhoto] = useState(false);
  const [file, setFile] = useState(false);

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

  document.body.style = 'background: #0052FF;';

  const onTakePhoto = () => {
    setSelectedImage(canvasRef.current.toDataURL());

    if (mediaStreamRef.current && mediaStreamRef.current.getTracks) {
      mediaStreamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
    }
	}

  const reTake = () => {
    // navigate(0);
    const fileInput = document.createElement("input");
    fileInput.capture = "capture";
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.click();

    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      fileInput.remove();
      setSelectedImage(URL.createObjectURL(file))
      setFile(file)
      setReTakePhoto(false);
    });

    fileInput.addEventListener("cancel", () => {
      navigate(0)
      fileInput.remove();
    });
  }

  const goBack = () => {
    navigate(-1);
  }

  const goToNext = async () => {
    const formData = new FormData();
    // const fileFromImg = dataURLtoFile(uri);
    formData.append("image", file);
    try {
      setIsLoading(true);
      const res = await axios.post(SERVER_URL, formData);
      setIsLoading(false);
      console.log("Scan complete", res.data.scan_order_no, res.data.scan_uuid)
      if (['prod', 'stg'].includes(process.env.REACT_APP_ENV)) {
        posthog.capture('scan_succeeded', {
            scan_order_no: res.data.scan_order_no,
            scan_uuid: res.data.scan_uuid
        })
      }
      navigate("/result", {state: { data: res.data}})
    } catch (error) {
      setReTakePhoto(true);
      setIsLoading(false);
      console.log("scan failed")
      if (['prod', 'stg'].includes(process.env.REACT_APP_ENV)) {
        posthog.capture('scan_failed')
      }
    }
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };
  
  useEffect(() => {
    setFile(state.data)
    setSelectedImage(URL.createObjectURL(state.data))
  }, [state])

  // useEffect(() => {
  //   if(isVideo === 1){
  //     const video = videoRef.current;
  //     const canvas = canvasRef.current;
  //     const context = canvas.getContext('2d');
  
  //     const onLoad = () => {
  //       canvas.width = parseInt(canvas.style.width);
  //       canvas.height = parseInt(canvas.style.height);
  
  //       video.addEventListener('loadedmetadata', () => {
  //         canvas.width = video.videoWidth;
  //         canvas.height = video.videoHeight;
  //         requestAnimationFrame(tick);
  //       });
  
  //       navigator.mediaDevices
  //         .getUserMedia({ video: {facingMode: 'environment'} })
  //         .then(function (stream) {
  //           if ('srcObject' in video) {
  //             mediaStreamRef.current = stream;
  //             video.srcObject = stream;
  //           } else {
  //             video.src = window.URL.createObjectURL(stream);
  //           }
  //         })
  //         .catch(function (err) {
  //           console.log(err.name + ': ' + err.message);
  //           const fileInput = document.createElement("input");
  //           fileInput.capture = "capture";
  //           fileInput.type = "file";
  //           fileInput.accept = "image/*";
  //           fileInput.click();
  
  //           fileInput.addEventListener("change", (event) => {
  //             handleImageUpload(event);
  //             fileInput.remove();
  //           });
  
  //           fileInput.addEventListener("cancel", () => {
  //             navigate(-1)
  //             fileInput.remove();
  //           });
  //         });
  //     };
  
  //     const tick = () => {
  //       requestAnimationFrame(tick);
  
  //       if (video.readyState === video.HAVE_ENOUGH_DATA) {
  //         snapshot();
  //       }
  //     };
  
  
  
  //     const snapshot = () => {
  //       context.drawImage(video, 0, 0, canvas.width, canvas.height);
  //     };
  
  //     onLoad();
  //   } else {
  //     setIsVideo(isVideo + 1)
  //   }
  //   // requestAnimationFrame( animate );

  //   return () => {
  //     if (mediaStreamRef.current && mediaStreamRef.current.getTracks) {
  //       mediaStreamRef.current.getTracks().forEach((track) => {
  //         track.stop();
  //       });
  //     }
  //     // Clean up any resources or event listeners here
  //   };
  // }, [isVideo]);

  return (
    !isLoading
      ? <div className="w-full bg-black flex flex-col">
        {
          selectedImage
            && <div className="flex-1 relative">
              <img id="selectedImg" className="w-full h-full object-cover" src={selectedImage} alt="img" />
              {
                !reTakePhoto 
                  ? <div className="absolute w-full bottom-0 bg-white rounded-t-xl p-8 public-sans">
                    <div className="font-bold text-xl mb-2">
                      Is your photo in focus and in good lighting?
                    </div>
                    <div className="text-lg mb-4">
                      Please make sure the entire test strip and scan card are visible.
                    </div>
                    <div className="flex justify-between">
                      <CustomButton width="w-40" title="Retake" func={reTake} />
                      <CustomButton isBlue width="w-40" title="Yes" func={goToNext} />
                    </div>
                  </div>
                  : <div className="absolute w-full h-full top-0 flex items-center justify-center">
                    <div className="w-3/4 bg-white p-4 rounded-lg public-sans">
                      <div className="font-bold text-xl mb-2">Sorry, we weren’t able to analyze your photo.</div>
                      <div className="text-lg mb-8">Make sure your photo is in focus and well lit. The entire test strip and scan card should be visible.</div>
                      <CustomButton isBlue width="w-full" title="Retake" func={reTake} />
                    </div>
                  </div>
              }
              </div>
            // : <>
            //   <div className="text-white px-8 public-sans text-center">
            //     <div className="text-xl font-bold">Capture Card and Test Strip</div>
            //     <div className="text-base">
            //       Avoid shadows. Take photo in the best available lighting.
            //     </div>
            //   </div>
            //   <div className="p-8 flex-1">
            //     <div id='camera-section' className='w-full h-full z-10 right-0'>
            //       <div className='relative w-full h-full flex justify-center items-center'>
            //         <video className='w-full h-full object-cover hidden' ref={videoRef} autoPlay playsInline />
            //         <canvas ref={canvasRef} className="w-full h-full object-cover rounded-xl"></canvas>
            //         <div className='absolute bottom-0 w-full p-8 flex items-center justify-center'>
            //           <button
            //             className='text-white text-2xl'
            //             onClick={onTakePhoto}
            //           ><div className='w-16 h-16 bg-white rounded-full'></div></button>
            //         </div>
            //       </div>
            //     </div>
            //   </div>
            // </>
        }
      </div>
    : <div className='w-full h-full bg-[#0052FF] flex flex-col items-center justify-between beatrice-font text-white'>
      <img className='w-40 xxs:w-52 xs:w-60 mt-16' src={selectedImage} alt='img' />
      <div className='flex flex-col items-center public-sans'>
        <img className='w-40' src={SpinnerImg} alt='spinner' />
        <div className='text-lg'>Ribbon is Analyzing Your Results</div>
      </div>
      <div className='flex my-8'>
      </div>
    </div>
  );
}

export default CameraPage;