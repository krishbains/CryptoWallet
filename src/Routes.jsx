import BasePage from "./components/basepage/basepage.jsx";
import TransactionHistoryPage from "./components/transactionpage/transactionHistoryPage.jsx";
import SendPage from "./components/sendpage/sendpage.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { AnimatePresence } from 'framer-motion';


export const AppRoute = () =>{
    return (
      //This function carries out all the routing between the pages and organises
      //them in a file directory manner.
      //It imports all page components so that it can redirect them
        <div>
          <AnimatePresence>
            <Router>
              <Routes>
                <Route path="/" exact element={<BasePage/>}/>
                <Route path="/sendpage" exact element={<SendPage />}/>
                <Route path="/transactionhistory" exact element={<TransactionHistoryPage />}/>
              </Routes>
            </Router>
          </AnimatePresence>
        </div>
    );
}