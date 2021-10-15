import React from 'react'
import Dashboard from './Dashboard'
import ActivityCard from './ActivityCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function DashboardActivities(props) {

    let activities = [];
    props.data.forEach(activity => {
        activities.push(<ActivityCard data={activity} />)
    });

    return (
        <Dashboard page="activities">
            <div className="row-container">
                <div className="control-bar">
                    <div className="buttons">
                        <button className="btn btn-success button">
                            <FontAwesomeIcon icon={faPlus} /> New
                        </button>
                    </div>
                    <div className="search">
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon1">Search</span>
                            <input type="text" className="form-control" placeholder="Search Activities" aria-label="activity" aria-describedby="basic-addon1" />
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
