import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import HomeScreen from './screens/HomeScreen';
import GarageScreen from './screens/GarageScreen';
import SideNav from './components/SideNav';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ParkinfoScreen from './screens/Parkinfo';
import OrderListScreen from './screens/OrderListScreen';

function App() {

  return (
    <Router>
      <SideNav></SideNav>

      <main className='mainscreen'>
        <Routes>
          <Route path="/" element={<HomeScreen />} exact></Route>
          <Route path="/garage/:id" element={<GarageScreen />} ></Route>
          <Route path="/login" element={<LoginScreen />} ></Route>
          <Route path="/register" element={<RegisterScreen />} ></Route>
          <Route path="/park/:id" element={<ParkinfoScreen />} ></Route>
          <Route path="/garage/:id/:number" element={<ParkinfoScreen />} ></Route>
          <Route element={<PrivateRoute />} >
          </Route>
          <Route element={<AdminRoute />}>
            <Route path="/orders" element={<OrderListScreen />} ></Route>
          </Route>

        </Routes>
      </main>

    </Router>
  );
}

export default App;