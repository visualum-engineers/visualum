import React from 'react'
import StudentCard from './StudentCard'
import { useNavigate } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import CardContainer from './CardContainer'

export default function DashboardClass() {
    // let { class_id } = useParams();
    // USE CLASS_ID TO RETRIEVE CLASS DATA
    let navigate = useNavigate();

    const onBack = () => {
        navigate("/dashboard/classes");
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
            name: "Emilio Samaniego",
            average: 97
        },
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
            name: "Emilio Samaniego",
            average: 97
        },
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
            name: "Emilio Samaniego",
            average: 97
        },
    ]

    const cards = studentData.map(student => {
        return (
            <div className="col-md-6 col-xl-4 col-12 p-2">
                <StudentCard data={student} />
            </div>
        )
    });

    return (
        <div>
            <div className="control-bar">
                <div className="buttons">
                    <button className="btn btn-secondary button" onClick={onBack}>
                        <FontAwesomeIcon icon={faChevronLeft} /> Back
                    </button>
                </div>
            </div>
            <CardContainer>
                {cards}
            </CardContainer>
        </div >
    )
}