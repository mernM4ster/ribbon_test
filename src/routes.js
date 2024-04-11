import { Routes, Route } from "react-router-dom";
import SplashPage from "./pages/SplashPage";
import TutorPage from "./pages/TutorPage";
import StepPage from "./pages/StepPage";
import CameraPage from "./pages/CameraPage";
import ResultPage from "./pages/ResultPage";

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/tutor" element={<TutorPage />} />
      <Route path="/step" element={<StepPage />} />
      <Route path="/camera" element={<CameraPage />} />
      <Route path="/result" element={<ResultPage />} />
    </Routes>
  )
}

export default MyRoutes;