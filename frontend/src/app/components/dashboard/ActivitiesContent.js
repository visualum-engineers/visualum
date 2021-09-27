import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function ActivitiesContent() {
    return (
        <div className="activities-container">
            <div className="control-bar">
                <div className="buttons">
                    <button className="btn btn-secondary button">
                        <FontAwesomeIcon icon={faPlus} /> New
                    </button>
                </div>
                <div className="search">
                    <div class="input-group">
                        <span class="input-group-text" id="basic-addon1">search</span>
                        <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                </div>
            </div>
        </div>
    )
}