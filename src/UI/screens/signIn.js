import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignUp from '../screens/signUp';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import img from '../NLF-web-Logo-1.png'
import '../../App.css';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';
function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
    const [loading, setLoading] = useState(false);
    const [alertConfig, setAlertConfig] = useState({
        show: false,
        message: '',
        severity: 'success',
    });
    const navigate = useNavigate();

    const handleClick = () => {
        // Navigate to another page
        navigate('/signUP');
    };
    const handleClick_ResetPassword = () => {
        // Navigate to another page
        navigate('/ResetPassword');
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        console.log(data)
        let email = data.get('email');
        let password = data.get('password');
        console.log(email, password);
        let data_json = {
            email: email,
            password: password
        }

        try {
            setLoading(true);
            const response = await fetch('https://nlfbackend.vercel.app/api/get_user_validation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data_json),
            });

            if (response.ok) {

                const result = await response.json();
                console.log(result.result[0]);
                if (result.status) {

                    // Set success alert config
                    //navigate('/mainpage');
                    navigate('/DashbaordPage', { state: { data: result.result[0].databaseemail, name: result.result[0].name } });

                }
                else {
                    // Set failure alert config
                    setAlertConfig({
                        show: true,
                        message: result.message,
                        severity: 'error',
                    });
                    setTimeout(() => {
                        setAlertConfig({
                            show: false,
                            message: '',
                            severity: 'success',
                        });
                    }, 3000);

                }
            } else {
                console.error('Failed to fetch data');

                // Set failure alert config
                setAlertConfig({
                    show: true,
                    message: 'API call failed!',
                    severity: 'error',
                });
                setTimeout(() => {
                    setAlertConfig({
                        show: false,
                        message: '',
                        severity: 'success',
                    });
                }, 3000);

            }
        } catch (error) {
            console.error('Error:', error);

            // Set error alert config
            setAlertConfig({
                show: true,
                message: 'An error occurred!',
                severity: 'error',
            });
            setTimeout(() => {
                setAlertConfig({
                    show: false,
                    message: '',
                    severity: 'success',
                });
            }, 3000);
        } finally {
            // Set loading back to false when the API call is completed
            setLoading(false);
        }
    };

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
        console.log(event.currentTarget)
    };
    return (
        <ThemeProvider theme={defaultTheme}>

            <div className="header">
                <div className="left">
                    <img className="NLF_logo" src={img} alt="Avatar" />
                </div>
                <div className="center">
                    <h1 style={{ fontFamily: "'Roboto','Helvetica','Arial',sans-serif", fontWeight: 600, color: '#660066' }}>New Life Fellowship</h1>
                </div>
                <div className="right">
                    <Link href="#" variant="body2" onClick={handleClick} style={{ whiteSpace: 'nowrap', margin: 4, fontSize: 18, textDecoration: 'none', color: '#660066' }}>
                        {"Sign Up"}
                    </Link>

                </div>

            </div>

            <Container component="main" maxWidth="xs">

                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: '#660066' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    {alertConfig.show && (
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            {console.log(alertConfig.severity)}
                            <Alert severity={alertConfig.severity}>{alertConfig.message}</Alert>
                        </Stack>
                    )}
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        {/* <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        /> */}

                        <FormControl sx={{ mt: 5 }} fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput

                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }

                                name="password"
                                label="Password"
                                id="password"
                            />
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                            sx={{ marginTop: 2 }}
                        />
                        {/* <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                bgcolor: '#660066',
                                '&:hover': {
                                    bgcolor: '#660066' // Replace 'hoverColor' with the color you want on hover
                                }
                            }}
                        >
                             {loading && <CircularProgress />} Login
                        </Button>
                        */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                          
                            sx={{
                                mt: 3,
                                mb: 2,
                                bgcolor: '#660066',
                                '&:hover': {
                                    bgcolor: '#660066',
                                },
                            }}
                        >
                            {/* Conditional rendering of the spinner inside the button */}
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2" onClick={handleClick_ResetPassword} style={{ textDecoration: 'none', color: '#660066' }}>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2" onClick={handleClick} style={{ textDecoration: 'none', color: '#660066' }}>
                                    {"Don't have an account? Sign Up"}
                                </Link>

                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    );
}