// import logo from './logo.svg';
// import './App.css
import React,{useContext} from "react";
import {Link, useSearchParams} from "react-router-dom";
import { UserContext } from "./User";




function App() {
    const {user,logOut} = useContext(UserContext)
  return (
    <>
    <div>
    <div className="bg-slate-300 p-2 flex justify-between items-center text-gray-100">
      <h1 className="text-3xl p-2 font-bold">Restaurants.com</h1>
      <nav>
        <ul className="md:flex justify-normal hidden ">
          <li className="ml-3 cursor-pointer p-2 hover:bg-white hover:text-gray-700"><Link to="/restaurants">Home</Link></li>
          <li className="ml-3 cursor-pointer p-2 hover:bg-white hover:text-gray-700"><Link to="/">About</Link></li>
          <li className="ml-3 cursor-pointer p-2 hover:bg-white hover:text-gray-700"><Link to="/">Contact</Link></li>
          {user? (<li className="ml-3 cursor-pointer p-2 hover:bg-white hover:text-gray-700"><span onClick={()=>logOut()}> Logout {user}</span></li>):<li className="ml-3 cursor-pointer p-2 hover:bg-white hover:text-gray-700"><Link to="/login">Login</Link></li>}
        </ul>
      </nav>
   </div>
   {/* <AddReview/>
      <Login/>
      <Restaurants/>
      <RestaurantsList/> */}
   </div>
        </>
  );
}

export default App;
