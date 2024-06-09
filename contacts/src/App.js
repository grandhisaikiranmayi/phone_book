import React from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from "./components/sideBar"
import Home from "./components/views/home"
import Business from "./components/views/business"
import Female from "./components/views/female"
import Male from "./components/views/male"
import Personal from "./components/views/personal"
const App = () => {
  return (
    <>
      <Router>
        <div className="App">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/business" element={<Business />} />
              <Route path="/female" element={<Female />} />
              <Route path="/male" element={<Male />} />
              <Route path="/personal"  element={<Personal />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  )
}
export default App