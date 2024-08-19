import React, { useState } from 'react';

const ContactInfoManagement = () => {
  const [contactInfo, setContactInfo] = useState({
    phone: '123-456-7890',
    email: 'info@example.com',
    address: '123 Main St, Anytown, USA'
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setContactInfo({ ...contactInfo, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to the server
    console.log('Submitted Contact Info:', contactInfo);
    alert('Contact Info updated successfully!');
  };

  return (
    <div className="contact-info-management">
      <h2>Contact Information Management</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="text"
            id="phone"
            value={contactInfo.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            value={contactInfo.email}
            onChange={handleChange}
            placeholder="Enter email address"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Physical Address:</label>
          <textarea
            id="address"
            value={contactInfo.address}
            onChange={handleChange}
            placeholder="Enter physical address"
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default ContactInfoManagement;
