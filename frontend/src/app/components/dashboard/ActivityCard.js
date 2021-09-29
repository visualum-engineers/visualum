import React from 'react'

export default function ActivityCard(props) {
    console.log(props.data)
    return (
        <div className="activity">
            <div className="row">
                <div className="col-5">
                    <div className="title">{props.data.name}</div>
                </div>
                <div className="col-2">
                    <div className="num-questions">Questions: {props.data.questions.length}</div>
                </div>
                <div className="col-5">
                    <div className="btns">
                        <button className="edit-button btn btn-secondary">Edit</button>
                        <button className="delete-button btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
