import './App.css';
import { RouterProvider } from 'react-router-dom'
import router from './routes/Routes/Routes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="max-w-[1440px] mx-auto bg-slate-900 text-slate-100">
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;
