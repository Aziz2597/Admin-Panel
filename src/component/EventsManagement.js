import React, { useState } from 'react';

const EventsManagement = () => {
  const [events, setEvents] = useState([
    { title: 'Webinar on React', date: '2024-09-01', description: 'An insightful webinar on React.js.' },
    { title: 'Workshop on Node.js', date: '2024-10-15', description: 'Hands-on workshop on Node.js.' },
  ]);

  const [newEvent, setNewEvent] = useState({ title: '', date: '', description: '' });

  const handleEventChange = (index, field, value) => {
    const updatedEvents = [...events];
    updatedEvents[index] = { ...updatedEvents[index], [field]: value };
    setEvents(updatedEvents);
  };

  const handleAddEvent = () => {
    setEvents([...events, { ...newEvent }]);
    setNewEvent({ title: '', date: '', description: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to the server
    console.log('Submitted Events:', events);
    alert('Events updated successfully!');
  };

  return (
    <div className="events-management">
      <h2>Upcoming Events/Webinars Management</h2>
      <form onSubmit={handleSubmit}>
        {events.map((event, index) => (
          <div key={index} className="form-group">
            <label>Event {index + 1} Title:</label>
            <input
              type="text"
              value={event.title}
              onChange={(e) => handleEventChange(index, 'title', e.target.value)}
              placeholder="Enter event title"
            />
            <label>Date:</label>
            <input
              type="date"
              value={event.date}
              onChange={(e) => handleEventChange(index, 'date', e.target.value)}
            />
            <label>Description:</label>
            <textarea
              value={event.description}
              onChange={(e) => handleEventChange(index, 'description', e.target.value)}
              placeholder="Enter event description"
            />
          </div>
        ))}
        <div className="form-group">
          <h3>Add New Event</h3>
          <label>Title:</label>
          <input
            type="text"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            placeholder="Enter new event title"
          />
          <label>Date:</label>
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          />
          <label>Description:</label>
          <textarea
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            placeholder="Enter new event description"
          />
          <button type="button" onClick={handleAddEvent}>Add Event</button>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EventsManagement;
