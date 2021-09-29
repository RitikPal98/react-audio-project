import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { changeURL } from "../../store/slices/playerSlice";
import Image from "../Image";

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        borderRadius: 10,
        maxHeight: 400,
        overflowY: "scroll",

        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(5),
        },

        [theme.breakpoints.up("sm")]: {
            padding: theme.spacing(3),
        },
    },

    itemContainer: {
        cursor: "pointer",
    },

    image: {
        height: 50,
        width: 50,
        borderRadius: 30,
    },
}));

export default function RecentlyPlayed() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { recentlyPlayed } = useSelector((state) => state.player);

    const handlePlay = (name, link, id, image, categoryId) => {
        dispatch(changeURL({ name, link, id, image, categoryId,currentPlayingPosition: "recentlyPlayed" }));
    };

    return (
        <Paper variant="outlined" className={classes.mainContainer}>
            {recentlyPlayed.length === 0 && (
                <Box display="flex" justifyContent="center" alignItems="center" my={10}>
                    No recent audios...
                </Box>
            )}
            {recentlyPlayed
                .slice(0)
                .reverse()
                .map((item, key) => (
                    <Box
                        onClick={() => handlePlay(item.name, item.link, item.id, item.image, item.categoryId)}
                        className={classes.itemContainer}
                        display="flex"
                        alignItems="center"
                        paddingTop={1}
                        paddingBottom={1}
                        key={key}
                    >
                        <Image src={item.image} className={classes.image} />
                        <Box marginLeft={2} fontWeight="fontWeightMedium" fontSize="body2.fontSize">
                            {item.name}
                        </Box>
                    </Box>
                ))}
        </Paper>
    );
}
