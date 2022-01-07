/*eslint-disable*/
import React from "react";
import { useState } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Heading from "components/Heading/Heading.js";
import Button from "components/CustomButtons/Button.js";

import Card from "components/Card/CardTwitterImages";

import "./TwitterImages.css";
import PopupModal from "./PopupModal";

import Image1 from "assets/sattvaimg/1.png";
import Image2 from "assets/sattvaimg/2.png";

export default function TwitterImages() {
  const [ishover, setIsHover] = useState(false); 
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Heading
        textAlign="center"
        title="AI Captured"
        category={
          <span>
            Displays all the images posted on <b>Twitter</b> under the hashtag <b>#SattvaNFT</b><br />
            <small>Includes images which are rejected or in pending also.</small> 
          </span>
        }
      />
            <div className="cardImage">
            <Card 
            className="cardContent"
            onMouseOver={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}>  
              <img src={Image1} alt="..." />
              {ishover && (
                <Button 
                  onClick={() => setOpen(true)}
                  color="primary"
                >
                  View
                </Button>
              )}  
            <PopupModal open={open} setOpen={setOpen} image={Image1}/>
            </Card>
            <Card>
              <img src={Image2} alt="..." />
            </Card>
            <Card>  
            <img src={Image1} alt="..."/>
            </Card>
        </div>
    </div>
  );
}
