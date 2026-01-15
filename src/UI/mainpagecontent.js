import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import img from './NLF-web-Logo-1.png'
import Select from './select';
import Checkboxcmp from './checkbox';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
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

export default function SignUp(props) {
  const [loading, setLoading] = useState(false);
  const [selectStudy, setselectStudy] = React.useState('');
  const [completestatus, setcompletestatus] = React.useState('');
  const [alertConfig, setAlertConfig] = useState({
    show: false,
    message: '',
    severity: 'success',
  });

  // Callback function to receive data from child
  const handleChildData = (data) => {
    setselectStudy(data);
  };

  //get the checkbox data
  const handleChildData_Checkbox = (data) => {
    setcompletestatus(data);
  };

  const { receivedData } = props;
  let email = receivedData.email.data;
  let name = receivedData.email.name;

  const firstLetter = receivedData.eamil ? receivedData.eamil.data.charAt(0).toUpperCase() : '';
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let email = data.get('email');
    let name = data.get('name');
    let todaystudy = selectStudy;
    let status = completestatus;

    const dataToSend = status ? 1 : 0;

    let [day, date, information,year] = "";
    if (todaystudy != "") {
      [day, date, information,year] = todaystudy.split(',');

      let readdataobj = {
        day: day.trim(),
        date: date.trim(),
        information: information.trim(),
        status: dataToSend,
        study_year:year
      }
      let form_data = {
        name: name,
        email: email,
        readinformation: [readdataobj],
        study_year:year
      }
      console.log("form_data",form_data)
      try {
        setLoading(true);
        const response = await fetch('https://nlfbackend.vercel.app/api/save_form_data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form_data),
        });

        if (response.ok) {

          const result = await response.json();
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
      finally {
        // Set loading back to false when the API call is completed
        setLoading(false);
      }
    }
  };

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };


  return (
    <ThemeProvider theme={defaultTheme}>

      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Typography component="h1" variant="h5" m={2}>
          Leap year bible study form
        </Typography>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {alertConfig.show && (
            <Stack sx={{ width: '100%' }} spacing={2}>
              {console.log(alertConfig.severity)}
              <Alert severity={alertConfig.severity}>{alertConfig.message}</Alert>
            </Stack>
          )}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ borderColor: "red" }}>
                <TextField

                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  value={name}
                  autoFocus
                  InputProps={{
                    readOnly: true,
                    style: { color: 'gray' },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  InputProps={{
                    readOnly: true,
                    style: { color: 'gray' },
                  }}

                />
              </Grid>
              <Grid item xs={12}>

                <Select sendDataToParent={handleChildData} />
              </Grid>
              <Grid item xs={12}>

              </Grid>
              <Checkboxcmp sendDataToParents={handleChildData_Checkbox} />
            </Grid>
            {/* <Button
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
              Submit
            </Button> */}

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
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
            </Button>
            <Grid container justifyContent="flex-end">

            </Grid>
          </Box>


        </Box>

      </Container>

    </ThemeProvider>
  );
}