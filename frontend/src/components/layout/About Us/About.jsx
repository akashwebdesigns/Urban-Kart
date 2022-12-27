import { Avatar, Grid, makeStyles, Typography } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import React from "react";
import "./About.css";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 100,
    padding: 15,
  },
  abt: {
    height: "45vh",
    padding: 15,
  },
  founder: {
    height: "39vh",
    padding: 15,
    [theme.breakpoints.down("xs")]: {
      marginTop: "7rem",
    },
  },
  founderavt: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    cursor: "pointer",
  },
  icon: {
    fontSize: 35,
    cursor: "pointer",
  },
}));

const About = () => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item md={6}>
          <div className={classes.abt}>
            <Typography gutterBottom style={{ color: "#34495e" }} variant="h2">
              About <span style={{ color: "#f50057" }}>Us</span>
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex
              inventore, tenetur unde laudantium cum id accusantium tempora,
              delectus deserunt amet non mollitia, odit nulla laborum ut iusto
              sapiente recusandae minima aliquid libero. Animi facere optio enim
              rerum voluptatum non, delectus facilis vitae at minima eligendi
              hic, culpa accusantium adipisci a quia{" "}
            </Typography>
            <button onClick={() => history.push("/")} className="abt-btn">
              <span>Shop Now</span>
              <div class="liquid"></div>
            </button>
          </div>

          <div className={classes.founder}>
            <Typography gutterBottom style={{ color: "#34495e" }} variant="h2">
              Our <span style={{ color: "#f50057" }}>Founder</span>
            </Typography>
            <div className="ist-div">
              <Avatar
                alt="Remy Sharp"
                src="/pic2.jpg"
                className={classes.founderavt}
              />
              <div className="founder-info">
                <Typography gutterBottom variant="h5">
                  Akash Gupta
                </Typography>
                <Typography gutterBottom variant="body1">
                  Founder
                </Typography>
                <Typography gutterBottom variant="body1">
                  Bachelor's Of Technology
                </Typography>
                <Typography gutterBottom variant="body1">
                  Madan Mohan Malaviya University of Technology Gorakhpur
                </Typography>
                <LinkedInIcon
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/akash-gupta-372541bb/",
                      "_blank"
                    )
                  }
                  style={{ color: "#0077b5" }}
                  className={classes.icon}
                />
                <InstagramIcon
                  onClick={() =>
                    window.open(
                      "https://www.instagram.com/_akash2910_/",
                      "_blank"
                    )
                  }
                  style={{ color: "#e95950" }}
                  className={classes.icon}
                />
                <FacebookIcon
                  onClick={() =>
                    window.open(
                      "https://www.facebook.com/Akash.gupta36/",
                      "_blank"
                    )
                  }
                  style={{ color: "#4267B2" }}
                  className={classes.icon}
                />
                <GitHubIcon
                  onClick={() =>
                    window.open(
                      "https://github.com/akashwebdesigns",
                      "_blank"
                    )
                  }
                  style={{ color: "#171515" }}
                  className={classes.icon}
                />
              </div>
            </div>
          </div>
        </Grid>

        <Grid item md={6} sm={0}>
          <img className="abt-img" src="/abt2.png" alt="" />
        </Grid>
      </Grid>
    </div>
  );
};

export default About;
