import React from "react";
import EventItem from "./event-item.component";

import classes from './event-list.module.css';

type Props = {
    items: IEvent[];
}

const EventsList = (props: Props) => {
    const { items } = props;

    return (
        <ul className={classes.list}>
            { 
                items.map((event) => <EventItem key={event.id} {...event} />) 
            }
        </ul>
    )
}

export default EventsList;