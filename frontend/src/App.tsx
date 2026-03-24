import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css'

function App() {

  return (
    <>
     <BrowserRouter>
     <div>
      <Routes>
        <Route path="/" />
        <Route path="/register" />
        <Route path="/home" />
      </Routes>
     </div>
     </BrowserRouter>
    </>
  )
}

export default App
