/*eslint-disable*/
import React from "react";
import { useState } from "react";

import Button from "components/CustomButtons/Button.js";
import { Container, Modal } from "@material-ui/core";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Stack } from "@mui/material";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container:{
    width: 700,
    height:350,
    backgroundColor:"black",  
    color:"white",
    position:"absolute",
    top:0,
    bottom:0,
    left:60,
    right:0,
    margin:"auto",
  },
  modalContent:{
    display: "inline-block",
    float:"right"
  },
  leftside:{
    position:"absolute",
    top:0,
    bottom:0,
    left:0, 
    margin: 23,
    marginTop: 33
  },
  leftsideImg:{
    width: 310,
    height: 280,
  },
  verticalLine:{
    borderLeft: "1px solid white",
    height: 330,
    position: "absolute",
    left: "50%",
    top: 10,
  },
  rightside:{
    position:"absolute",
    top:0,
    bottom:0,
    left: "52%", 
  },
  buttons:{
    display:"flex",
    flexDirection:"row",
    alignContent:"center",
    justifyContent:"center",
    width: "30%",
    position: "absolute",
    top: 290,
    left: 60
  },
  cancel:{
    position: "absolute",
    top: 290,
    left: 208,
    width: "30%",
    marginLeft: "26px"
  }
}));

export default function PopupModal({open, setOpen, image ,userName, tweetId, createdAt}) {
  const classes = useStyles();
  const [createAlert, setCreateAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);

  const handleCreateClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setCreateAlert(false);
  };

  const handleDeleteClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setDeleteAlert(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <div>
      <Modal open={open} className={classes.container} onBackdropClick={() => setOpen(false)}>
        <Container>
          <div className={classes.modalContent}>
            <div className={classes.leftside}>
              <img src={image} alt="..." className={classes.leftsideImg}/>
            </div>
            <div className={classes.verticalLine} />
            <div className={classes.rightside}>
              <h3 style={{fontFamily:"sans-serif"}}>{userName}</h3>
              <p style={{fontFamily:"monospace"}}>
                tweet Id : {tweetId}
              </p>
              <p style={{fontFamily:"monospace"}}>
                posted on : {createdAt}
              </p>
              <div className={classes.buttons}>
                <Button
                  onClick={() => {
                      setOpen(false),
                      setCreateAlert(true)}}
                  color="success"
                  style={{width:"100%", marginLeft:30}}
                >
                  Create Art
                </Button>
                <Button 
                  color="danger"
                  onClick={() => {
                    setOpen(false),
                    setDeleteAlert(true)}}
                    style={{width:"100%"}}
                >
                  Delete Image
                </Button>
              </div>
              <div className={classes.cancel}>
                  <Button onClick={() => setOpen(false)}>Close</Button>
                </div>
            </div>
          </div>
        </Container>
      </Modal>
      <Stack spacing={4} sx={{ width: '100%' }}>
        <Snackbar
          open={createAlert} 
          autoHideDuration={3000} 
          onClose={handleCreateClose} 
          anchorOrigin={{ vertical:"bottom", horizontal:"left" }}
        >
          <Alert onClose={handleCreateClose} severity="success" sx={{ width: '100%' }}>
            Your art will be created shortly!
          </Alert>
        </Snackbar>

        <Snackbar 
          open={deleteAlert} 
          autoHideDuration={3000} 
          onClose={handleDeleteClose} 
          anchorOrigin={{ vertical:"bottom", horizontal:"left" }}
        >
          <Alert onClose={handleDeleteClose} severity="error" sx={{ width: '100%' }}>
            Picture has been deleted.
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  )
}