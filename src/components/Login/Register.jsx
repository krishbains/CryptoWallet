import {useState, useEffect, useRef} from 'react';
import "./create_wallet.css";
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Animate_page from '../../Animate-page';

export default function Register() {

  const navigate = useNavigate()
  const [data,setData] = useState({
    username: "",
    password: "",
  })

  const registerUser = async (e) => {
    e.preventDefault()
    const {username,password} = data;
    try{
      const{data} = await axios.post('/register', {
        username,password
      })
      if(data.error){
        toast.error(data.error)
      } else{
        setData({})
        toast.success("Login Successful. welcome bro!")
        navigate('/login')
      }
    } catch(error){
      console.log(error)
    }
  }
  console.log(data)
  const handleLogin = () => {
    navigate("/Login");
  }

  const xyz = () => {
    navigate("/deposit")
  }

  return (
            <Animate_page>
              <div className='main-container'>
                <div className='main-frame-background1'>
                  <div className='main-frame'>
                    <span className='login'>Register</span>
                    <form onSubmit={registerUser}>
                    <div className='password-input'>
                      <input type="text" className="password-input-1" name="email" placeholder="Enter your username" value={data.username} onChange={(e) => setData({...data, username: e.target.value})}/>
                    </div>
                    <div className='confirm-password-input'>
                      <input type="password" className="confirm-password" name="password" placeholder="Enter your password" value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />
                    </div>
                    <div className='continue-button'>
                      <button onClick={xyz} type="submit" className='continue'>Sign up</button>
                      <button onClick={handleLogin} className='continue1'>Already Registered? Sign in</button>
                    </div>
                    </form>
                  </div>
                </div>
              </div>
              </Animate_page>
              )
            };
