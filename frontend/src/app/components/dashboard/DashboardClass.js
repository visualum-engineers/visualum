import React from 'react'
import Dashboard from './Dashboard'
import StudentCard from './StudentCard'
import { useHistory } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export default function DashboardClass() {
    // let { class_id } = useParams();
    // USE CLASS_ID TO RETRIEVE CLASS DATA
    let history = useHistory();
    const onBack = () => {
        history.push("/dashboard/classes");
    }

    const studentData = [
        {
            name: "Derek Widmer",
            average: 98
        },
        {
            name: "Arky Asmal",
            average: 95.5
        },
        {
            name: "Luis Lopez",
            average: 99.2
        },
        {
            name: "Kevin Arias",
            average: 99.2
        },
        {
            name: "Emilio Samaniego",
            average: 97
        },

    ]
    return (
        <Dashboard page="classes">
            <div className="control-bar">
                <div className="buttons">
                    <button className="btn btn-secondary button" onClick={onBack}>
                        <FontAwesomeIcon icon={faChevronLeft} /> Back
                    </button>
                </div>
            </div>
            <div className="card-container">
                <StudentCard data={studentData[0]} />
                <StudentCard data={studentData[1]} />
                <StudentCard data={studentData[2]} />
                <StudentCard data={studentData[3]} />
                <StudentCard data={studentData[4]} />
            </div>
        </Dashboard >
    )
}