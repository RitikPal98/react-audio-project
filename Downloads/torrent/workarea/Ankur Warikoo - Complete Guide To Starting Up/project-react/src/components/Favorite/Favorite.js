import React from "react";
import "./Favorite.css";
import { Box, IconButton } from "@material-ui/core";
import Image from "../Image";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { changeURL } from "../../store/slices/playerSlice";
import { changeFav } from "../../store/slices/playerSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

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
    display: "flex",
    width: "100%",
  },

  image: {
    height: 50,
    width: 50,
    borderRadius: 30,
  },
}));

function Favorite() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { favorite } = useSelector((state) => state.player);
  const history = useHistory();
  const handlePlay = (name, link, id, image, categoryId) => {
    dispatch(changeURL({ name, link, id, image, categoryId,currentPlayingPosition: "home" }));
};
  const handleFavorite = (name, link, id, image, categoryId) => {
    dispatch(changeFav({ name, link, id, image, categoryId,currentPlayingPosition: "home" }));
};
  return (
    <div className="favorite-container">
      {favorite.length === 0 && (
                <Box display="flex" justifyContent="center" alignItems="center" my={10}>
                    No favorite audios...
                </Box>
            )}
      {favorite
      .slice(0)
      .reverse()
      .map((item, key) => (
        <Box
          className={classes.itemContainer}
          display="flex"
          alignItems="center"
          paddingTop={1}
          paddingBottom={1}
          key={key}
        >
          <Image src={item.image} className={classes.image} />

          <Box
            onClick={() => {
              if(item.link!=="category-link"){
                return handlePlay(item.name, item.link, item.id, item.image, item.categoryId)
                }}}
            className="fav-name-container"
            marginLeft={2}
            fontWeight="fontWeightMedium"
            fontSize="body2.fontSize"
          >
            
     <p onClick={()=>{
       if(item.link==="category-link"){history.push("/category/"+item.id)}
     }}>       {item.name}</p>
         
          </Box>
          <IconButton onClick={()=>handleFavorite(item.name, item.link, item.id, item.image, item.categoryId)} className="fav-icon-container" size="small">
            <FavoriteBorderIcon />
          </IconButton>
        </Box>
      ))}
    </div>
  );
}

export default Favorite;
