import React from 'react'
import OverviewCard from './OverviewCard';
import sidebarValues from './sidebarValues';
import CardContainer from './CardContainer';

export default function DashboardOverview() {

    const cards = sidebarValues.map(item => {
        if (item.value !== "overview") {
            return (
                <div className="col-md-4 col-12 p-2" key={item.value}>
                    <OverviewCard value={item.value} title={item.name} subtitle={item.description} icon={item.icon} />
                </div>
            )
        } else {
            return null;
        }
    });

    return (
        <CardContainer>
            {cards}
        </CardContainer>
    )
}
