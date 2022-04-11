import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import './menu.css';
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import {loginPage, viewAssignedIssuesPage, viewProjectsPage, websiteTitle} from "../../const";
import {CodeOutlined, LogoutOutlined, PestControlOutlined} from "@mui/icons-material";
import {Link, useHistory} from "react-router-dom";

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
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
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

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
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

const logout = {
    icon: <LogoutOutlined htmlColor={"white"} fontSize={"large"}/>,
    description: "Log out",
    destination: "/"
};

const handleLogout = (credentials) => {
    credentials.user = undefined;
    credentials.jwt = "";
    window.localStorage.setItem("credentials", JSON.stringify(credentials));
}

const Menu = ({content, credentials}) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const history = useHistory();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLogoutButtonClicked = () => {
        handleLogout(credentials);
        history.push(loginPage);
    }

    const actions = [
        {
            icon: <CodeOutlined htmlColor={"white"} fontSize={"large"}/>,
            description: "Projects",
            destination: viewProjectsPage.replaceAll(":username", credentials.user.username)
        },
        {
            icon: <PestControlOutlined htmlColor={"white"} fontSize={"large"}/>,
            description: "Issues",
            destination: viewAssignedIssuesPage.replaceAll(":username", credentials.user.username)
        },
    ];

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: '36px',
                            ...(open && {display: 'none'}),
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <div className={"website-title"}>
                        <BugReportOutlinedIcon fontSize={"large"}/>
                        <Link to={loginPage}>
                            <span style={{color: "var(--color-light-white)"}}>{websiteTitle}</span>
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ?
                            <ChevronRightIcon htmlColor={"white"}/> :
                            <ChevronLeftIcon htmlColor={"white"}/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <List>
                    {
                        actions.map(action => (
                            <Link to={action.destination} key={action.description}>
                                <ListItem button>
                                    <ListItemIcon>
                                        {action.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={action.description}/>
                                </ListItem>
                            </Link>
                        ))
                    }
                </List>
                <List style={{marginTop: "auto"}}>
                    {
                        <Link to={logout.destination} key={logout.description}>
                            <ListItem button onClick={handleLogoutButtonClicked}>
                                <ListItemIcon>
                                    {logout.icon}
                                </ListItemIcon>
                                <ListItemText primary={logout.description}/>
                            </ListItem>
                        </Link>
                    }
                </List>
            </Drawer>)
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <DrawerHeader/>
                {content}
            </Box>
        </Box>
    );
}

export default Menu;
