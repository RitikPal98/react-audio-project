import React from "react";
//import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import GetAppIcon from "@material-ui/icons/GetApp";

import DownalodNotificationItem from "./DownalodNotificationItem";
import { useSelector } from "react-redux";

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     menuButton: {
//         marginRight: theme.spacing(2),
//     },
//     title: {
//         flexGrow: 1,
//     },
// }));

export default function ListItem() {
    //const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const { downloadingQueue } = useSelector((state) => state.download);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                <GetAppIcon />
            </IconButton>
            <Menu
                variant="menu"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                getContentAnchorEl={null}
            >
                {downloadingQueue.map((item, key) => (
                    <MenuItem key={key} style={{ padding: 0 }} button={false}>
                        <DownalodNotificationItem link={item.link} id={item.id} />
                    </MenuItem>
                ))}

                {/* <MenuItem style={{ padding: 0 }} button={false}>
                    <DownalodNotificationItem />
                </MenuItem>
                <MenuItem style={{ padding: 0 }} button={false}>
                    <DownalodNotificationItem />
                </MenuItem> */}
            </Menu>
        </div>
    );
}
