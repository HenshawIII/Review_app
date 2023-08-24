import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import {Routes,Route,BrowserRouter} from "react-router-dom"
import RestaurantsList from './components/restaurantsList';
import Login from './components/login';
import Restaurant from './components/restaurants';
import { UserProvider } from './User';


function Index(){
  
  return(
    <>
    <BrowserRouter>
    <UserProvider>
      <App/>
<Routes>

  <Route  path='/' element={<RestaurantsList/>} />

  <Route path="/restaurants" element={<RestaurantsList />}/>
  <Route path ="/login" element={<Login />}/>
  <Route path="/:id/restaurant" element={<Restaurant/>}/>
  <Route path='*' element={<div className='flex items-center justify-center h-screen bg-slate-700 p-2 font-bold text-3xl text-gray-200'><h1>Not found 404</h1></div>}/>
</Routes>
</UserProvider>
</BrowserRouter>
    </>
  )


}

createRoot(document.getElementById('root')).render(<Index/>)
