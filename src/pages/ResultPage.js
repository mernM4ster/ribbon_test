import { useState } from "react";
import { useLocation } from "react-router-dom";
import LandingResultContainer from "../containers/LandingResultContainer";
import DetailResultContainer from "../containers/DetailResultContainer";

const ResultPage = () => {
  document.body.style = 'background: #FFFFFF;';

  const { state } = useLocation();
  const [isDetailPage, setIsDetailPage] = useState(false);
  const goToLanding = () => {
    setIsDetailPage(false);
  }

  return (
      !isDetailPage
        ? <LandingResultContainer goToDetail={setIsDetailPage} data={state.data} />
        : <DetailResultContainer goToBack={goToLanding} data={state.data} />
  )
}

export default ResultPage;