import React from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    tabPanel: {
        "& p": {
            fontSize: "1rem !important",
            color: "rgba(240,240,240,1)"
        },
    }
}));

function TabPanel(props) {
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
};

export default function SettingsPanel(props) {
    const classes = useStyles();
    const { value } = props;
    return (
        <div>
            <TabPanel value={value} index={0} className={classes.tabPanel}>
                Item One
                {/*This is overflowing content, should be accessible through scrolling*/}
                <p>Item two</p>
                <p>Item two</p>
                <p>Item two</p>
                <p>Item two</p>
                <p>Item two</p>
                <p>Item two</p>
                <p>Item two</p>
                <p>Item two</p>
                <p>Item two</p>
                <p>Item two</p>
                <p>Item two</p>
                <p>Item two</p>
                <p>Item two</p>
                <p>Item two</p>
                <p>Item two</p>
                <p>Item two</p>
                <p>Item two</p>
                <p>Item two</p>
                <p>Item two</p>
                <p>Item two</p>
                <p>Item two</p>
                <p>Item two</p>
                <p> Hello I'm overflowing</p>
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
    )
}
