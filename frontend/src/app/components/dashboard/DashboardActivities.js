import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Dashboard from './Dashboard'

export default function DashboardActivities() {
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
                            <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                        </div>
                    </div>
                </div>
            </div>
        </Dashboard>
    )
}
