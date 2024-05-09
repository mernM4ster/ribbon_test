import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import SplashPage from "./pages/SplashPage";
import TutorPage from "./pages/TutorPage";
import StepPage from "./pages/StepPage";
import CameraPage from "./pages/CameraPage";
import ResultPage from "./pages/ResultPage";
import DownloadPage from "./pages/DownloadPage";
import DetailPage from "./pages/DetailPage";
import posthog from 'posthog-js';

const MyRoutes = () => {

  let location = useLocation();
    useEffect(() => {
      if (['prod', 'stg'].includes(process.env.REACT_APP_ENV)) {
        posthog.capture('$pageview')
        console.log("PostHog: pageview")
      }
    }, [location]);

  return (
    <Routes>
      <Route path="/splash" element={<SplashPage />} />
      <Route path="/tutor" element={<TutorPage />} />
      <Route path="/step" element={<StepPage />} />
      <Route path="/camera" element={<CameraPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/download" element={<DownloadPage />} />
      <Route path="/detail" element={<DetailPage />} />
      <Route path="*" element={<Navigate to="/splash" replace />} />
    </Routes> 
  )
}

export default MyRoutes;