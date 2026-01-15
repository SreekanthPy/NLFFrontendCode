import React, { useState } from 'react';
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
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import '../../App.css';
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
    const [alertConfig, setAlertConfig] = useState({
        show: false,
        message: '',
        severity: 'success',
    });
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
        let signup = {
            name: data.get('name'),
            email: data.get('email'),
            phonenumber: data.get('phone'),
            password: data.get('password')

        }

        try {
            const response = await fetch('https://nlfbackend.vercel.app/api/save_user_data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signup),
            });

            if (response.ok) {

                const result = await response.json();
                console.log(result);
                if (result.status) {
                    // Set success alert config
                    setAlertConfig({
                        show: true,
                        message: result.message, // Adjust based on your API response structure
                        severity: 'success',
                    });
                    setTimeout(() => {
                        setAlertConfig({
                            show: false,
                            message: '',
                            severity: 'success',
                        });
                    }, 3000);

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
        }

    };

    const navigate = useNavigate();

    const Navmainpage = () => {
        // Navigate to another page
        navigate('/');
    };

    return (
        <ThemeProvider theme={defaultTheme}>

            <div className="right">
                <Link href="#" variant="body2" onClick={Navmainpage} style={{ whiteSpace: 'nowrap', margin: 20, fontSize: 18, textDecoration: 'none', color: '#660066' }}>
                    {"Sign In"}
                </Link>

            </div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />

                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: '#660066' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    {alertConfig.show && (
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            {console.log(alertConfig.severity)}
                            <Alert severity={alertConfig.severity}>{alertConfig.message}</Alert>
                        </Stack>
                    )}
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField

                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Phone Number"
                                    name="phone"
                                    autoComplete="phone"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3, mb: 2, bgcolor: '#660066',
                                '&:hover': {
                                    bgcolor: '#660066',
                                },
                            }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end" sx={{mb:5}}>
                            <Grid item>
                                <Link href="#" variant="body2" onClick={Navmainpage} style={{ textDecoration: 'none', color: '#660066' }}>
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>

                </Box>
            </Container>
        </ThemeProvider>
    );
}