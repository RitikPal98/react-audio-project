import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, IconButton, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { addToDowanloadingQueue } from "../../store/slices/downloadSlice";
import { changeURL } from "../../store/slices/playerSlice";
import { changeFav } from "../../store/slices/playerSlice";
import { CheckCircleOutlineOutlined } from "@material-ui/icons";
import Facebook from "@material-ui/icons/Facebook";
import Twitter from "@material-ui/icons/Twitter";
import Email from "@material-ui/icons/Mail";
import Whatsapp from "@material-ui/icons/WhatsApp";
import DownloadIcon from "@material-ui/icons/GetApp";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShareIcon from "@material-ui/icons/ShareOutlined";
import PauseCircleOutlineRoundedIcon from "@material-ui/icons/PauseCircleOutlineRounded";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import LinkIcon from "@material-ui/icons/Link";
import parse from "html-react-parser";
import ReactTooltip from "react-tooltip";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Image } from "../../components";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  mainContainer: {
    display: "flex",
    marginBottom: theme.spacing(2),
    borderRadius: 10,
    overflow: "hidden",

    [theme.breakpoints.down("sm")]: {
      //padding: theme.spacing(3, 1, 3, 1),
    },

    [theme.breakpoints.up("sm")]: {
      //padding: theme.spacing(1, 1, 1, 1),
    },
  },
  title: {
    cursor: "pointer",
    width: "100%",
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

  buttonOutline: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    border: "solid 0.1rem green",
    height: 15,
    width: 15,
    margin: theme.spacing(0, 1, 0, 1),
    padding: 0,
  },

  button: {
    height: 12,
    width: 12,
    color: "green",
  },
}));

