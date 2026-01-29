import { useState } from 'react'
import './App.css'
import {Route, BrowserRouter as  Router, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import AddMealPage from './pages/AddMealPage'
import Navbar from './Components/Navbar'
import AvailableMealsPage from './pages/AvailableMealsPage'

function App() {

  return (
    <Router>
      <div style={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
        <Navbar/>
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/mealsList' element={<AvailableMealsPage/>}/>
            <Route path='/addMealsP' element={<AddMealPage/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
