import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

// import { getFilteredEvents } from "../../helpers/api-util";

import EventsList from "../../components/events/event-list.component";
import ResultsTitle from "../../components/events/results-title.component";
import Button from "../../components/ui/button.component";
import ErrorAlert from '../../components/ui/error-alert.component';

const FilteredEventsPage = () => {
    // CLIENT-SIDE DATA FETCHING -- load all events from Firebase
    const [loadedEvents, setLoadedEvents] = useState();

    const { data, error } = useSWR(
        'https://nextjs-course-2-4169f-default-rtdb.firebaseio.com/events.json', 
        (url) => fetch(url).then(res => res.json())
    );
    // console.log(data);

    useEffect(() => {
        if (data) {
            const events = [];
            for (const key in data) {
                events.push({
                    id: key,
                    ...data[key]
                });
            }
            setLoadedEvents(events);
        }
    }, [data]);
    
    if (!loadedEvents) {
        return <p className="center">Loading...</p>;
    }

    // CLIENT-SIDE DATA FETCHING -- filter the data
    const router = useRouter();
    const filterData = router.query.slug;

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const numYear = +filteredYear; // convert string to number
    const numMonth = +filteredMonth;

    if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12 || error) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>Invalid Filter. Please adjust your values!</p>
                </ErrorAlert>
                <div className="center">
                    <Button link='/events'>Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    const filteredEvents = loadedEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return (
            eventDate.getFullYear() === numYear && 
            eventDate.getMonth() === numMonth - 1
        );
    });

    // SERVER-SIDE PROPS WORKS FROM HERE
    if(!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>No events found for the chosen filter.</p>
                </ErrorAlert>
                <div className="center">
                    <Button link='/events'>Show All Events</Button>
                </div>
            </Fragment>
        )
    }

    const date = new Date(numYear, numMonth - 1);

    return (
        <Fragment>
            <ResultsTitle date={date} />
            <EventsList items={filteredEvents} />
        </Fragment>
    )
}

// export const getServerSideProps = async (context) => {
//     const { params } = context;

//     const filterData = params.slug;

//     const filteredYear = filterData[0];
//     const filteredMonth = filterData[1];

//     const numYear = +filteredYear; // convert string to number
//     const numMonth = +filteredMonth;

//     // Validation
//     if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
//         // If the validation fails...
//         return {
//             props: { hasError: true },
//             // notFound: true,
//             // redirect: {
//             //     destination: '/error'
//             // }
//         }
//     }

//     const filteredEvents = await getFilteredEvents({
//         year: numYear,
//         month: numMonth
//     });

//     return {
//         props: {
//             events: filteredEvents,
//             date: {
//                 year: numYear,
//                 month: numMonth
//             }
//         }
//     }
// }

export default FilteredEventsPage;