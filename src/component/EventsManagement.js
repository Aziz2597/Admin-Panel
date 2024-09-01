import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventsManagement = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    physicalVenue: '',
    onlineVenue: '',
    description: '',
    registrationLink: '',
  });
  const [isAdding, setIsAdding] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [dateError, setDateError] = useState('');
  const [timeError, setTimeError] = useState('');

  useEffect(() => {
    // Fetch events from the API
    axios.get('http://localhost:5001/api/events')
      .then(response => {
        const currentTime = new Date().toISOString();
        const fetchedEvents = response.data.filter(event => {
          const eventDateTime = new Date(`${event.date} ${event.time}`).toISOString();
          return eventDateTime > currentTime;
        });
        setEvents(fetchedEvents);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const handleEventChange = (field, value) => {
    setNewEvent(prevEvent => ({ ...prevEvent, [field]: value }));
  };

  const validateDateTime = () => {
    const currentTime = new Date();
    const eventDate = new Date(newEvent.date);
    const eventDateTime = new Date(`${newEvent.date}T${newEvent.time}`);
  
    let isValid = true;
    let dateError = '';
    let timeError = '';
  
    // Check if date is in the past
    if (eventDate < currentTime) {
      dateError = 'Date cannot be in the past.';
      isValid = false;
    }
  
    // Check if time is in the past (relative to the current date)
    if (newEvent.date === '' || newEvent.time === '') {
      timeError = 'Both date and time are required.';
      isValid = false;
    } else if (eventDate.toDateString() === currentTime.toDateString() && eventDateTime < currentTime) {
      timeError = "Today's Time cannot be in the past.";
      isValid = false;
    }
  
    setDateError(dateError);
    setTimeError(timeError);
  
    return isValid;
  };
  

  const handleAddEvent = () => {
    if (!validateDateTime()) {
      return;
    }

    if (editIndex !== null) {
      const updatedEvents = [...events];
      updatedEvents[editIndex] = newEvent;
      setEvents(updatedEvents);
      setEditIndex(null);
    } else {
      axios.post('http://localhost:5001/api/events', newEvent)
        .then(response => {
          setEvents([...events, response.data]);
          alert('Event submitted successfully!');
        })
        .catch(error => {
          console.error('Error adding event:', error);
        });
    }
    setNewEvent({ title: '', date: '', time: '', physicalVenue: '', onlineVenue: '', description: '', registrationLink: '' });
    setIsAdding(false);
  };

  const handleEditEvent = (index) => {
    setNewEvent(events[index]);
    setEditIndex(index);
    setIsAdding(true);
  };

  const handleDeleteEvent = (id, index) => {
    axios.delete(`http://localhost:5001/api/events/${id}`)
      .then(() => {
        const updatedEvents = events.filter((_, i) => i !== index);
        setEvents(updatedEvents);
      })
      .catch(error => {
        console.error('Error deleting event:', error);
      });
  };

  const handleCancel = () => {
    setNewEvent({ title: '', date: '', time: '', physicalVenue: '', onlineVenue: '', description: '', registrationLink: '' });
    setIsAdding(false);
    setEditIndex(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateDateTime()) {
      handleAddEvent();
      alert('Event submitted successfully!');
    }
  };
  
  const formatDate = (dateString, timeString) => {
    const optionsDate = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: true };
  
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-GB', optionsDate);
    const formattedTime = new Date(`1970-01-01T${timeString}`).toLocaleTimeString('en-US', optionsTime);
  
    return `${formattedDate}, ${formattedTime}`;
  };
  
  const calculateCountdown = (eventDate) => {
    const now = new Date();
    const eventDateTime = new Date(eventDate);
    const timeDiff = eventDateTime - now;
  
    if (timeDiff <= 0) return 'Event has passed';
  
    const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
  
    return `....${years > 0 ? `${years} years, ` : ''}${months > 0 ? `${months} months, ` : ''}${days > 0 ? `${days} days, ` : ''}${hours > 0 ? `${hours} hours, ` : ''}${minutes > 0 ? `${minutes} minutes, ` : ''}${seconds} seconds to go`;
  };

  return (
    <div className="events-management">
      <h2>Upcoming Events/Webinars Management</h2>
      {events.length > 0 ? (
        <ul style={{ paddingLeft: '0', marginLeft: '20px' }}>
          {events.map((event, index) => (
            <li
              key={event._id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative',
                paddingLeft: '10px'
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: '-10px',
                  content: '"•"',
                  fontSize: '20px',
                  color: '#000'
                }}
              >
                •
              </span>
              <div style={{ flex: 1 }}>
                {event.title} ({formatDate(event.date, event.time)})
                <span style={{ marginLeft: '4ch', color: '#888', fontSize: '14px' }}>
                  {calculateCountdown(`${event.date} ${event.time}`)}
                </span>
              </div>
              <div>
                <button style={{ marginRight: '10px' }} onClick={() => handleEditEvent(index)}>Edit</button>
                <button onClick={() => handleDeleteEvent(event._id, index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No upcoming events found.</p>
      )}
      {!isAdding && (
        <button onClick={() => setIsAdding(true)}>Add Event</button>
      )}
      {isAdding && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label style={{ display: 'block', marginTop: '10px', marginBottom: '0px' }}>Title:</label>
            <input
              type="text"
              value={newEvent.title}
              onChange={(e) => handleEventChange('title', e.target.value)}
              placeholder="Enter event title"
            />

            <label style={{ display: 'block', marginTop: '10px' }}>Date:</label>
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => handleEventChange('date', e.target.value)}
            />
            

            <label style={{ display: 'block', marginTop: '10px' }}>Time:</label>
            <input
              type="time"
              value={newEvent.time}
              onChange={(e) => handleEventChange('time', e.target.value)}
            />

            <label style={{ display: 'block', marginTop: '15px', marginBottom: '0px' }}>Physical Venue:</label>
            <input
              type="text"
              value={newEvent.physicalVenue}
              onChange={(e) => handleEventChange('physicalVenue', e.target.value)}
              placeholder="Enter physical venue (if applicable)"
            />

            <label style={{ display: 'block', marginTop: '15px', marginBottom: '0px' }}>Online Venue:</label>
            <input
              type="text"
              value={newEvent.onlineVenue}
              onChange={(e) => handleEventChange('onlineVenue', e.target.value)}
              placeholder="Enter online venue link (if applicable)"
            />

            <label style={{ display: 'block', marginTop: '10px' }}>Registration Link:</label>
            <input
              type="url"
              value={newEvent.registrationLink}
              onChange={(e) => handleEventChange('registrationLink', e.target.value)}
              placeholder="Enter registration link"
            />

            <label style={{ display: 'block', marginTop: '13px' }}>Description:</label>
            <textarea
              value={newEvent.description}
              onChange={(e) => handleEventChange('description', e.target.value)}
              placeholder="Enter event description"
            />
          </div>
          {dateError && <p style={{ color: 'red' }}>{dateError}</p>}
          {timeError && <p style={{ color: 'red' }}>{timeError}</p>}
          <button type="submit" style={{ marginRight: '10px' }}>Save Changes</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default EventsManagement;
