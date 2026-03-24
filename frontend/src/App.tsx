import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './routes/Register'

import './index.css'

function App() {

  return (
    <>
     <BrowserRouter>
     <div>
      <Routes>
        <Route path="/" />
        <Route path="/register" element={<Register />} />
        <Route path="/home" />
      </Routes>
     </div>
     </BrowserRouter>
    </>
  )
}

export default App
