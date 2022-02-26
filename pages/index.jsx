import { getFeaturedEvents } from '../helpers/api-util';
import EventsList from '../components/events/event-list.component';

const HomePage = (props) => {
    const featuredEvents = props.events;

    return (
        <div>
            <h1 className='center' style={{ marginTop: '3rem' }}>Featured Events</h1>
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