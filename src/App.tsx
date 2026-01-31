// App.tsx - UPDATED VERSION
import { useState } from 'react'
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import AddMealPage from './pages/AddMealPage'
import Navbar from './Components/Navbar'
import AvailableMealsPage from './pages/AvailableMealsPage'
import SettingPage from './pages/SettingPage'
import { Provider } from 'react-redux'
import { store } from './store/store'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div style={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
          <Navbar/>
          <div style={{ flex: 1, padding: '20px' }}>
            <Routes>
              <Route path='/' element={<Dashboard/>}/>
              <Route path='/mealsList' element={<AvailableMealsPage/>}/>
              <Route path='/addMealsP' element={<AddMealPage/>}/>
              <Route path='/settingsP' element={<SettingPage/>}/>
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  )
}

export default App