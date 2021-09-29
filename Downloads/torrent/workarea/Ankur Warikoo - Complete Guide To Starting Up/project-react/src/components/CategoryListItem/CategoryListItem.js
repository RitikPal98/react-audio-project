import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box,  IconButton,  Paper } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import { useDispatch, useSelector } from "react-redux";
import { addToDowanloadingQueue } from "../../store/slices/playerSlice";
import { Image} from '../../components'
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },

    mainContainer: {
        display: "flex",
        marginBottom: theme.spacing(2),
        borderRadius: 10,
        overflow :'hidden',
        
        [theme.breakpoints.down("sm")]: {
            //padding: theme.spacing(3, 1, 3, 1),
        },

        [theme.breakpoints.up("sm")]: {
            //padding: theme.spacing(1, 1, 1, 1),
        },
    },
    title: {
        [theme.breakpoints.down("sm")]: {
            fontSize: 14,
        },

        [theme.breakpoints.up("sm")]: {
            fontSize: 16,
        },
    },

    buttonContianer: {
        height: 26,
        width: 26,
    },
    image: {
        height: 100,
        width: 100,
    },
}));

export default function ListItem({ data }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { downloadingIds } = useSelector((state) => state.player);

    const { id, name, link, image } = data;

    const handleDownload = () => {
        dispatch(addToDowanloadingQueue({ name: name, id: id, link: link, progress: 0 }));
    };

    return (
        <Paper elevation={0} className={classes.mainContainer}>
            <Image src={image}  className={classes.image} />
            <Box pl={2} py={1} display="flex" flexDirection="column" justifyContent="space-between">
                <Box
                    className={classes.title}
                    textAlign="left"
                    fontWeight="fontWeightMedium"
                    fontSize="subtitle2.fontSize"
                >
                    {name}
                </Box>

                <Box display="flex" justifyContent="flex-start">
                    <IconButton
                        disabled={downloadingIds.includes(id)}
                        onClick={handleDownload}
                        className={classes.buttonContianer}
                        size="small"
                    >
                        <GetAppIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Box>
        </Paper>
    );
}
