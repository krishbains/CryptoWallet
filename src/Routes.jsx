import React, { useState ,useContext,useEffect} from 'react';
import TransactionHistoryPage from "./components/transactionpage/transactionHistoryPage.jsx";
import SendPage from "./components/sendpage/sendpage.jsx";
import Login from "./components/Login/Login.jsx";
import BasePageDesktop from "./components/basepage/basepagedesktop.jsx";
import Register from './components/Login/Register.jsx'
import {BrowserRouter as Router,Routes, Route,Navigate } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import Dashboard from "./components/Dashboard/Dashboard.js";
import axios from 'axios';
import {Toaster} from 'react-hot-toast'
import{UserContextProvider} from "./context/userContext.jsx"
import { LiveChat } from './components/chat/LiveChat.js';
import Withdraw_page from './components/withdrawpage/withdraw_page.jsx';
import Deposit_page from './components/depositpage/depositpage.jsx';
import FAQPage from './components/FAQpage/FAQ.jsx';




axios.defaults.baseURL= 'http://localhost:8000';
axios.defaults.withCredentials = true

export const createDashboardAxios = () => {
  return axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: false, // Disable credentials for Dashboard
  });
};

export const AppRoute = () =>{
    return (

        <div>
          <AnimatePresence>
            <UserContextProvider>
            <Toaster position="center" toastOptions={{duration: 2000}}/>
            <Router>
              <Routes>
              <Route path="/" exact element={<BasePageDesktop />}/>
                <Route path="/FAQ" exact element={<FAQPage/>}/>
                <Route path="/livechat" exact element={<LiveChat />}/>
                <Route path="/login" exact element={<Login/>}/>
                <Route path="/register" exact element={<Register/>}/>
                <Route path="/sendpage" exact element={<SendPage />}/>
                <Route path='/deposit' exact element = {<Deposit_page/>}/>
                <Route path="/withdraw" exact element = {<Withdraw_page/>}/>
                <Route path="/Dashboard" exact element={<Dashboard axiosInstance={createDashboardAxios()} />}/>
                <Route path="/transactionhistory" exact element={<TransactionHistoryPage />}/>
              </Routes>
            </Router>
            </UserContextProvider>
          </AnimatePresence>
        </div>
    );
}