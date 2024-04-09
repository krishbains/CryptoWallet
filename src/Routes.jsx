import React, { useState ,useContext,useEffect} from 'react';
import TransactionHistoryPage from "./components/transactionpage/transactionHistoryPage.jsx";
import SendPage from "./components/sendpage/sendpage.jsx";
import Login from "./components/Login/Login.jsx";
import BasePageDesktop from "./components/basepage/basepagedesktop.jsx";
import Register from "./components/Login/Register.jsx";
import {BrowserRouter as Router,Routes, Route,Navigate } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import Dashboard from "./components/Dashboard/Dashboard.js";
import axios from 'axios';
import {Toaster} from 'react-hot-toast'
import{UserContextProvider} from "./context/userContext.jsx"
import { UserContext } from './context/userContext';
import { LiveChat } from './components/chat/LiveChat.js';




axios.defaults.baseURL= 'http://localhost:8000';
axios.defaults.withCredentials = true

export const createDashboardAxios = () => {
  return axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: false, // Disable credentials for Dashboard
  });
};

export const AppRoute = () =>{
  const {user} = useContext(UserContext)
  
    return (

        <div>
          <AnimatePresence>
            <UserContextProvider>
            <Toaster position="bottom-right" toastOptions={{duration: 2000}}/>
            <Router>
              <Routes>
              <Route path="/" exact element={<BasePageDesktop />}/>
                <Route path="/livechat" exact element={<LiveChat />}/>
                <Route path="/login" exact element={<Login/>}/>
                <Route path="/register" exact element={<Register/>}/>
                <Route path="/sendpage" exact element={<SendPage />}/>
                <Route path="/Dashboard" exact element={<Dashboard axiosInstance={createDashboardAxios()} />}/>
                <Route path="/transactionhistory" exact element={<TransactionHistoryPage />}/>
              </Routes>
            </Router>
            </UserContextProvider>
          </AnimatePresence>
        </div>
    );
}