export default function ListItem({ data, currentPlayingPosition }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isDownloaded, setIsDownloaded] = useState(false);
  const { downloadingIds } = useSelector((state) => state.download);
  const { id: currentPlayingId, playing } = useSelector(
    (state) => state.player
  );

  const { id, name, link, image, categoryId, category_id, highlightName } =
    data;

  const handleDownload = async () => {
    if (isDownloaded) {
      try {
        const cache = await caches.open("audio_cache");
        const res = await cache.delete(new Request(link));
        if (res) setIsDownloaded(false);
      } catch (error) {}
    } else {
      dispatch(
        addToDowanloadingQueue({ name: name, id: id, link: link, progress: 0 })
      );
    }
  };

  const handlePlay = () => {
    dispatch(
      changeURL({
        name: name,
        link: link,
        id: id,
        image: image,
        categoryId: categoryId || category_id,
        currentPlayingPosition: currentPlayingPosition,
      })
    );
  };
  const togglePlay = () => {
    const player = document.getElementsByTagName("audio")[0];

    if (player) {
      if (player.paused) {
        player.play();
      } else {
        player.pause();
      }
    }
  };

  useEffect(() => {
    caches
      .match(new Request(link))
      .then((res) => {
        if (res) setIsDownloaded(true); //checking whether already downloaaded
      })
      .catch((e) => {});
  }, [downloadingIds, link]);

  //  favorite category related code
  const { favorite } = useSelector((state) => state.player);
  const [present, setPresent] = useState(false);
  const [display, setDisplay] = useState(true);
  const notify = () => toast.success('Link has been copied', {
    position: "bottom-left",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
  useEffect(() => {
    if (favorite.find((item) => item.id === id)) {
      setPresent(true);
    } else {
      setPresent(false);
    }
  }, [id, favorite]);

  function handleFavorite() {
    dispatch(
      changeFav({
        name: name,
        link: link,
        id: id,
        image: image,
        categoryId: categoryId || category_id,
        currentPlayingPosition: currentPlayingPosition,
      })
    );
  }
  return (
    <Paper variant="outlined" className={classes.mainContainer}>
      <Image src={image} className={classes.image} />
      <Box
        pl={1}
        py={1}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          {id === currentPlayingId && (
            <IconButton onClick={togglePlay} size="small">
              {playing ? (
                <PauseCircleOutlineRoundedIcon
                  fontSize="large"
                  style={{ color: "#179992" }}
                />
              ) : (
                <PlayCircleOutlineIcon
                  fontSize="large"
                  style={{ color: "#179992" }}
                />
              )}
            </IconButton>
          )}

          <Box
            onClick={handlePlay}
            className={classes.title}
            textAlign="left"
            fontWeight="fontWeightMedium"
            fontSize="subtitle2.fontSize"
            ml={1}
            pr={1}
          >
            {highlightName ? parse(highlightName) : name}
          </Box>
        </Box>

        <Box display="flex" alignItems="center" justifyContent="flex-start">
          <IconButton
            disabled={downloadingIds.includes(id)}
            onClick={handleDownload}
            size="small"
          >
            <CheckCircleOutlineOutlined
              style={isDownloaded ? { color: "green" } : { color: "gray" }}
            />
          </IconButton>
          <IconButton size="small">
            <a
              className="download-icon-container"
              href={"data:audio/mp3," + link}
              target="_blank"
              download={name}
            >
              <DownloadIcon />
            </a>
          </IconButton>
          <IconButton onClick={handleFavorite} size="small">
            <FavoriteBorderIcon
              style={
                present ? { color: "rgb(240,100,100)" } : { color: "#777" }
              }
            />
          </IconButton>
          <IconButton
            onClick={() => (display ? setDisplay(false) : setDisplay(true))}
            size="small"
          >
            <ShareIcon />
          </IconButton>
          <div>
            <div
              style={display ? { width: "0" } : { width: "100%" }}
              className="share-btn"
            >
              <IconButton
                data-tip="Copy the link"
                className="btn-link"
                onClick={(e) => {
                  notify()
                  e.target.style.color = "rgb(29,161,245)";
                  setTimeout(() => {
                    e.target.style.color = "#777";
                  }, 2000);
                  navigator.clipboard.writeText(link);
                }}
                size="small"
              >
                <ReactTooltip place="top" type="dark" effect="float" />
                <LinkIcon />
              </IconButton>

              <a
                data-tip="Share on Twitter"
                class="btn-twitter"
                href={"https://twitter.com/share?url=" + link}
                onClick={(e) => {
                  javascript: window.open(
                    "https://twitter.com/share?url=" +
                      link +
                      "&text=Assalamo alaykum. What do you think of this audio?",
                    "Twitter",
                    "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600"
                  );
                  return false;
                }}
                target="_blank"
                title="Share on Twitter"
              >
                <ReactTooltip place="top" type="dark" effect="float" />
                <Twitter />
              </a>
              <a
                data-tip="Share on Facebook"
                class="btn-facebook"
                href={"https://www.facebook.com/sharer/sharer.php?u=" + link}
                onClick={(e) => {
                  javascript: window.open(
                    "https://www.facebook.com/sharer/sharer.php?u=" + link,
                    "",
                    "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600"
                  );
                  return false;
                }}
                target="_blank"
                title="Share on Facebook"
              >
                <ReactTooltip place="top" type="dark" effect="float" />
                <Facebook />
              </a>
              <a
                data-tip="Share on Whatsapp"
                class="btn-whatsapp"
                href={
                  "https://api.whatsapp.com/send?text=Assalamo alaykum. What do you think of this audio?" +
                  link
                }
                onClick={(e) => {
                  javascript: window.open(
                    "https://api.whatsapp.com/send?text=Assalamo alaykum. What do you think of this audio? " +
                      link,
                    "",
                    "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600"
                  );
                  return false;
                }}
                target="_blank"
                title="Share on Whatsapp"
              >
                <ReactTooltip place="top" type="dark" effect="float" />
                <Whatsapp />
              </a>

              <a
                data-tip="Share on Email"
                className="btn-email"
                href={
                  "mailto:?subject=Assalamo alaykum. What do you think of this audio?&body=More enlightening signs at " +
                  link
                }
                title="Share by Email"
              >
                <ReactTooltip place="top" type="dark" effect="float" />

                <Email />
              </a>
            </div>
          </div>
        </Box>
      </Box>
<ToastContainer className="notification-container-copied"/>
    </Paper>
  );
}
