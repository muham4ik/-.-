import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import routes from "@routes"
 import Logo from "../../../assets/icons/oligarch.svg"
 import MuiModal from "../../../components/modal/mui-mdal"
import {useLocation, NavLink , Outlet, useNavigate} from 'react-router-dom'
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate()
  const [openn,setOppen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const  {pathname} = useLocation();
  const handleNavigate = ()=>{
    setOppen(true)
  }
  return (
    <>
    <MuiModal
    open={openn}
    onClose={()=>setOppen(false)}
    />
    <Box sx={{ display: 'flex'}}>
      <CssBaseline/>
      <AppBar position="fixed"  open={open}>
        <Toolbar className='bg-[#FF6E30]'>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none'  }),
            }}
          >
            <MenuIcon className='fs-1' />
            <img src={<Logo/>} alt="" />
          </IconButton>
          <Typography variant="h6" noWrap component="div" className='d-flex gap-[1100px] '>
          <div className="main d-flex align-items-center gap-1 text-[#FFFFFFE5]">
          𝓛𝓾𝓲 𝓼𝓱𝓸𝓹.𝓾𝔃 <box-icon type='solid' size="36px" color="#FFFFFFE5" name='shopping-bags'></box-icon>
          </div>
            <button className='p-2 bg-transparent rounded-md  hover:bg-gray-500' onClick={handleNavigate}>
              <box-icon name='exit' color="#FFFFFFE5" size="36px">
                </box-icon>
                </button>
          
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon className='fs-1' /> : <ChevronLeftIcon className='fs-1' />}
          </IconButton>
        </DrawerHeader>
        <Divider/>
        {routes.map((item, index) => (
        <NavLink to={item.path} className={item.path === pathname ? "text-white bg-[#FF6E30]   rounded-2 border text-decoration-none fs-4 fw-medium": "text-[#757575] fs-4 text-decoration-none fw-medium "  }>
        <List key={index}   className='d-flex ' >
        <ListItem disablePadding sx={{ display: 'block' ,}}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'start',
                  px: 0,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    px:2.5,
                    
                  }}
                  className={item.path === pathname ? "text-white width-[36px]": ""  }>
                
                  {item.icon}
                </ListItemIcon>
                {item.content}
              </ListItemButton>
            </ListItem>
        </List>
        </NavLink>
        ))}
        <Divider />
    
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        <DrawerHeader />
        <Outlet/>
      </Box>
    </Box>
    </>
  );
}