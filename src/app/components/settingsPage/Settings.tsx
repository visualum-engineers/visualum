import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import SettingsPanel from './SettingsPanel';

function a11yProps(index: any) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    settings: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    settingsBox: {
        height: "75%",
        width: "75%",
        overflow: "hidden",
        borderRadius: "1rem",
        backgroundColor: "rgba(0, 0, 30, .65)",
        backdropFilter: "blur(5px)"
    },
    root: {
        flexGrow: 1,
        // backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: "100%",
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        paddingTop: "2%",
        color: "rgba(240,240,240,1)",
        "& .MuiTab-wrapper": {
            padding: ".5rem",
            alignItems: "start"
        }
    },

}));

export default function VerticalTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [accType] = React.useState("student");

    // THIS WILL INCLUDE AN AXIOS CALL TO THE BACKEND TO GRAB USER SETTINGS
//    const [userSettings, updateUserSettings] = React.useState({});

    const handleChange = (event: any, newValue: any) => {
        setValue(newValue);
    };

    // const changeSettings = (newSettings) => {
    //     // Update settings in state.
    //     // Save settings to db.
    // }

    return (
        <div className={classes.settings}>
            <div className={classes.settingsBox}>
                <div className={classes.root}>
                    <Tabs
                        orientation="vertical"
                        //variant="fixed"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        className={classes.tabs}
                    >
                        <Tab label="Personal Info" {...a11yProps(0)} />
                        <Tab label="Security/Login" {...a11yProps(1)} />
                        <Tab label={`${accType === "student" ? "Student" : "Teacher"} Settings`} {...a11yProps(2)} />
                        <Tab label="Payment Info" {...a11yProps(3)} />
                        <Tab label="Privacy" {...a11yProps(4)} />
                        <Tab label="Account" {...a11yProps(5)} />
                    </Tabs>
                    {/* Settings panel will be dynamically passed the correct user setings for the page selected. */}
                    {/* An updateSettings method will be passed to the settingsPanel which will take newSettings and apply changes */}
                    <SettingsPanel value={value} />
                </div>
            </div>
        </div>
    );
}
