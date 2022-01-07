/*eslint-disable*/
import React, { useEffect, useState } from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
// import ImageListItemBar from '@mui/material/ImageListItemBar';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// import Card from "components/Card/CardTwitterImages";

// import Button from "components/CustomButtons/Button.js"
import Heading from "components/Heading/Heading.js";

import Card from "components/Card/CardTwitterImages";

import PopupModal from "./PopupModal";

import "./TwitterImages.css";

import Image1 from "assets/sattvaimg/1.png";
import Image2 from "assets/sattvaimg/2.png";

import styles from "assets/jss/material-dashboard-pro-react/views/chartsStyle.js";
// import Image from "@material-ui/icons/Image";
// import { isTemplateExpression } from "typescript";
import { ImageListItemBar } from "@mui/material";

const useStyles = makeStyles(styles);

export default function TwitterImages() {
  const classes = useStyles();
  const [tweetData, setTweetData] = useState([])
  const [open, setOpen] = useState(false);
  const [imageUrl,setImageUrl] = useState()
  const [tweetId,setTweetId] = useState()
  const [userName,setUserName] = useState()
  const [createdAt,setCreatedAt] = useState()



  useEffect(()=>{
    fetch("/data/tweet_data",{})
    .then(res => res.json())
    .then(result => {
      setTweetData(JSON.parse(result))
    })
  },[])
  return (
    <div>
      <Heading
        textAlign="center"
        title="Twitter Images"
        category={
          <span>
            Displays all the images posted on <b>Twitter</b> under the hashtag <b>#SattvaNFT</b><br />
            <small>Includes images which are rejected or in pending also.</small> 
          </span>
        }
      />
      {/* <div className="cardImage">
        {tweetData.map((item) => (
          <Card 
            className="cardContent"
            onMouseOver={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}>  
              <img src={item.media_url} alt="..." />
              {ishover && (
                <Button 
                  onClick={() => setOpen(true)}
                  color="primary"
                >
                  View
                </Button>
              )}  
            <PopupModal open={open} setOpen={setOpen} image={item.media_url}/>
          </Card>
          
          ))}</div> */}
      <div className="cardImage">
        <ImageList cols={4}>
          {tweetData.map((item) => (
            <ImageListItem key={item._id["$oid"]} className="cardContent">
              <img
                src={item.media_url}
                // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                
                subtitle={<span>by: {item.user_handle}</span>}
                actionIcon={
                  <Tooltip title="info" placement="top-start">
                    <IconButton
                      onClick = {()=> {
                        setOpen(true),
                        setImageUrl(item.media_url),
                        setCreatedAt(item.created_at),
                        setTweetId(item.tweet_id),
                        setUserName(item.user_handle)
                      }}

                      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                      aria-label={`info about ${item.user_handle}`}
                    >
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
              }
              />
            </ImageListItem>
          ))}
        </ImageList>
        <PopupModal open={open} setOpen={setOpen} image={imageUrl} createdAt ={createdAt} userName ={userName} tweetId ={tweetId}/>
      </div>
    </div>
  );
}
