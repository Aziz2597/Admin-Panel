import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TestimonialsManagement = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [newTestimonial, setNewTestimonial] = useState({ name: '', position: '', text: '', photo: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [expandedTestimonial, setExpandedTestimonial] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5001/api/testimonials')
      .then(response => {
        setTestimonials(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching testimonials!', error);
      });
  }, []);

  const handleTestimonialChange = (field, value) => {
    setNewTestimonial({ ...newTestimonial, [field]: value });
  };

  const handleAddTestimonial = () => {
    const formData = new FormData();
    formData.append('name', newTestimonial.name);
    formData.append('position', newTestimonial.position);
    formData.append('text', newTestimonial.text);
    if (newTestimonial.photo instanceof File) {
      formData.append('photo', newTestimonial.photo);
    }

    axios.post('http://localhost:5001/api/testimonials', formData)
      .then(response => {
        setTestimonials([...testimonials, response.data]);
        setNewTestimonial({ name: '', position: '', text: '', photo: '' });
        setIsAdding(false);
      })
      .catch(error => {
        console.error('There was an error adding the testimonial!', error);
      });
  };

  const handleEditTestimonial = (index) => {
    setEditingIndex(index);
    setNewTestimonial(testimonials[index]);
    setIsAdding(true);
  };

  const handleUpdateTestimonial = () => {
    const formData = new FormData();
    formData.append('name', newTestimonial.name);
    formData.append('position', newTestimonial.position);
    formData.append('text', newTestimonial.text);
    if (newTestimonial.photo instanceof File) {
      formData.append('photo', newTestimonial.photo);
    }

    axios.put(`http://localhost:5001/api/testimonials/${testimonials[editingIndex]._id}`, formData)
      .then(response => {
        const updatedTestimonials = testimonials.map((testimonial, index) =>
          index === editingIndex ? response.data : testimonial
        );
        setTestimonials(updatedTestimonials);
        setEditingIndex(null);
        setNewTestimonial({ name: '', position: '', text: '', photo: '' });
        setIsAdding(false);
      })
      .catch(error => {
        console.error('There was an error updating the testimonial!', error);
      });
  };

  const handleDeleteTestimonial = (id) => {
    axios.delete(`http://localhost:5001/api/testimonials/${id}`)
      .then(() => {
        setTestimonials(testimonials.filter(testimonial => testimonial._id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the testimonial!', error);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewTestimonial(prevState => ({ ...prevState, photo: file }));
    }
  };

  const handleCancel = () => {
    setNewTestimonial({ name: '', position: '', text: '', photo: '' });
    setEditingIndex(null);
    setIsAdding(false);
  };

  const toggleExpandTestimonial = (id) => {
    setExpandedTestimonial(expandedTestimonial === id ? null : id);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'No Date' : date.toLocaleDateString();
  };

  return (
    <div className="testimonials-management">
      <h2>Client Testimonials Management</h2>

      {testimonials.length > 0 && (
        <div>
          <ul style={{ paddingLeft: '0', marginLeft: '20px' }}>
            {testimonials.map((testimonial) => (
              <li
                key={testimonial._id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  position: 'relative',
                  paddingLeft: '20px', // Space for the bullet point
                  marginBottom: '10px'
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    left: '0',
                    fontSize: '20px',
                    color: '#000',
                    lineHeight: '1'
                  }}
                >
                  •
                </span>
                <span
                  onClick={() => toggleExpandTestimonial(testimonial._id)}
                  style={{
                    cursor: 'pointer',
                    flex: '1',
                    paddingRight: '10px'
                  }}
                >
                  {testimonial.name} ({formatDate(testimonial.date)})
                </span>
                <div>
                  <button style={{ marginRight: '10px' }} onClick={() => handleEditTestimonial(testimonials.indexOf(testimonial))}>Edit</button>
                  <button onClick={() => handleDeleteTestimonial(testimonial._id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>

        </div>
      )}

      {!isAdding && (
        <button onClick={() => setIsAdding(true)}>Add New Testimonial</button>
      )}

      {(isAdding || editingIndex !== null) && (
        <div className="form-group">
          <h3>{editingIndex !== null ? 'Edit Testimonial' : 'Add New Testimonial'}</h3>
          <label>Name:</label>
          <input
            type="text"
            value={newTestimonial.name}
            onChange={(e) => handleTestimonialChange('name', e.target.value)}
            placeholder="Enter client's name"
          />
          <label>Position:</label>
          <input
            type="text"
            value={newTestimonial.position}
            onChange={(e) => handleTestimonialChange('position', e.target.value)}
            placeholder="Enter client's position"
          />
          <label>Text:</label>
          <textarea
            value={newTestimonial.text}
            onChange={(e) => handleTestimonialChange('text', e.target.value)}
            placeholder="Enter testimonial text"
          />
          <label>Photo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {newTestimonial.photo && typeof newTestimonial.photo === 'string' && (
            <img src={newTestimonial.photo} alt="Preview" style={{ width: '100px', marginTop: '10px' }} />
          )}
          <button type="button" onClick={editingIndex !== null ? handleUpdateTestimonial : handleAddTestimonial}>
            {editingIndex !== null ? 'Update Testimonial' : 'Add Testimonial'}
          </button>
          <button type="button" style={{ marginLeft: '10px' }} onClick={handleCancel}>Cancel</button>
        </div>
      )}

      {expandedTestimonial && (
        <div className="testimonial-card">
          {testimonials.map(testimonial => (
            testimonial._id === expandedTestimonial && (
              <div key={testimonial._id} style={{ display: 'flex', alignItems: 'center', marginTop: '20px', border: '1px solid #ddd', padding: '10px' }}>
                <img src={`http://localhost:5001${testimonial.photo}`} alt="Testimonial" style={{ width: '100px', height: '100px', marginRight: '20px' }} />
                <div>
                  <h4>{testimonial.name}</h4>
                  <p><strong>Position:</strong> {testimonial.position}</p>
                  <p>{testimonial.text}</p>
                </div>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialsManagement;
