import * as React from 'react';
import '../../App.css';
import img from '../NLF-web-Logo-1.png'
import Personavatar from '../avatar';
import Mainpagecontent from '../mainpagecontent'
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
import Table from './Tables';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
const MainPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const receivedData = location.state && location.state.data;
    console.log(receivedData);

    const moveDashbaordpage = () => {
        // Navigate to another page
        navigate('/DashbaordPage');
    };
    return (

        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Table receivedData={receivedData}/>

        </Paper>

    )
}

export default MainPage
