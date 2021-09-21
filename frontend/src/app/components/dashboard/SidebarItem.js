import React from 'react'

export default function SidebarItem(props) {
    return (
        <div className="sidebar-item">
            <div className={`tab-button ${props.selected === props.value ? 'selected' : ''}`} onClick={() => props.handleSelect(props.value)}>
                <p>{props.name}</p>
            </div>
        </div>
    )
}
