import React, { useState } from 'react';

const TestimonialsManagement = () => {
  const [testimonials, setTestimonials] = useState([
    { name: 'John Doe', text: 'Great service!' },
    { name: 'Jane Smith', text: 'Very satisfied with the product.' },
  ]);

  const [newTestimonial, setNewTestimonial] = useState({ name: '', text: '' });

  const handleTestimonialChange = (index, field, value) => {
    const updatedTestimonials = [...testimonials];
    updatedTestimonials[index] = { ...updatedTestimonials[index], [field]: value };
    setTestimonials(updatedTestimonials);
  };

  const handleAddTestimonial = () => {
    setTestimonials([...testimonials, { ...newTestimonial }]);
    setNewTestimonial({ name: '', text: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to the server
    console.log('Submitted Testimonials:', testimonials);
    alert('Testimonials updated successfully!');
  };

  return (
    <div className="testimonials-management">
      <h2>Client Testimonials Management</h2>
      <form onSubmit={handleSubmit}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="form-group">
            <label>Testimonial {index + 1} Name:</label>
            <input
              type="text"
              value={testimonial.name}
              onChange={(e) => handleTestimonialChange(index, 'name', e.target.value)}
              placeholder="Enter client's name"
            />
            <label>Testimonial Text:</label>
            <textarea
              value={testimonial.text}
              onChange={(e) => handleTestimonialChange(index, 'text', e.target.value)}
              placeholder="Enter testimonial text"
            />
          </div>
        ))}
        <div className="form-group">
          <h3>Add New Testimonial</h3>
          <label>Name:</label>
          <input
            type="text"
            value={newTestimonial.name}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
            placeholder="Enter new client's name"
          />
          <label>Text:</label>
          <textarea
            value={newTestimonial.text}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, text: e.target.value })}
            placeholder="Enter new testimonial text"
          />
          <button type="button" onClick={handleAddTestimonial}>Add Testimonial</button>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default TestimonialsManagement;
