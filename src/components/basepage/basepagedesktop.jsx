import React, { useState ,useContext,useEffect, useMemo} from 'react';
import './basepage_desktop.css';
import useMetaMask from '../hooks/metaMaskHook';
import Animate_page from '../../Animate-page';
import { motion, AnimatePresence } from 'framer-motion';
import { UserContext } from '../../context/userContext';
import axios from "axios"
import { useNavigate, Link } from 'react-router-dom';
import { useHoldings } from '../Dashboard/Holdings';
import {createDashboardAxios} from '../../Routes'
import image2 from '../assets/images/Send_transactions.png';
import image5 from '../assets/images/LiveMarketData.png';
import image3 from '../assets/images/deposit.png';
import image4 from '../assets/images/withdraw.png';
import image1 from '../assets/images/CurrentBalance.png';

export default function BasePageDesktop() {
    const axiosInstance = useMemo(() => createDashboardAxios(), []);
    const { holdings, loading } = useHoldings(axiosInstance);

    const navigate = useNavigate()

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [showHelpOverlay, setShowHelpOverlay] = useState(false);
    const [backgroundIndex, setBackgroundIndex] = useState(0);
    const [isCheckingUser, setIsCheckingUser] = useState(true);
    
    console.log('holdings', holdings)
    const {user, setUser, localBalance} = useContext(UserContext)

        // Function to format currency
        const formatCurrency = (value) => {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format(value);
        };

    useEffect(() => {
        // Delay the user check for 3 seconds
        const timer = setTimeout(() => {
            setIsCheckingUser(false); // Update state to indicate check complete after 3 seconds
        }, 100);

        // Clear the timer if component unmounts or if user is found
        return () => clearTimeout(timer);
    }, []); // Run only once on component mount

    useEffect(() => {
        // If user is still being checked, do not proceed
        if (isCheckingUser) return;

        // User check complete, now redirect if user is not authenticated
        if (!user) {
            navigate('/login');
        }
    }, [user, isCheckingUser, navigate]);
    
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleHelpClick = () => {
        setShowHelpOverlay(!showHelpOverlay);
    };

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
    console.log(backgroundIndex,'bg i')

    const prevBackground = () => {
            // Decrement index to switch to the next background image
            if (backgroundIndex > 0){
            setBackgroundIndex((prevIndex) => prevIndex - 1);
            }
        }

        const backgroundImages = [
            `url(${image1})`,
            `url(${image2})`,
            `url(${image3})`,
            `url(${image4})`,
            `url(${image5})`,
        ];

    const handleLiveChatClick = () => {
        // Navigate to the live chat page
        navigate('/livechat');
    };
    const handleHistoryClick = () => {
        // Navigate to the live chat page
        navigate('/transactionhistory');
    };
    const handleFAQClick = () => {
        // Navigate to the live chat page
        navigate('/FAQ');
    };
    console.log(localBalance)

    const {balance} = useMetaMask();
    return (
        <Animate_page>
            <body className='body102'>
            <div className="Background">
                <div className="main-container">
                    <div className="main-frame-background">
                        <div className="account-bar">
                            <span className="account">{user && (user.username)}</span>
                            {user && console.log("username is", user.username)}
                            <div className="vector" onClick={toggleDrawer}/>
                        </div>
                        {/* Drawer Sidebar */}
                        <AnimatePresence>
                            {isDrawerOpen && (
                                <motion.div
                                    className="drawer-sidebar"
                                    initial={{ x: -200 }}
                                    animate={{ x: 0 }}
                                    exit={{ x: -200 }}
                                >
                                    {/* Add your drawer content here */}
                                    <span className='drawer_object1' onClick={handleLiveChatClick}>Live Chat</span>
                                    <span className='drawer_object2'onClick={handleHelpClick}>Help</span>
                                    <span className='drawer_object2' onClick={handleHistoryClick}>Transaction History</span>
                                    <span className='drawer_object2' onClick={handleFAQClick}>FAQ</span>
                                    <span className='drawer_object2' onClick={handleSignOut}>Sign out</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {/* End Drawer Sidebar */}

                        {/* Help Overlay */}
                        <AnimatePresence>
                            {showHelpOverlay && (
                                <motion.div
                                    className="help-overlay"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    style={{ borderRadius: '5px' }}
                                >
                                <div className="help-content" style={{ backgroundImage: backgroundImages[backgroundIndex]}}>
                                    <button className="next-button" onClick={nextBackground}>Next</button>
                                    <button className="prev-button" onClick={prevBackground}>Prev</button>
                                </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {/* End Help Overlay */}
                        <div className="rectangle">
                            <span className="current-balance">Current Balance</span>
                            <Link to="/transactionhistory">
                                <div className="flex-row">
                                    <div className="arrow-up" />
                                    <span className="currency-amount">
                                    {((Math.floor(parseFloat(balance) * 100) / 100) + localBalance) > 0 ? ((Math.floor(parseFloat(balance) * 100) / 100) + localBalance) : 0 } ETH
                                    </span>
                                    <span className="percentage">10.2%</span>
                                </div>
                            </Link>
                        </div>
                        <div className="flex-row-dc">
                            <div className="transfer-button">
                                <Link to="/sendpage">
                                    <span className="send">Send</span>
                                </Link>
                            </div>
                            <div className="deposit-button">
                                <Link to= "/deposit">
                                    <span className="deposit">Deposit</span>
                                </Link>
                            </div>
                            <div className="withdraw-button">
                                <Link to= "/withdraw">
                                    <span className="withdraw">Withdraw</span>
                                </Link>
                            </div>
                        </div>
                        <div className="holdings-background">
                            <div className="flex-column-fec">
                                <span className="holdings">Live Market Data</span>
                                <span className="ethereum">Ethereum</span>
                                <div className="eth-icon" />
                                <span className="eth">ETH</span>
                                <div className="rectangle-1">
                                    <div className="bitcoin-logo">
                                        <div className="vector-2" />
                                    </div>
                                </div>
                                <span className="bitcoin">Bitcoin</span>
                                <span className="btc">BTC</span>
                                <div className="ltc-icon" />
                                <span className="litecoin">Litecoin</span>
                                <span className="ltc">LTC</span>
                                <div className="rectangle-3">
                                    <div className="iconfinder-xrp-alt">
                                        <div className="xrp" />
                                    </div>
                                </div>
                                <span className="bitcoin-4">Ripple</span>
                                <span className="btc-5">XRP</span>
                            </div>
                            <div className="flex-column-caa">
                                <Link to="/Dashboard">
                                <span className="see-all">Advanced analytics</span>
                                </Link>
                                <div>
                                    {holdings.length != 0 ? holdings.map(holding => (
                                            <div key={holding.id}>
                                                <span className="pound">{formatCurrency(holding.current_price)}</span>
                                                <span className="eth-6">{holding.amount} {holding.symbol}</span>
                                                {/* Render other details */}
                                            </div>
                                        )) :  
                                            <div>
                                                <span className="pound" style={{ fontSize: '11px' }}>Too many requests..</span>
                                                <span className="eth-6" style={{ fontSize: '10px' }}>please refresh shortly</span>
                                                <span className="pound" style={{ fontSize: '11px' }}>Too many requests..</span>
                                                <span className="eth-6" style={{ fontSize: '10px' }}>please refresh shortly</span>
                                                <span className="pound" style={{ fontSize: '11px' }}>Too many requests..</span>
                                                <span className="eth-6" style={{ fontSize: '10px' }}>please refresh shortly</span>
                                                <span className="pound" style={{ fontSize: '11px' }}>Too many requests..</span>
                                                <span className="eth-6" style={{ fontSize: '10px' }}>please refresh shortly</span>
                                            </div>
                                        }
                                </div>
                            </div>
                            <div className="flex-column-ef">
                                <div className="graph-eth" />
                                <div className="graph-btc" />
                                <div className="graph-eth-a" />
                                <div className="graph-eth-b" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </body>
        </Animate_page>
    );
}
