/*eslint-disable*/
import React, { useEffect, useState , useRef} from "react";
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


// New Blockchain imports

import { useDispatch, useSelector } from "react-redux";
import { connect } from "../../redux/blockchain/blockchainActions";
import { fetchData } from "../../redux/data/dataActions";

import styled from "styled-components";
import { create } from "ipfs-http-client";
import { Button } from "@material-ui/core";

const ipfsClient = create("https://ipfs.infura.io:5001/api/v0");

const useStyles = makeStyles(styles);

export default function AllImages() {
  const classes = useStyles();
  const [tweetData, setTweetData] = useState([])
  const [open, setOpen] = useState(false);
  const [imageUrl,setImageUrl] = useState()
  const [tweetId,setTweetId] = useState()
  const [userName,setUserName] = useState()
  const [createdAt,setCreatedAt] = useState()
  const [imageData64, setImageData64] = useState(5)


  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  // console.log(blockchain);
  const data = useSelector((state) => state.data);
  // console.log(data);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [NFTS, setNFTS] = useState([]);
  const elementRef = useRef();
  const ipfsBaseUrl = "https://ipfs.infura.io/ipfs/";
  const name = "NFT name";
  const description = "IPFS minted nft wooo.";

  const getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob); 
      reader.onloadend = () => {
        const base64data = reader.result; 
        setImageData64(base64data)
        // console.log(base64data)
        // console.log(imageData64)
        resolve(base64data);
      }
    });
  }

  const mint = (_uri) => {
    blockchain.smartContract.methods
      .mint(blockchain.account, _uri)
      .send({ from: blockchain.account })
      .once("error", (err) => {
        console.log(err);
        setLoading(false);
        setStatus("Error");
      })
      .then((receipt) => {
        console.log(receipt);
        setLoading(false);
        setStatus("NFT was minted successfully");
      })
  };

  const createMetaDataAndMint = async (_name, _des, _imgbuffer) => {
    setLoading(true);
    setStatus("Uploading to IPFS");
    
    try {
      console.log(await _imgbuffer)
      const addedImage = await ipfsClient.add(await _imgbuffer);

      const metaDataObj = {
        name: _name,
        description: _des,
        image: ipfsBaseUrl + addedImage.path,
      };
      const addMetaData = await ipfsClient.add(JSON.stringify(metaDataObj));
      console.log(ipfsBaseUrl + addMetaData.path);
      mint(ipfsBaseUrl + addMetaData.path);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setStatus("Error");
    }
  };

  const startMintingProcess = () => {
    dispatch(connect())
    createMetaDataAndMint(name, description, getImageData());


  };

  const getImageData = async () => {
    // console.log(elementRef);
    // console.log(elementRef.current)
    const url = "https://res.cloudinary.com/pawasthi961/image/upload/v1641975162/uwlijsnkos3xxazl23p8.jpg"
    const imageData =  await getBase64FromUrl(url);
    // console.log(imageData)
    const buffer = Buffer(imageData.split(",")[1], "base64");
    return buffer;

    // const canvasEl = elementRef.current;
    // let dataUrl = canvasEl.toDataURL("image/png");
    
    // console.log(dataUrl);
 
   
  };

  const fetchMetatDataForNFTS = () => {
    setNFTS([]);
    console.log(data.error);
    data.allTokens.forEach(nft => {
      fetch(nft.uri)
        .then((response) => response.json())
        .then((metaData) => {
          setNFTS((prevState) => [
            ...prevState,
            { id: nft.id, metaData: metaData },
          ]);
        
        
        });
    });
  };

  


  useEffect(()=>{
    fetch("/data/nst_images_data",{})
    .then(res => res.json())
    .then(result => {
      setTweetData(JSON.parse(result))
    })
  },[])

  useEffect(() => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  }, [blockchain.smartContract, dispatch]);

  useEffect(() => {
    fetchMetatDataForNFTS();
  }, [data.allTokens]);


  return (
    <div>

      <Heading
        textAlign="center"
        title="Neural Style Transfer Images"
        category={
          <span>
            Displays all the images generated using Neural Style Transfer Model
            {/* <small>Includes images which are rejected or in pending also.</small>  */}
          </span>
        }
      />

      <Button onClick={(e)=>{
        e.preventDefault();
        dispatch(connect());
      }}>Connect</Button>

      <Button onClick={(e)=>{
        e.preventDefault();

        // await getBase64FromUrl("https://res.cloudinary.com/pawasthi961/image/upload/v1641976788/hunrfylsqfncjgfe5qmp.jpg")
        startMintingProcess()
        // dispatch(connect());
      }}>MINT</Button>
      {loading ? <p>loading</p> : null}

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
      {/* <div className="cardImage"> */}
        <ImageList cols={4} rowHeight={200}>
          {tweetData.map((item) => (
            <ImageListItem key={item._id["$oid"]} className="cardContent">
              <img
                width = "250px"
                height = "200px"
                src={item.media_url}
                // src = {`${item.media_url}?w=248&fit=crop&auto=format`}
                // srcSet={`${item.media_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
                maxHeight= '200px'
              


              />
              <ImageListItemBar
                
                subtitle={<span>by: {item.user_handle}</span>}
                actionIcon={
                  <Tooltip title="info" placement="top-start">
                    <IconButton
                      onClick = {()=>{
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
      {/* </div> */}
    </div>
  );
}




// /*eslint-disable*/
// import React from "react";
// // react plugin for creating charts
// import ChartistGraph from "react-chartist";

// // @material-ui/core components
// import { makeStyles } from "@material-ui/core/styles";

// // @material-ui/icons
// import Timeline from "@material-ui/icons/Timeline";

// // core components
// import Heading from "components/Heading/Heading.js";
// import GridContainer from "components/Grid/GridContainer.js";
// import GridItem from "components/Grid/GridItem.js";

// import Card from "components/Card/Card.js";
// import CardHeader from "components/Card/CardHeader.js";
// import CardIcon from "components/Card/CardIcon.js";
// import CardBody from "components/Card/CardBody.js";
// import CardFooter from "components/Card/CardFooter.js";
// import Image1 from "assets/sattvaimg/1.png";
// import Image2 from "assets/sattvaimg/2.png";
// import Image3 from "assets/sattvaimg/3.png";
// import Image4 from "assets/sattvaimg/4.png";
// import Image5 from "assets/sattvaimg/5.png";
// import Image6 from "assets/sattvaimg/6.png";
// import Image7 from "assets/sattvaimg/7.png";
// import Image8 from "assets/sattvaimg/8.png";
// import Image9 from "assets/sattvaimg/9.png";
// import Image10 from "assets/img/header-doc.jpeg";
// import Image11 from "assets/img/sidebar-1.jpg";
// import Image12 from "assets/img/sidebar-2.jpg";
// import Image13 from "assets/img/sidebar-3.jpg";

// import {
//   roundedLineChart,
//   straightLinesChart,
//   simpleBarChart,
//   colouredLineChart,
//   multipleBarsChart,
//   colouredLinesChart,
//   pieChart,
// } from "variables/charts.js";

// import styles from "assets/jss/material-dashboard-pro-react/views/chartsStyle.js";

// const useStyles = makeStyles(styles);

// export default function AllImages() {
//   const classes = useStyles();
//   return (
//     <div>
//       <Heading
//         textAlign="center"
//         title="All Images"
//         category={
//           <span>
//             Displays all the images present in the <b>Sattva Database</b><br></br>
//             <small>Includes Uploaded, Twitter, AI Camera, Rejected, and Pending images.</small> 
//           </span>
//         }
//       />
//       <GridContainer>
//         <GridItem xs={12} sm={12} md={4}>
//           <Card>
//             <CardHeader image>
//                 <img src={Image1} alt="..." width="200" height="200"/>
//             </CardHeader>
//             <CardBody>
//               <h4 className={classes.cardTitle}>Name of the image</h4>
//               <p className={classes.cardCategory}>Its Status - Uploaded, Rejected, ...</p>
//             </CardBody>
//           </Card>
//         </GridItem>
//         <GridItem xs={12} sm={12} md={4}>
//           <Card>
//             <CardHeader image>
//                 <img src={Image2} alt="..." width="200" height="200"/>
//             </CardHeader>
//             <CardBody>
//               <h4 className={classes.cardTitle}>Name of the image</h4>
//               <p className={classes.cardCategory}>Its Status - Uploaded, Rejected, ...</p>
//             </CardBody>
//           </Card>
//         </GridItem>
//         <GridItem xs={12} sm={12} md={4}>
//           <Card>
//             <CardHeader image>
//                 <img src={Image3} alt="..." width="200" height="200"/>
//             </CardHeader>
//             <CardBody>
//               <h4 className={classes.cardTitle}>Name of the image</h4>
//               <p className={classes.cardCategory}>Its Status - Uploaded, Rejected, ...</p>
//             </CardBody>
//           </Card>
//         </GridItem>
//         <GridItem xs={12} sm={12} md={4}>
//           <Card>
//             <CardHeader image>
//                 <img src={Image4} alt="..." width="200" height="200" />
//             </CardHeader>
//             <CardBody>
//               <h4 className={classes.cardTitle}>Name of the image</h4>
//               <p className={classes.cardCategory}>Its Status - Uploaded, Rejected, ...</p>
//             </CardBody>
//           </Card>
//         </GridItem>
//         <GridItem xs={12} sm={12} md={4}>
//           <Card>
//             <CardHeader image>
//                 <img src={Image5} alt="..." width="200" height="200"/>
//             </CardHeader>
//             <CardBody>
//               <h4 className={classes.cardTitle}>Name of the image</h4>
//               <p className={classes.cardCategory}>Its Status - Uploaded, Rejected, ...</p>
//             </CardBody>
//           </Card>
//         </GridItem>
//         <GridItem xs={12} sm={12} md={4}>
//           <Card>
//             <CardHeader image>
//                 <img src={Image5} alt="..." width="200" height="200"/>
//             </CardHeader>
//             <CardBody>
//               <h4 className={classes.cardTitle}>Name of the image</h4>
//               <p className={classes.cardCategory}>Its Status - Uploaded, Rejected, ...</p>
//             </CardBody>
//           </Card>
//         </GridItem>
//         <GridItem xs={12} sm={12} md={4}>
//           <Card>
//             <CardHeader image>
//                 <img src={Image6} alt="..." width="200" height="200"/>
//             </CardHeader>
//             <CardBody>
//               <h4 className={classes.cardTitle}>Name of the image</h4>
//               <p className={classes.cardCategory}>Its Status - Uploaded, Rejected, ...</p>
//             </CardBody>
//           </Card>
//         </GridItem>
//         <GridItem xs={12} sm={12} md={4}>
//           <Card>
//             <CardHeader image>
//                 <img src={Image7} alt="..." width="200" height="200"/>
//             </CardHeader>
//             <CardBody>
//               <h4 className={classes.cardTitle}>Name of the image</h4>
//               <p className={classes.cardCategory}>Its Status - Uploaded, Rejected, ...</p>
//             </CardBody>
//           </Card>
//         </GridItem>
//         <GridItem xs={12} sm={12} md={4}>
//           <Card>
//             <CardHeader image>
//                 <img src={Image8} alt="..." width="200" height="200"/>
//             </CardHeader>
//             <CardBody>
//               <h4 className={classes.cardTitle}>Name of the image</h4>
//               <p className={classes.cardCategory}>Its Status - Uploaded, Rejected, ...</p>
//             </CardBody>
//           </Card>
//         </GridItem>
//         <GridItem xs={12} sm={12} md={4}>
//           <Card>
//             <CardHeader image>
//                 <img src={Image9} alt="..." width="200" height="200"/>
//             </CardHeader>
//             <CardBody>
//               <h4 className={classes.cardTitle}>Name of the image</h4>
//               <p className={classes.cardCategory}>Its Status - Uploaded, Rejected, ...</p>
//             </CardBody>
//           </Card>
//         </GridItem>
//         <GridItem xs={12} sm={12} md={4}>
//           <Card>
//             <CardHeader image>
//                 <img src={Image10} alt="..." width="200" height="200"/>
//             </CardHeader>
//             <CardBody>
//               <h4 className={classes.cardTitle}>Name of the image</h4>
//               <p className={classes.cardCategory}>Its Status - Uploaded, Rejected, ...</p>
//             </CardBody>
//           </Card>
//         </GridItem>
//         <GridItem xs={12} sm={12} md={4}>
//           <Card>
//             <CardHeader image>
//                 <img src={Image11} alt="..." width="200" height="200"/>
//             </CardHeader>
//             <CardBody>
//               <h4 className={classes.cardTitle}>Name of the image</h4>
//               <p className={classes.cardCategory}>Its Status - Uploaded, Rejected, ...</p>
//             </CardBody>
//           </Card>
//         </GridItem><GridItem xs={12} sm={12} md={4}>
//           <Card>
//             <CardHeader image>
//                 <img src={Image12} alt="..." width="200" height="200"/>
//             </CardHeader>
//             <CardBody>
//               <h4 className={classes.cardTitle}>Name of the image</h4>
//               <p className={classes.cardCategory}>Its Status - Uploaded, Rejected, ...</p>
//             </CardBody>
//           </Card>
//         </GridItem><GridItem xs={12} sm={12} md={4}>
//           <Card>
//             <CardHeader image>
//                 <img src={Image13} alt="..." width="200" height="200"/>
//             </CardHeader>
//             <CardBody>
//               <h4 className={classes.cardTitle}>Name of the image</h4>
//               <p className={classes.cardCategory}>Its Status - Uploaded, Rejected, ...</p>
//             </CardBody>
//           </Card>
//         </GridItem>
//       </GridContainer>
//       {/* <GridContainer>
//         <GridItem xs={12} sm={12} md={6}>
//           <Card>
//             <CardHeader color="info" icon>
//               <CardIcon color="info">
//                 <Timeline />
//               </CardIcon>
//               <h4 className={classes.cardIconTitle}>
//                 Coloured Line Chart <small>- Rounded</small>
//               </h4>
//             </CardHeader>
//             <CardBody>
//               <ChartistGraph
//                 data={colouredLineChart.data}
//                 type="Line"
//                 options={colouredLineChart.options}
//                 listener={colouredLineChart.animation}
//               />
//             </CardBody>
//           </Card>
//         </GridItem>
//         <GridItem xs={12} sm={12} md={6}>
//           <Card>
//             <CardHeader color="rose" icon>
//               <CardIcon color="rose">
//                 <Timeline />
//               </CardIcon>
//               <h4 className={classes.cardIconTitle}>
//                 Multiple Bars Chart <small>- Bar Chart</small>
//               </h4>
//             </CardHeader>
//             <CardBody>
//               <ChartistGraph
//                 data={multipleBarsChart.data}
//                 type="Bar"
//                 options={multipleBarsChart.options}
//                 listener={multipleBarsChart.animation}
//               />
//             </CardBody>
//           </Card>
//         </GridItem>
//       </GridContainer>
//       <GridContainer>
//         <GridItem xs={12} sm={12} md={7}>
//           <Card>
//             <CardHeader color="warning" icon>
//               <CardIcon color="warning">
//                 <Timeline />
//               </CardIcon>
//               <h4 className={classes.cardIconTitle}>
//                 Coloured Lines Chart <small>- Rounded</small>
//               </h4>
//             </CardHeader>
//             <CardBody>
//               <ChartistGraph
//                 data={colouredLinesChart.data}
//                 type="Line"
//                 options={colouredLinesChart.options}
//                 listener={colouredLinesChart.animation}
//               />
//             </CardBody>
//           </Card>
//         </GridItem>
//         <GridItem xs={12} sm={12} md={5}>
//           <Card>
//             <CardHeader color="danger" icon>
//               <CardIcon color="danger">
//                 <Timeline />
//               </CardIcon>
//               <h4 className={classes.cardIconTitle}>Pie Chart</h4>
//             </CardHeader>
//             <CardBody>
//               <ChartistGraph
//                 data={pieChart.data}
//                 type="Pie"
//                 options={pieChart.options}
//               />
//             </CardBody>
//             <CardFooter stats className={classes.cardFooter}>
//               <h6 className={classes.legendTitle}>Legend</h6>
//               <i className={"fas fa-circle " + classes.info} /> Apple{` `}
//               <i className={"fas fa-circle " + classes.warning} /> Samsung
//               {` `}
//               <i className={"fas fa-circle " + classes.danger} /> Windows Phone
//               {` `}
//             </CardFooter>
//           </Card>
//         </GridItem>
//       </GridContainer> */}
//     </div>
//   );
// }
