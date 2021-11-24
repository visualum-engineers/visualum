import React from 'react'
import Dashboard from './Dashboard';
import OverviewCard from './OverviewCard';
import sidebarValues from './sidebarValues';
import CardContainer from './CardContainer';

export default function DashboardHome() {

    const cards = sidebarValues.map(item => {
        if (item.value != "home") {
            return (
                <div className="col-md-4 col-12 p-2">
                    <OverviewCard value={item.value} title={item.name} subtitle={item.description} />
                </div>
            )
        }
    });

    return (
        <Dashboard page="home">
            <CardContainer>
                {cards}
            </CardContainer>
        </Dashboard>
    )
}
