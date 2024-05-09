import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import NoSleep from 'nosleep.js';
import MyRoutes from './routes';
import './App.css';

function App() {
  const noSleep = new NoSleep();
  useEffect(() => {
    document.addEventListener('click', function enableNoSleep() {
      document.removeEventListener('click', enableNoSleep, false);
      noSleep.enable();
    }, false);
  }, [])

  return (
    <div className="stretch-height flex justify-center max-w-[800px] mx-auto">
      <BrowserRouter>
        <MyRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
