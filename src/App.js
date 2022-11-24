import './App.css';
import { RouterProvider } from 'react-router-dom'
import router from './routes/Routes/Routes';
import { Toaster } from 'react-hot-toast';

function App() {
  // const current = new Date();
  // const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  // console.log(date);
  return (
    <div className='max-w-[1440px] mx-auto'>
      <RouterProvider router={router}></RouterProvider>
      <Toaster/>
    </div>
  );
}

export default App;
