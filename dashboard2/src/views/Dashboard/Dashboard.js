/*eslint-disable*/
import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
// import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
// import ArrowUpward from "@material-ui/icons/ArrowUpward";
// import AccessTime from "@material-ui/icons/AccessTime";
import Refresh from "@material-ui/icons/Refresh";
import Edit from "@material-ui/icons/Edit";
// import Place from "@material-ui/icons/Place";
import ArtTrack from "@material-ui/icons/ArtTrack";
// import Language from "@material-ui/icons/Language";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
// import Danger from "components/Typography/Danger.js";
import Muted from "components/Typography/Muted.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

// react plugin for creating charts
import ChartistGraph from "react-chartist";
// import ArrowUpward from "@material-ui/icons/ArrowUpward";
// import AccessTime from "@material-ui/icons/AccessTime";

// import {
//   dailySalesChart,
//   emailsSubscriptionChart,
//   completedTasksChart,
// } from "variables/charts";

import {
  // roundedLineChart,
  straightLinesChart,
  simpleBarChart,
  colouredLineChart,
  multipleBarsChart,
  colouredLinesChart,
  pieChart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import stylesChart from "assets/jss/material-dashboard-pro-react/views/chartsStyle.js";
import Timeline from "@material-ui/icons/Timeline";

//for most popular artwork
import priceImage1 from "assets/sattvaimg/10.png";
import priceImage2 from "assets/sattvaimg/11.png";
import priceImage3 from "assets/sattvaimg/9.png";

const useStyles = makeStyles(styles);
const useStylesCharts = makeStyles(stylesChart);

export default function Dashboard() {
  const classes = useStyles();
  const classesCharts = useStylesCharts();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon style={{ paddingLeft: "10px" }}> upload_icon </Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Total GANs images created</p>
              <h3 className={classes.cardTitle}>1.1K</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Muted>
                  <Update />
                </Muted>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Refresh
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                {/* <i className="fab fa-twitter" /> */}
                <Icon style={{ paddingLeft: "10px" }}> upload_icon </Icon>
              </CardIcon>
              <p className={classes.cardCategory}>
                Total images uploaded to OpenSea
              </p>
              <h3 className={classes.cardTitle}>350</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon style={{ paddingLeft: "10px" }}>camera_alt_rounded</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>
                Number of images sold on OpenSea
              </p>
              <h3 className={classes.cardTitle}>230</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from AI model
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Icon>local_atm</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>
                Revenue Generated on OpenSea
              </p>
              <h3 className={classes.cardTitle}>$1,200</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      {/* <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart className={classes.cardHover}>
            <CardHeader color="info" className={classes.cardHeaderHover}>
              <ChartistGraph
                className="ct-chart-white-colors"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="Refresh"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button simple color="info" justIcon>
                    <Refresh className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Change Date"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="transparent" simple justIcon>
                    <Edit className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
              </div>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart className={classes.cardHover}>
            <CardHeader color="warning" className={classes.cardHeaderHover}>
              <ChartistGraph
                className="ct-chart-white-colors"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="Refresh"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button simple color="info" justIcon>
                    <Refresh className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Change Date"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="transparent" simple justIcon>
                    <Edit className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
              </div>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart className={classes.cardHover}>
            <CardHeader color="danger" className={classes.cardHeaderHover}>
              <ChartistGraph
                className="ct-chart-white-colors"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="Refresh"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button simple color="info" justIcon>
                    <Refresh className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Change Date"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="transparent" simple justIcon>
                    <Edit className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
              </div>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer> */}
      <GridContainer>
        {/* <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="rose">
              <ChartistGraph
                className="ct-chart-white-colors"
                data={roundedLineChart.data}
                type="Line"
                options={roundedLineChart.options}
                listener={roundedLineChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classesCharts.cardTitle}>Rounded Line Chart</h4>
              <p className={classesCharts.cardCategory}>Line Chart</p>
            </CardBody>
          </Card>
        </GridItem> */}
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart-white-colors"
                data={straightLinesChart.data}
                type="Line"
                options={straightLinesChart.options}
                listener={straightLinesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4
                className={classesCharts.cardTitle}
                style={{ fontFamily: "sans-serif" }}
              >
                Sale made in a month
              </h4>
              <p
                className={classesCharts.cardCategory}
                style={{ fontFamily: "sans-serif" }}
              >
                shows the sale made on OpenSea in particular month
              </p>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color="info">
              <ChartistGraph
                className="ct-chart-white-colors"
                data={simpleBarChart.data}
                type="Bar"
                options={simpleBarChart.options}
                responsiveOptions={simpleBarChart.responsiveOptions}
                listener={simpleBarChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4
                className={classesCharts.cardTitle}
                style={{ fontFamily: "sans-serif" }}
              >
                Images Collected
              </h4>
              <p
                className={classesCharts.cardCategory}
                style={{ fontFamily: "sans-serif" }}
              >
                shows number of images collected in that week
              </p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="info" icon>
              <CardIcon color="info">
                <Timeline />
              </CardIcon>
              <h4
                className={classesCharts.cardIconTitle}
                style={{ fontFamily: "sans-serif" }}
              >
                Sale made in a year{" "}
                <small>- distribution on monthly basis</small>
              </h4>
            </CardHeader>
            <CardBody>
              <ChartistGraph
                data={colouredLineChart.data}
                type="Line"
                options={colouredLineChart.options}
                listener={colouredLineChart.animation}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="rose" icon>
              <CardIcon color="rose">
                <Timeline />
              </CardIcon>
              <h4
                className={classesCharts.cardIconTitle}
                style={{ fontFamily: "sans-serif" }}
              >
                Images Collected in a year <small>- on monthly basis</small>
              </h4>
            </CardHeader>
            <CardBody>
              <ChartistGraph
                data={multipleBarsChart.data}
                type="Bar"
                options={multipleBarsChart.options}
                listener={multipleBarsChart.animation}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={5}>
          <Card>
            <CardHeader color="danger" icon>
              <CardIcon color="danger">
                <Timeline />
              </CardIcon>
              <h4
                className={classesCharts.cardIconTitle}
                style={{ fontFamily: "sans-serif" }}
              >
                Total images collected
              </h4>
            </CardHeader>
            <CardBody style={{ height: "230px" }}>
              <ChartistGraph
                data={pieChart.data}
                type="Pie"
                options={pieChart.options}
              />
            </CardBody>
            <CardFooter
              stats
              className={classesCharts.cardFooter}
              style={{ fontFamily: "sans-serif", fontSize: "14px"}}
            >
              <h6 className={classesCharts.legendTitle}>
                Distribution Parameters
              </h6>
              <i className={"fas fa-circle " + classesCharts.info} /> Uploaded
              Images{` `}
              <i className={"fas fa-circle " + classesCharts.warning} /> Camera
              Captured
              {` `}
              <br />
              <i className={"fas fa-circle " + classesCharts.danger} /> Twitter
              Mentions
              {` `}
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={7}>
          <Card>
            <CardHeader color="warning" icon>
              <CardIcon color="warning">
                <Timeline />
              </CardIcon>
              <h4
                className={classesCharts.cardIconTitle}
                style={{ fontFamily: "sans-serif" }}
              >
                Images recorded in all three modes
                <small>- in the given month</small>
              </h4>
            </CardHeader>
            <CardBody style={{ height: "350px" }}>
              <ChartistGraph
                data={colouredLinesChart.data}
                type="Line"
                options={colouredLinesChart.options}
                listener={colouredLinesChart.animation}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <h3 style={{ fontFamily: "sans-serif" }}>In-Demand Artwork</h3>
      <br />
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card product className={classes.cardHover}>
            <CardHeader image className={classes.cardHeaderHover}>
              <a
                href="https://testnets.opensea.io/assets/0x527edca3cb3a5653ee82996e26ed432dbc1856fb/3"
                target="blank"
                rel="noreferrer"
              >
                <img src={priceImage1} alt="..." width="250" height="250" />
              </a>
            </CardHeader>
            <CardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="View"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="transparent" simple justIcon>
                    <ArtTrack className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Edit"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="success" simple justIcon>
                    <Refresh className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Remove"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="danger" simple justIcon>
                    <Edit className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
              </div>
              <h4 className={classes.cardProductTitle}>
                <a
                  href="https://testnets.opensea.io/assets/0x527edca3cb3a5653ee82996e26ed432dbc1856fb/3"
                  target="_blank"
                  rel="noreferrer"
                >
                  Name of the Image
                </a>
              </h4>
              <p className={classes.cardProductDesciprion}>
                Description of the image
              </p>
            </CardBody>
            <CardFooter product>
              <div
                className={classes.price}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <Icon>local_offer</Icon>
                <h4>Current Price</h4>
              </div>
              {/* <div className={`${classes.stats} ${classes.productStats}`}>
                <Place /> Barcelona, Spain
              </div> */}
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card product className={classes.cardHover}>
            <CardHeader image className={classes.cardHeaderHover}>
              <a
                href="https://testnets.opensea.io/assets/0x527edca3cb3a5653ee82996e26ed432dbc1856fb/4"
                target="blank"
                rel="noreferrer"
              >
                <img src={priceImage2} alt="..." width="250" height="250" />
              </a>
            </CardHeader>
            <CardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="View"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="transparent" simple justIcon>
                    <ArtTrack className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Edit"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="success" simple justIcon>
                    <Refresh className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Remove"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="danger" simple justIcon>
                    <Edit className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
              </div>
              <h4 className={classes.cardProductTitle}>
                <a
                  href="https://testnets.opensea.io/assets/0x527edca3cb3a5653ee82996e26ed432dbc1856fb/4"
                  target="blank"
                  rel="noreferrer"
                >
                  Name of the Image
                </a>
              </h4>
              <p className={classes.cardProductDesciprion}>
                Description of the image
              </p>
            </CardBody>
            <CardFooter product>
              <div
                className={classes.price}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <Icon>local_offer</Icon>
                <h4>Current Price</h4>
              </div>
              {/* <div className={`${classes.stats} ${classes.productStats}`}>
                <Place /> Barcelona, Spain
              </div> */}
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card product className={classes.cardHover}>
            <CardHeader image className={classes.cardHeaderHover}>
              <a
                href="https://testnets.opensea.io/assets/0x527edca3cb3a5653ee82996e26ed432dbc1856fb/5"
                target="blank"
                rel="noreferrer"
              >
                <img src={priceImage3} alt="..." width="250" height="250" />
              </a>
            </CardHeader>
            <CardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="View"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="transparent" simple justIcon>
                    <ArtTrack className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Edit"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="success" simple justIcon>
                    <Refresh className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Remove"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="danger" simple justIcon>
                    <Edit className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
              </div>
              <h4 className={classes.cardProductTitle}>
                <a
                  href="https://testnets.opensea.io/assets/0x527edca3cb3a5653ee82996e26ed432dbc1856fb/5"
                  target="blank"
                  rel="noreferrer"
                >
                  Name of the Image
                </a>
              </h4>
              <p className={classes.cardProductDesciprion}>
                Description of the image
              </p>
            </CardBody>
            <CardFooter product>
              <div
                className={classes.price}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <Icon>local_offer</Icon>
                <h4>Current Price</h4>
              </div>
              {/* <div className={`${classes.stats} ${classes.productStats}`}>
                <Place /> Barcelona, Spain
              </div> */}
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
