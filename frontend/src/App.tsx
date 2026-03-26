import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './routes/Register'
import Login from './routes/Login'
import './index.css'

function App() {

  return (
    <>
     <BrowserRouter>
     <div 
  className="absolute inset-0 bg-[url(https://images.pexels.com/photos/14853728/pexels-photo-14853728.jpeg)] bg-[length:100%] bg-center bg-no-repeat flex items-center justify-center">
      <div className="bg-white/60 w-[85%] h-[85%] rounded-xl backdrop-blur-md overflow-auto p-8">
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/home" />
        </Routes>
      </div>
     </div>
     </BrowserRouter>
    </>
  )
}

export default App
