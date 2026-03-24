import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './routes/Register'
import Login from './routes/Login'

import './index.css'

function App() {

  return (
    <>
     <BrowserRouter>
     <div>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/home" />
      </Routes>
     </div>
     </BrowserRouter>
    </>
  )
}

export default App
