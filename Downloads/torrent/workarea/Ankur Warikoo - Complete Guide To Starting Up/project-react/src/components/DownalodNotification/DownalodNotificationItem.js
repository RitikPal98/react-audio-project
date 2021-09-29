/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef} from "react";
//import { makeStyles } from "@material-ui/core/styles";
import { Box,  Divider, IconButton} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { downloadAudio } from "../../store/slices/downloadSlice";
import CancelIcon from "@material-ui/icons/Cancel";
import LinearProgress from "@material-ui/core/LinearProgress";
import { selectDownloadingItem } from "../../store/selectors/playerSelector";
import { useSelector } from "react-redux";

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     image: {
//         height: 100,
//         width: 100,
//     },
// }));

export default function DownalodNotificationItem({ id, link }) {
    //const classes = useStyles();

    const dispatch = useDispatch();
    const promiseRef = useRef(null);
    const downloadingItem = useSelector((state) => selectDownloadingItem(state, id));
    const handleCancelDownload = () => {
        promiseRef.current.abort();
    };

    useEffect(() => {
        promiseRef.current = dispatch(downloadAudio({ id, link }));
    }, []);

    return (
        <div>
            <Box display="flex" alignItems="center" px={2} py={1}>
                <Box mr={1}>
                    <Box textOverflow="ellipsis" overflow="hidden" width={200} fontSize="caption.fontSize">
                        {downloadingItem?.name}
                    </Box>
                    <Box pt={1} width="100%" mr={1}>
                        <LinearProgress variant="determinate" value={downloadingItem?.progress || 0} />
                    </Box>
                </Box>
                <IconButton onClick={handleCancelDownload}>
                    <CancelIcon fontSize="small" />
                </IconButton>
            </Box>
            <Divider />
        </div>
    );
}
