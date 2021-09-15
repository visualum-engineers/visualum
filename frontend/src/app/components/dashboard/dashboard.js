import React, { useState } from 'react'

export default function Dashboard() {
    const [selected, setSelected] = useState("my-class");
    return (
        <div className="container vh-100 d-flex flex-column justify-content-center">
            <div className="dashboard-container">
                <div className="sidebar">
                    <Item name="My Class" value="my-class" handleSelect={setSelected} selected={selected} />
                    <Item name="Statistics" value="statistics" selected={selected} handleSelect={setSelected} />
                    <Item name="Grades" value="grades" selected={selected} handleSelect={setSelected} />
                    <Item name="Settings" value="settings" selected={selected} handleSelect={setSelected} />
                    <Item name="Help" value="help" selected={selected} handleSelect={setSelected} />
                </div>
                <div className="main-content"></div>
            </div>
        </div>
    )
}

function Item(props) {
    return (
        <div className={`sidebar-item ${props.selected === props.value ? 'item-selected' : ''}`} onClick={() => props.handleSelect(props.value)}>
            <p>{props.name}</p>
        </div>
    )
}
