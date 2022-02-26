import React, { Fragment } from "react";
import { useRouter } from "next/router";

import { getAllEvents } from "../../helpers/api-util";

import EventsSearch from '../../components/events/events-search.component';
import EventsList from "../../components/events/event-list.component";

const AllEventsPage = (props) => {
    const { events } = props;
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

export const getStaticProps = async () => {
    const events = await getAllEvents();

    return {
        props: {
            events: events
        },
        revalidate: 60
    }
}

export default AllEventsPage;