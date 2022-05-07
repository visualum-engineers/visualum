import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  tabContent: {
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: 0,
      background: "transparent",
    },
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },
  tabPanel: {
    "& p": {
      fontSize: "1rem !important",
      color: "rgba(240,240,240,1)",
    },
  },
}));

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
  className: PropTypes.any
};

export default function SettingsPanel(props: any) {
  const classes = useStyles();
  const { value } = props;
  return (
    <div className={classes.tabContent}>
      <TabPanel value={value} index={0} className={classes.tabPanel}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.tabPanel}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2} className={classes.tabPanel}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3} className={classes.tabPanel}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4} className={classes.tabPanel}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5} className={classes.tabPanel}>
        Item Six
      </TabPanel>
    </div>
  );
}
