



import './Calender.css'; 

const Calendar = () => {
  // Sample array of events
  const events = [
    { id: 1, title: 'Meeting', date: '2024-06-15' },
    { id: 2, title: 'Presentation', date: '2024-06-20' },
    { id: 3, title: 'Team Lunch', date: '2024-06-25' },
  ];

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  return (
    <div className="calendar">
      {/* <h2>Calendar</h2> */}
      <div className="calendar-events">
        {events.map((event) => (
          <div key={event.id} className="calendar-event">
            <div className="event-date">{formatDate(event.date)}</div>
            <div className="event-details">{event.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
