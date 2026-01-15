import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import LogoutIcon from '@mui/icons-material/Logout';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link as RouterLink } from 'react-router-dom';
import SignIn from './signIn';
// export const mainListItems = (
//   <React.Fragment>
//     <ListItemButton>
//       <ListItemIcon>
//         <DashboardIcon />
//       </ListItemIcon>
//       <ListItemText primary="Dashboard" />
//     </ListItemButton>
//     {/* <ListItemButton>
//       <ListItemIcon>
//         <ShoppingCartIcon />
//       </ListItemIcon>
//       <ListItemText primary="Form" />
//     </ListItemButton> */}
//     {/* <ListItemButton>
//       <ListItemIcon>
//         <PeopleIcon />
//       </ListItemIcon>
//       <ListItemText primary="Customers" />
//     </ListItemButton> */}
//     <ListItemButton>
//       <ListItemIcon>
//         <BarChartIcon />
//       </ListItemIcon>
//       <ListItemText  primary="Form" />
//     </ListItemButton>
//     <ListItemButton >
//       <ListItemIcon>
//         <LogoutIcon />
//       </ListItemIcon>
//       <ListItemText primary="LogOut" />
//     </ListItemButton>
//   </React.Fragment>
// );

// export const mainListItems = [
//     {
//       path: '/dashboard',
//       icon: <DashboardIcon />,
//       text: 'Dashboard',
//     },
//     // Uncomment and add more items as needed
//     // {
//     //   path: '/form',
//     //   icon: <ShoppingCartIcon />,
//     //   text: 'Form',
//     // },
//     // {
//     //   path: '/customers',
//     //   icon: <PeopleIcon />,
//     //   text: 'Customers',
//     // },
//     {
//       path: '/form',
//       icon: <BarChartIcon />,
//       text: 'Form',
//     },
//     {
//       path: '/logout',
//       icon: <LogoutIcon />,
//       text: 'LogOut',
//     },
//   ];

export const secondaryListItems = (
  <React.Fragment>
    {/* <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton> */}
  </React.Fragment>
);

export const mainListItems = (handleListItemClick) => (
  <React.Fragment>
    <ListItemButton onClick={() => handleListItemClick('dashboard')}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton onClick={() => handleListItemClick('form')}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Form" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="/" onClick={() => handleListItemClick('form')}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="LogOut" />
    </ListItemButton>
  </React.Fragment>
);
