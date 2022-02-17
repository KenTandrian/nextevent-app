import React, { Fragment } from "react";
import { useRouter } from "next/router";

import { getAllEvents } from "../../dummy-data";

import EventsSearch from '../../components/events/events-search.component';
import EventsList from "../../components/events/event-list.component";

const AllEventsPage = () => {
    const events = getAllEvents();
    const router = useRouter();

    const findEventHandler = (year, month) => {
        const fullPath = `/events/${year}/${month}`;
        router.push(fullPath);
    }

    return (
        <Fragment>
            <EventsSearch onSearch={findEventHandler} />
            <EventsList items={events} />
        </Fragment>
    )
}

export default AllEventsPage;