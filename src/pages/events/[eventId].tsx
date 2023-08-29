import React, { Fragment } from "react";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Head from "next/head";
// import { useRouter } from "next/router";

import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import EventSummary from '../../components/event-detail/event-summary.component';
import EventLogistics from '../../components/event-detail/event-logistics.component';
import EventContent from "../../components/event-detail/event-content.component";
import ErrorAlert from "../../components/ui/error-alert.component";
import Button from "../../components/ui/button.component";
import Comment from '../../components/input/comments.component';

const EventDetailPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    // const router = useRouter();
    // const eventId = router.query.eventId;
    // const event = getEventById(eventId);
    const event = props.selectedEvent;

    if (!event) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>Loading...</p>
                </ErrorAlert>
                <div className="center">
                    <Button link='/events'>Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <Head>
                <title>{event.title}</title>
                <meta 
                    name='description' 
                    content={event.description}
                />
            </Head>
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
            <Comment eventId={event.id} />
        </Fragment>
    )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
    const eventId = context.params.eventId;
    const event = await getEventById(eventId);

    return {
        props: {
            selectedEvent: event
        },
        revalidate: 30
    }
}

export const getStaticPaths = async () => {
    const allEvents = await getFeaturedEvents();
    const paths = allEvents.map(
        event => ({ params: { eventId: event.id } })
    );

    return {
        paths: paths,
        fallback: 'blocking' 
    };
} // fallback: true --> telling next.js that there are more pages than prepared (featured)

export default EventDetailPage;