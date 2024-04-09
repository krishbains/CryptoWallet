import {useState, useEffect, useRef, useContext} from 'react';
import "./create_wallet.css";
import axios from 'axios';
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import Animate_page from '../../Animate-page';

export default function Login() {

  const {user, setUser} = useContext(UserContext)
  console.log(UserContext)

  const navigate = useNavigate()
  const [data,setData] = useState({
    username: "",
    password: "",
  })

  const loginUser = async(e) => {
    e.preventDefault()
    const {username, password} = data
    try {
      const{data} = await axios.post('/login',{
        username,
        password
      })
      if(data.error){
        toast.error(data.error)
      }else{
        setUser({username});
        navigate('/')
      }
    } catch (error) {
      
    }
    
  }
  console.log('data is',data)
  console.log('user is',user)

  const handleRegister = () => {
    navigate("/register");
  }


  return (
            <Animate_page>
              <div className='main-container'>
                <div className='main-frame-background1'>
                  <div className='main-frame'>
                    <span className='login'>Login</span>
                    <form onSubmit={loginUser}>
                    <div className='password-input'>
                      <input type="text" className="password-input-1" name="email" placeholder="Enter your username" value={data.username} onChange={(e) => setData({...data, username: e.target.value})}/>
                    </div>
                    <div className='confirm-password-input'>
                      <input type="password" className="confirm-password" name="password" placeholder="Enter your password" value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />
                    </div>
                    <div className='continue-button'>
                      <button type="submit" className='continue'>Sign in</button>
                      <button onClick={handleRegister} className='continue1'>New user? Sign up</button>
                    </div>
                    </form>
                  </div>
                </div>
              </div>
            </Animate_page>
              )
            };
