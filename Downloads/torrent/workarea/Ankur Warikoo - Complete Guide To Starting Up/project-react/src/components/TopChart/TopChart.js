import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { changeURL } from "../../store/slices/playerSlice";
import Image from "../Image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),

    [theme.breakpoints.down("xs")]: {
      marginBottom: theme.spacing(0),
    },
  },
  paper: {
    padding: theme.spacing(2),
    minWidth: 850,
    textAlign: "center",
    color: theme.palette.text.secondary,
  },

  image: {
    boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
    borderRadius: 15,
    width: 150,
    height: 150,

    [theme.breakpoints.down("xs")]: {
      width: 100,
      height: 100,
    },
  },

  title: {
    color: theme.palette.primary.dark,
  },

  item: {
    cursor: "pointer",
    width: 150,
    padding: theme.spacing(0),
    [theme.breakpoints.down("xs")]: {
      width: 10,
    },
  },
}));



export default function TopChart({ data, getMore }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handlePlay = (item) => {
    dispatch(
      changeURL({
        name: item.name,
        link: item.link,
        id: item.id,
        image: item.image,
        categoryId: item.categoryId || item.category_id,
        currentPlayingPosition: "topChart",
      })
    );
  };

  let settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ],
    autoplaySpeed: 2000,
    cssEase: "linear",
    
  };

  return (
    <div className={classes.root}>
      <Box className={classes.title} mb={3} ml={1} fontSize="h4.fontSize" fontWeight="fontWeightBold">
        Most Popular
      </Box>
      <div onClick={getMore}>
        <Slider 
          
        {...settings}>
          {data?.map((item) => (
            <div  className={classes.item} key={item.id}>
              <Box  >
                <Image onClick={() => handlePlay(item)} src={item.image} className={classes.image} />
              </Box>
              <Box textAlign="center" textOverflow="ellipsis" overflow="hidden" py={1} fontSize={12}>
                {item.name}
              </Box>
            </div>
          ))}
          
          </Slider>
          </div>
    </div>
  );
}
