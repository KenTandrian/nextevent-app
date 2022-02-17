import { getFeaturedEvents } from '../dummy-data';
import EventsList from '../components/events/event-list.component';

const HomePage = () => {
    const featuredEvents = getFeaturedEvents();

    return (
        <div>
            <h1 className='center' style={{ marginTop: '3rem' }}>Featured Events</h1>
            <EventsList items={featuredEvents} />
        </div>
    )
}

export default HomePage;