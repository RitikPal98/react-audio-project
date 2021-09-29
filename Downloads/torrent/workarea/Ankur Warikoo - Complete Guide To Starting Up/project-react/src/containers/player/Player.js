/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AudioPlayer from "react-h5-audio-player";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { closePlayer, playNextOrPrevious, toggle } from "../../store/slices/playerSlice";
import "react-h5-audio-player/lib/styles.css";
import "./player.css";
import { useHistory } from "react-router-dom";
import * as offlineAPI from "../../db/services";

const useStyles = makeStyles((theme) => ({
    root: {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.palette.primary.main,

        [theme.breakpoints.down("xs")]: {
            padding: theme.spacing(0, 0.5, 1, 0.5),
        },

        [theme.breakpoints.up("xs")]: {
            height: 120,
        },
    },

    coverImage: {
        [theme.breakpoints.down("xs")]: {
            display: "none",
        },

        [theme.breakpoints.up("xs")]: {
            height: 120,
            width: 120,
        },
    },

    player: {
        boxShadow: "none",
        backgroundColor: theme.palette.primary.main,
    },

    playerContainer: {
        width: "100%",
    },

    categoryTitle: {
        color: "white",
        cursor: "pointer",
        padding: theme.spacing(1, 0, 1, 0),
        [theme.breakpoints.down("xs")]: {
            fontSize: 13,
        },

        [theme.breakpoints.up("sm")]: {},
    },

    title: {
        color: "white",
        [theme.breakpoints.down("xs")]: {
            padding: theme.spacing(1, 0, 1, 0),
            fontSize: 11,
        },

        [theme.breakpoints.up("sm")]: {
            padding: theme.spacing(1, 0, 1, 0),
            fontSize: 14,
        },
    },
}));

export default function Player() {
    const playerRef = useRef(null);

    const classes = useStyles();

    const { link, name, id, categoryId, open } = useSelector((state) => state.player);
    const dispatch = useDispatch();
    const theme = useTheme();
    const history = useHistory();

    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

    const handleCloseButton = () => {
        dispatch(closePlayer());
    };

    const handleNext = () => {
        dispatch(playNextOrPrevious("next"));
    };

    const handlePrevious = () => {
        dispatch(playNextOrPrevious("previous"));
    };

    const onCategoryClick = () => {
        history.push(`/category/${categoryId}`);
    };

    const togglePlayer = (status) => {
        dispatch(toggle(status));
    };

    const categoryName = useMemo(() => offlineAPI.getCategoryById(categoryId)?.name, [categoryId]);

    // add listner to detect the end of the audio

    useEffect(() => {
        const player = document.getElementsByTagName("audio")[0];
        if (player && !player?.onended) {
            player.onended = function (e) {
                handleNext();
            };
        }
    }, [id]);

    if (open) {
        return (
            <Box className={classes.root} display="flex" zIndex={2}>
                <Box className={classes.playerContainer}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" px={1}>
                        <Box display="flex" justifyContent="center" alignItems="center">
                            {categoryName && (
                                <Box
                                    onClick={onCategoryClick}
                                    className={classes.categoryTitle}
                                    display="flex"
                                    fontWeight="fontWeightBold"
                                >
                                    {categoryName}
                                    <div>&nbsp;-&nbsp;</div>
                                </Box>
                            )}
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                className={classes.title}
                                component="div"
                                textOverflow="clip"
                                overflow="hidden"
                            >
                                {name}
                            </Box>
                        </Box>

                        <Box display="flex" alignItems="flex-start">
                            <IconButton size="small" onClick={handleCloseButton}>
                                <CloseIcon style={{ color: "white" }} />
                            </IconButton>
                        </Box>
                    </Box>
                    <AudioPlayer
                        id="audio-player"
                        ref={playerRef}
                        showJumpControls={false}
                        showSkipControls
                        layout={isMobile ? "stacked" : "horizontal-reverse"}
                        //customAdditionalControls={[]}
                        className={classes.player}
                        autoPlay
                        src={link}
                        onClickNext={handleNext}
                        onClickPrevious={handlePrevious}
                        onPlay={() => togglePlayer(true)}
                        onPause={() => togglePlayer(false)}
                        //crossOrigin="anonymous"
                    />
                </Box>
            </Box>
        );
    } else return null;
}
