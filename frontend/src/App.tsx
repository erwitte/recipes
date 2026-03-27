import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './routes/Register'
import Login from './routes/Login'
import Home from './routes/Home'
import './index.css'

function App() {

  return (
    <>
     <BrowserRouter>
     <div 
  className="absolute inset-0 
  bg-[url(https://images.pexels.com/photos/14853728/pexels-photo-14853728.jpeg)] 
  bg-[length:100%] bg-center bg-no-repeat flex items-center justify-center">
      <div className="bg-white/60 w-[85%] h-[85%] rounded-xl backdrop-blur-md overflow-auto p-8
      flex items-center justify-center flex-col gap-6
      border border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home/>}/>
        </Routes>
      </div>
     </div>
     </BrowserRouter>
    </>
  )
}

export default App
