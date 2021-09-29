import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Dashboard from './Dashboard'
import ActivityCard from './ActivityCard';

export default function DashboardActivities(props) {

    let activities = [];
    props.data.forEach(activity => {
        activities.push(<ActivityCard data={activity} />)
    });

    return (
        <Dashboard page="activities">
            <div className="activities-container">
                <div className="control-bar">
                    <div className="buttons">
                        <button className="btn btn-secondary button">
                            <FontAwesomeIcon icon={faPlus} /> New
                        </button>
                    </div>
                    <div className="search">
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon1">search</span>
                            <input type="text" className="form-control" placeholder="search activities" aria-label="activity" aria-describedby="basic-addon1" />
                        </div>
                    </div>
                </div>
                <div className="activityList">
                    {activities}
                </div>
            </div>
        </Dashboard >
    )
}
