import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';

export default function CustomDrawer() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : "35vw" }}
            role="presentation"
            // onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem key={"1"} disablePadding >
                    <ListItemButton onClick={() => {
                        window.location.assign("/profile/fd")
                    }}>
                        <ListItemIcon>
                            <AccountBoxIcon style={{ color: "blue", fontSize: "2rem" }} />
                        </ListItemIcon>
                        <ListItemText primary={"Profile"} aria-setsize={100} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={"2"} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <LogoutIcon style={{ color: "red", fontSize: "2rem" }} />
                        </ListItemIcon>
                        <ListItemText primary={"Logout"} style={{ color: "red" }} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div>
            <React.Fragment key={"right"}>
                <Button onClick={toggleDrawer("right", true)}>
                    <MenuIcon style={{ fontSize: "2rem", color: "white" }} />
                </Button>
                <Drawer
                    anchor={"right"}
                    open={state["right"]}
                    onClose={toggleDrawer("right", false)}
                    PaperProps={{
                        sx: {
                            backgroundColor: "#25293c",
                            color: "blue",
                        }
                    }}
                >
                    {list("right")}
                </Drawer>
            </React.Fragment>
        </div>
    );
}