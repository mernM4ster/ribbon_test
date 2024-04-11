import { BrowserRouter } from 'react-router-dom';
import './App.css';
import MyRoutes from './routes';

function App() {
  return (
    <div className="stretch-height flex justify-center max-w-[800px] mx-auto">
      <BrowserRouter>
        <MyRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
