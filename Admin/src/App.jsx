import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Admin from './components/Admin'
import ProductManagement from './components/ProductManagement'
import Sidebar from './components/Sidebar'
import Analysis from './components/Analysis'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route  path="/" element={<Sidebar />}>
            <Route index element={<Admin />} />
            <Route path="/products" element={<ProductManagement />} />
            <Route path="/analysis" element={< Analysis/>} />
          </Route>
        </Routes>

      </BrowserRouter>
    </div>
  )
}
export default App