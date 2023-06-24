export const getAllEvents = async () => {
    const resp = await fetch('https://nextjs-course-2-4169f-default-rtdb.firebaseio.com/events.json');
    const data = await resp.json();

    const events = [];
    for (const key in data) {
        events.push({
            id: key,
            ...data[key]
        })
    }
    return events;
}

export const getFeaturedEvents = async () => {
    const allEvents = await getAllEvents();
    return allEvents.filter((event) => event.isFeatured);
}

export const getEventById = async (id) => {
    const allEvents = await getAllEvents();
    return allEvents.find((event) => event.id === id);
}

export const getFilteredEvents = async (dateFilter) => {
    const { year, month } = dateFilter;

    const allEvents = await getAllEvents();
  
    let filteredEvents = allEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
    });
  
    return filteredEvents;
}