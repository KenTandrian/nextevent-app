import React, { Fragment } from "react";
import { useRouter } from "next/router";

import { getEventById } from "../../dummy-data";
import EventSummary from '../../components/event-detail/event-summary.component';
import EventLogistics from '../../components/event-detail/event-logistics.component';
import EventContent from "../../components/event-detail/event-content.component";
import ErrorAlert from "../../components/ui/error-alert.component";
import Button from "../../components/ui/button.component";

const EventDetailPage = () => {
    const router = useRouter();

    const eventId = router.query.eventId;
    const event = getEventById(eventId);

    if (!event) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>No event found!</p>
                </ErrorAlert>
                <div className="center">
                    <Button link='/events'>Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <EventSummary title={event.title}/>
            <EventLogistics 
                date={event.date}
                address={event.location}
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </Fragment>
    )
}

export default EventDetailPage;