import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Applications from './pages/Applications'
import Home from './pages/Home'
import ApplyJobs from './pages/ApplyJobs'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/apply-job/:id' element={<ApplyJobs/>} />
        <Route path='/application' element={<Applications/>} />
      </Routes>
    </div>
  )
}

export default App