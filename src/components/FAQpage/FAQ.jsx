import React, { useState ,useContext,useEffect, useMemo} from 'react';
import './FAQPage.css';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Animate_page from '../../Animate-page';
import axios from "axios"
import { UserContext } from '../../context/userContext';

const FAQPage = () => {
    const [theme, setTheme] = useState('dark'); // Default theme is dark
    const navigate = useNavigate()

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [showHelpOverlay, setShowHelpOverlay] = useState(false);
    const [backgroundIndex, setBackgroundIndex] = useState(0);

    const [openQuestions, setOpenQuestions] = useState({});

    const {user, setUser} = useContext(UserContext)

    // const toggleTheme = () => {
    //     setTheme(theme === 'dark' ? 'green' : 'dark');
    // };

    const toggleQuestion = (questionIndex) => {
        setOpenQuestions((prevOpenQuestions) => ({
        ...prevOpenQuestions,
        [questionIndex]: !prevOpenQuestions[questionIndex],
        }));
    };

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleHelpClick = () => {
        setShowHelpOverlay(!showHelpOverlay);
    };

    const handleLiveChatClick = () => {
        // Navigate to the live chat page
        navigate('/livechat');
    };

    const handleFAQClick = () => {
        navigate('/FAQPage')
    }

    const backgroundImages = [
        'url(../assets/images/Send_transactions.png)',
        'url(../assets/images/Live_Market_Stats.png',
        'url(../assets/images/image3.jpg)',
        'url(../assets/images/image4.jpg)',
    ];

    const handleSignOut = async () => {
        try {
            await axios.post('/logout'); // Assuming your logout endpoint is at /logout
            setUser(null); // Set user in context to null
            // Optionally, redirect to login page
        } catch (error) {
            console.error('Error during logout:', error);
            // Handle errors appropriately, e.g., display an error message to the user
        }
    };
    const nextBackground = () => {
        if (backgroundIndex + 1 >= backgroundImages.length) {
            // If index exceeds length, toggle help overlay
            setShowHelpOverlay(!showHelpOverlay);
        } else {
            // Increment index to switch to the next background image
            setBackgroundIndex((prevIndex) => prevIndex + 1);
        }
    };

    const prevBackground = () => {
            // Decrement index to switch to the next background image
        if (backgroundIndex >= 0) {
            setBackgroundIndex((prevIndex) => prevIndex - 1);
        }
    }

return (
        <Animate_page>
            <body className='body102'>
            <div className="Background">
                <div className="main-container">
                    <div className="main-frame-background">
                        <div className="account-bar">
                            <span className="account">{user && (user.username)}</span>
                            {user && console.log("username is", user.username)}
                            <div className="vector" onClick={toggleDrawer} />
                        </div>
                        {/* Drawer Sidebar */}
                         <div className={`faq-page`}>
                       <h1>Frequently Asked Questions</h1>
                      <div className="questions">
                        <div className="question">
                           <h2 onClick={() => toggleQuestion(1)}>How Do I set up the wallet?</h2>
                           {openQuestions[1] && <p>It is essential to install the chrome extension of METAMASK and create a wallet</p>}
                        </div>
                        <div className="question">
                           <h2 onClick={() => toggleQuestion(2)}>How do I send Transactions?</h2>
                           {openQuestions[2] && <div>
                           <p>1. Get the address from MetaMask, add recipient address and Send. </p>
                           <p>2. Confirm transaction via MetaMask to finish the transaction</p>
                           </div>
                           }
                        </div>
                        <div className="question">
                           <h2 onClick={() => toggleQuestion(3)}>How do I Deposit Currency?</h2>
                           {openQuestions[3] && <p>Select the appropriate bank account, select token amount an click deposit</p>}
                        </div>
                        <div className="question">
                           <h2 onClick={() => toggleQuestion(4)}>How do I Withdraw Currency?</h2>
                           {openQuestions[4] && <p>Choose the appropriate bank account, select token amount an click withdraw</p>}
                        </div>
                        <div className="question">
                           <h2 onClick={() => toggleQuestion(5)}>How do I contact you?</h2>
                           {openQuestions[5] && <p>Click on live chat, sign in with google and begin to talk! customer service will get in touch shortly</p>}
                        </div>
                        {/* Add more questions here */}
                      </div>
                     </div>
                    </div>
                </div>
            </div>
            </body>
        </Animate_page>);
};

export default FAQPage;