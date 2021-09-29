import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";

import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(0),
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export default function SubMenu({ children, label }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    return (
        <div className={classes.root}>
            <ListItem button onClick={handleClick}>
                <ListItemText primary={label} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse className={classes.nested} in={open} timeout="auto" unmountOnExit>
                {children}
            </Collapse>
        </div>
    );
}
