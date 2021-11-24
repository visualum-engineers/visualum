import React, { useState } from 'react'
import Dashboard from './Dashboard'
import ActivityCard from './ActivityCard';
import CardContainer from './CardContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function DashboardActivities(props) {

    const [activities, setActivities] = useState(props.data)

    const cards = activities.map(activity => {
        return (
            <div className="col-lg-6 col-12 p-2">
                <ActivityCard data={activity} />
            </div>
        )
    });

    const addActivity = (newActivity) => {
        setActivities(curr => [...curr, newActivity])
    }

    return (
        <Dashboard page="activities">
            <div className="row-container">
                <div className="control-bar">
                    <div className="buttons">
                        <button className="btn btn-success button">
                            <span className="pe-1"><FontAwesomeIcon icon={faPlus} /></span> New
                        </button>
                    </div>
                    <div className="search">
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon1">Search</span>
                            <input type="text" className="form-control" placeholder="Search Activities" aria-label="activity" aria-describedby="basic-addon1" />
                        </div>
                    </div>
                </div>
                <CardContainer>
                    {cards}
                </CardContainer>
            </div>
        </Dashboard >
    )
}
