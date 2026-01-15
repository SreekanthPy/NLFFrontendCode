import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import TextField from '@mui/material/TextField';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import Select from "react-select";
// import Datepicker from './Datepicker';
import CircularProgress from '@mui/material/CircularProgress';
const generateDateOptions = () => {
  const startDate = new Date('2026-01-01');
  const endDate = new Date('2026-12-31');
  const dateOptions = [];

  for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
    const day = currentDate.getDate().toString().padStart(2, '0'); // Ensure two-digit day
    const month = currentDate.toLocaleString('default', { month: 'short' }); // Short month name
    const formattedDate = `${day}-${month}`;

    dateOptions.push(
      <MenuItem key={formattedDate} value={formattedDate}>
        {formattedDate}
      </MenuItem>
    );
  }

  return dateOptions;
};

const date_formate = (selectDate) => {
  const [day, month, year] = selectDate.split('-').map(Number);

  // Create a Date object using the extracted components
  const dateObject = new Date(year, month - 1, day);

  // Format the date in the desired format
  const formattedDate = `${day}-${dateObject.toLocaleString('default', { month: 'short' })}`;
  console.log(formattedDate)
  return formattedDate;
}
export default function Orders(props) {
  const [loading, setLoading] = useState(false);

  const dateOptions = generateDateOptions();
  const [data, setData] = useState([]);
  const [admin, setadmin] = useState([]);
  //get the readinformation data
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [alertConfig, setAlertConfig] = useState({
    show: false,
    message: '',
    severity: 'success',
  });
  const navigate = useNavigate();

  const { receivedData } = props;
  console.log(receivedData)

  let isAdmin = receivedData == 'admin@gmail.com';

  useEffect(() => {
    const fetchData = async () => {
      let email = receivedData;
      const data_json = { email: email };

      try {
        setLoading(true);
        const response = await fetch('https://nlfbackend.vercel.app/api/view_form_data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data_json),
        });

        if (response.ok) {
          const result = await response.json();
          console.log(result);

          if (result.status) {

          } else {
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

          // Assuming result.rows is an array of objects
          if (result.result) {
            const formattedResult = result.result.map(item => {
              const readInformationArray = item.readinformation.map(info => (info));
              return { ...item, readinformation: readInformationArray };
            });

            setData(formattedResult);

          } else {
            setData([]);
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
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // const handleButtonClick = (rowData) => {
  //   // Handle the click event to capture the data from the selected row
  //   console.log('Selected Row Data:', rowData);
  //   setSelectedRowData(rowData);
  // };

  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermbyuser, setSearchTermbyuser] = useState('');
  const [searchTerm_1, setSearchTerm_1] = useState('');
  const [nameSearch, setNameSearch] = useState('');
  const [emailSearch, setEmailSearch] = useState('');
  const [emailSearch_1, setEmailSearch_1] = useState('');
  const [infoSearch, setInfoSearch] = useState('');
  const [infoSearch_1, setInfoSearch_1] = useState('');
  const [infoSearchmont, setInfoSearchmont] = useState('');
  const [selectDate, setDate] = React.useState('');
  const [selectMont, setMonth] = React.useState(false);
  const [SearchTerm_year, SetSearchTerm_year] = useState('2026');
  const [SearchTerm_year_1, SetSearchTerm_year_1] = useState('2026');

  const filterData = () => {
    return data.map((row) => {
      // Get the selected year from the search term
      const yearSelection = row.study_year; // The study_year in each row
      console.log("Row study year:", yearSelection, "Search term year:", SearchTerm_year_1);

      const filteredReadInformation = row?.readinformation.filter((info) => {
        const infoSearch = infoSearch_1.toLowerCase().trim();
        const SearchTerm_year = SearchTerm_year_1.toLowerCase().trim();

        const isDayMatch = info.day && info.day.toLowerCase().trim() === infoSearch;
        const isDateMatch = info.date && info.date.toLowerCase().trim().includes(infoSearch);
        const isInformationMatch = info.information && info.information.toLowerCase().trim().includes(infoSearch);

        let isYearMatch = false; // Default to false

        // Check year based on SearchTerm_year_1
        if (SearchTerm_year === '2026') {
          // If searching for 2026, include:
          // 1. Records that don't have study_year (no "study_year" field)
          // 2. Records with study_year === '2026'
          isYearMatch = !info.study_year || info.study_year === '2026';
        } 
        // else if (SearchTerm_year === '2025') {
        //   // If searching for 2025, include only records with study_year === '2025'
        //   isYearMatch = info.study_year === '2025';
        // }

        console.log(`Info: ${info.day} ${info.date} ${info.information} - Year Match: ${isYearMatch}, Day Match: ${isDayMatch}, Date Match: ${isDateMatch}, Information Match: ${isInformationMatch}`);

        // Return true if any of the conditions match (day, date, information) and study year match
        return (isDayMatch || isDateMatch || isInformationMatch) && isYearMatch;
      });


      // Check both conditions for filtering based on name and email
      if (
        row.name.toLowerCase().includes(searchTerm_1.toLowerCase()) &&
        row.email.toLowerCase().includes(emailSearch_1.toLowerCase())

      ) {

        return {
          ...row,
          readinformation: filteredReadInformation,

        };
      } else {
        // If the name or email does not match, return null or an empty object
        // depending on your use case
        return null; // or return {} or return undefined, based on your preference
      }
    })
      // Filter out the elements that didn't match the name and email conditions
      .filter(Boolean); // This will remove null or undefined elements from the array
  };

  // const filterData = () => {
  //   return data.map((row) => {

  //     // Get the selected year from the search term
  //     let yearSelection = row.study_year;
  //     // console.log("yearSelection", yearSelection, SearchTerm_year_1);
  //     const filteredReadInformation = row?.readinformation.filter((info) => {
  //       const infoSearch = infoSearch_1.toLowerCase().trim();
  //       console.log("infoSearch",infoSearch)
  //       let SearchTerm_year = SearchTerm_year_1.toLowerCase().trim();

  //       const isDayMatch = info.day && typeof info.day === 'string' && info.day.toLowerCase().trim() === infoSearch;
  //       const isDateMatch = info.date && typeof info.date === 'string' && info.date.toLowerCase().trim().includes(infoSearch);
  //       const isInformationMatch = info.information && typeof info.information === 'string' && info.information.toLowerCase().trim().includes(infoSearch);
  //       let yearSelection = info.study_year && typeof info.information === 'string' && info.information.toLowerCase().trim().includes(SearchTerm_year);

  //       if(SearchTerm_year=='2024'){
  //         yearSelection=true
  //       }
  //       console.log('info.information ',SearchTerm_year)
  //       // console.log("yearSelection",yearSelection,SearchTerm_year,isDayMatch,isDateMatch,isInformationMatch)
  //       // Return true only if any of the conditions match (day, date, information, or study year)
  //       return   yearSelection &&(isInformationMatch || isDayMatch || isDateMatch);
  //     });

  //     // Check if name and email match the search criteria
  //     if (
  //       row.name.toLowerCase().includes(searchTerm_1.toLowerCase()) &&
  //       row.email.toLowerCase().includes(emailSearch_1.toLowerCase())
  //     ) {
  //       return {
  //         ...row,
  //         readinformation: filteredReadInformation,
  //       };
  //     } else {
  //       // If name or email doesn't match, return null (to be filtered out later)
  //       return null;
  //     }
  //   })
  //     // Filter out rows where the name or email didn't match
  //     .filter(Boolean); // This will remove null or undefined elements from the array
  // };


  const handleRefreshClick = () => {
    // Reload the page
    window.location.reload();
  };

  //search by name options
  const names = data.map(item => item.name);
  const optionList_byname = names.map(name => ({ value: name, label: name }));


  //search by email options.
  const email = data.map(item => item.email);
  const optionList_byemail = email.map(name => ({ value: name, label: name }));


  // Get unique months from data

  const optionList_month = [
    { value: 'Jan', label: 'January' },
    { value: 'Feb', label: 'February' },
    { value: 'Mar', label: 'March' },
    { value: 'Apr', label: 'April' },
    { value: 'May', label: 'May' },
    { value: 'Jun', label: 'June' },
    { value: 'Jul', label: 'July' },
    { value: 'Aug', label: 'August' },
    { value: 'Sep', label: 'September' },
    { value: 'Oct', label: 'October' },
    { value: 'Nov', label: 'November' },
    { value: 'Dec', label: 'December' }
  ];

  const optionList_year = [
    { value: '2026', label: '2026' },
  //  { value: '2025', label: '2025' },

  ];
  function handleSelect_byname(e) {
    setNameSearch(e)
    setSearchTerm_1(e.value)
  }

  function handleSelect_email(e) {
    setEmailSearch(e)
    setEmailSearch_1(e.value)

  }
  function handleSelect_month(e) {
    setInfoSearch(e)
    setInfoSearch_1(e.value)

  }

  function handleSelect_month_byuser(e) {
    setSearchTerm(e)
    setSearchTermbyuser(e.value)
  }

  function select_year(e) {
    SetSearchTerm_year(e)
    SetSearchTerm_year_1(e.value)
  }

  const clearSelection = () => {
    setSearchTerm(null);

  }

  const filteredData = filterData();

  console.log("searchTermbyuser", searchTermbyuser)
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {props.children}
      </Typography>
      <Typography component="h1" variant="h5" m={2} color={'#660066'}>
        {isAdmin ? 'Admin' : ''}
        {data.map((row) => (
          <React.Fragment key={row.id}>
            {isAdmin ? '' : row.name}
          </React.Fragment>
        ))}
      </Typography>

      {console.log(isAdmin)}
      {isAdmin ? (<div style={{ overflowX: 'auto' }}>

        {/* Render admin table */}
        <>
          <div>

            <FormControl sx={{ m: 1, minWidth: 180, mb: 4, }} size="small">

              <Select
                options={optionList_year}
                placeholder="Search by Year"
                value={SearchTerm_year}
                onChange={select_year}
                isSearchable={true}
              />
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 180, mb: 4, }} size="small">

              <Select
                options={optionList_byname}
                placeholder="Search by Name"
                value={nameSearch}
                onChange={handleSelect_byname}
                isSearchable={true}

              />

            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 180, mb: 4, }} size="small">
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={emailSearch}
                onChange={handleSelect_email}
                label="Search by Email"
                options={optionList_byemail}
                placeholder="Search by Email"
                isSearchable={true}
              >

              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 180, mb: 4, }} size="small">
              {/* <InputLabel id="demo-select-small-label">Search by Day</InputLabel> */}
              <Select
                labelId="demo-select-small-label"
                label="Search in Read Information"
                variant="outlined"
                value={infoSearch}
                onChange={handleSelect_month}
                options={optionList_month}
                placeholder="Search by month"
                isSearchable={true}
              >
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {Array.from({ length: 366 }, (_, index) => (
                  <MenuItem key={index + 1} value={`Day ${index + 1}`}>
                    {`Day ${index + 1}`}
                  </MenuItem>
                ))} */}

              </Select>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              sx={{
                m: 1,
                mb: 4,
                minWidth: 180,
                bgcolor: '#660066',
                '&:hover': {
                  bgcolor: '#660066' // Replace 'hoverColor' with the color you want on hover
                }
              }}
              onClick={handleRefreshClick}
            >
              Clear
            </Button>

          </div>
          <div style={{ minHeight: 500 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Read Information</TableCell>
                  <TableCell colSpan={3}>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((row) => (
                  <React.Fragment key={row.id}>
                    {row.readinformation.length !== 0 && (
                      <TableRow>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell colSpan={3}>
                          <Box sx={{ maxHeight: '200px', overflow: 'auto' }}>
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Day</TableCell>
                                  <TableCell>Date</TableCell>
                                  <TableCell>Information</TableCell>

                                  <TableCell>Status</TableCell>
                                  <TableCell>Year</TableCell>
                            
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {console.log(row.readinformation)}
                                {row.readinformation.length != 0 && row.readinformation.map((info, index) => (
                                  <TableRow key={index}>
                                    <TableCell>{info.day}</TableCell>
                                    <TableCell>{info.date}</TableCell>
                                    <TableCell>{info.information}</TableCell>
                                    <TableCell>
                                      <span
                                        style={{
                                          color: info.status === 1 ? 'green' : 'red',
                                        }}
                                      >
                                        {info.status === 1 ? 'Done' : 'Not Done'}
                                      </span>
                                    </TableCell>
                                    <TableCell>{info?.study_year||'2026'}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )
                    }
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      </div>) : (
        <div style={{ overflowX: 'auto', minHeight: '500px' }}>

          <div style={{ marginBottom: 20, marginTop: 8, width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>

            <div style={{ display: "flex", flexDirection: 'row', width: "100%" }}>

              <div style={{ width: "30%", padding: 10, zIndex: 999999 }}>
                <Select
                  labelId="demo-select-small-label"
                  label="Search in Read Information"
                  variant="outlined"
                  value={SearchTerm_year}
                  onChange={select_year}
                  options={optionList_year}
                  placeholder="select year"
                  isSearchable={true}
                  sx={{ fontSize: 20, paddingTop: 10 }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        minHeight: '200px', // Set the minimum height for options
                        minWidth: '20px'
                      }
                    }
                  }}
                />
              </div>
              <div style={{ width: "100%", padding: 10, zIndex: 999999 }}>
                <Select
                  labelId="demo-select-small-label"
                  label="Search in Read Information"
                  variant="outlined"
                  value={searchTerm}
                  onChange={handleSelect_month_byuser}
                  options={optionList_month}
                  placeholder="Search by month"
                  isSearchable={true}
                  sx={{ fontSize: 20, paddingTop: 10 }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        minHeight: '200px' // Set the minimum height for options
                      }
                    }
                  }}
                />
              </div>
            </div>
            <div style={{ width: "10%", marginTop: 8 }}>
              {searchTerm && (
                <Button
                  onClick={clearSelection}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 0, mb: 0, bgcolor: '#660066',
                    width: "100%", fontSize: 12,
                    '&:hover': {
                      bgcolor: '#660066',
                    },
                  }}
                >
                  Clear Selection
                </Button>
              )}
            </div>
          </div>

          <Table size="small">
            <TableHead>
              <TableRow>
                {/* <TableCell sx={{ fontSize: 20 }}>Read Information</TableCell> */}
                <TableCell>Day</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Information</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Year</TableCell>
              </TableRow>
            </TableHead>

            <TableBody sx={{ height: 20 }}>
  {data.map((row) => (
    <React.Fragment key={row.id}>
      {row.readinformation
        .filter((info) => {
          const searchTerm = searchTermbyuser.toLowerCase().trim();
          const searchTermYear = SearchTerm_year_1.toLowerCase().trim(); // Assuming this contains the year from search input

          const isMonthMatch = info.date && info.date.toLowerCase().includes(searchTerm); // Filter by month (date)
          let isYearMatch = false;

          // Check if the year matches the search term
          if (searchTermYear === '2026') {
            // For 2024, include records that don't have study_year or have study_year 2024
            isYearMatch = !info.study_year || info.study_year === '2026';
          } 
          // else if (searchTermYear === '2025') {
          //   // For 2025, include only records with study_year === '2025'
          //   isYearMatch = info.study_year === '2025';
          // }

          // Combine the conditions (both year and month)
          return isYearMatch && isMonthMatch;
        })
        .map((info, index) => (
          <TableRow key={index}>
            <TableCell>{info.day}</TableCell>
            <TableCell>{info.date}</TableCell>
            <TableCell>{info.information}</TableCell>
            <TableCell>
              <span
                style={{
                  color: info.status === 1 ? 'green' : 'red',
                }}
              >
                {info.status === 1 ? 'Done' : 'Not Done'}
              </span>
            </TableCell>
            <TableCell>{info?.study_year || '2026'}</TableCell>
          </TableRow>
        ))}
    </React.Fragment>
  ))}
</TableBody>

          </Table>
        </div>
      )
      }
      {
        loading && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.7)', // Adjust background color and opacity
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
            }}
          >
            <CircularProgress size={60} color="secondary" />
          </Box>
        )
      }
    </React.Fragment >
  );


}
