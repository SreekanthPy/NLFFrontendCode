import * as React from 'react';
import '../../App.css';
import img from '../NLF-web-Logo-1.png'
import Personavatar from '../avatar';
import Mainpagecontent from '../mainpagecontent'
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
const MainPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    let user_Details = {};

    if (location.state) {
        user_Details.email = location.state;
        console.log(location);
    }
    const moveDashbaordpage = () => {
        // Navigate to another page
        navigate('/DashbaordPage');
    };
    return (
        <div className='mainpage'>

            {/* <div className="header">
                <div className="left">
                    <Personavatar receivedData={receivedData} />
                </div>
                <div className="center">
                    <h1> Leap year bible study form</h1>
                </div>
                <div className="right">
                    <img className="NLF_logo" src={img} alt="Avatar" />
                </div>

            </div> */}

            <Mainpagecontent receivedData={user_Details} />
        </div>

    )
}

export default MainPage
