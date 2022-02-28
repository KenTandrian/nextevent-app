import Head from 'next/head';

import { getFeaturedEvents } from '../helpers/api-util';
import EventsList from '../components/events/event-list.component';
import NewsletterRegistration from '../components/input/newsletter-registration.component';

const HomePage = (props) => {
    const featuredEvents = props.events;

    return (
        <div>
            <Head>
                <title>Next.js Events</title>
                <meta 
                    name='description' 
                    content='Find a lot of great events that allow you to evolve...' 
                />
            </Head>
            <h1 className='center' style={{ marginTop: '3rem' }}>Featured Events</h1>
            <NewsletterRegistration />
            <EventsList items={featuredEvents} />
        </div>
    )
}

export const getStaticProps = async () => {
    const featuredEvents = await getFeaturedEvents();

    return {
        props: {
            events: featuredEvents
        },
        revalidate: 1800
    }
}

export default HomePage;