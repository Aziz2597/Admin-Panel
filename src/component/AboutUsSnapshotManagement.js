import React, { useState } from 'react';

const AboutUsSnapshotManagement = () => {
  // State variables to hold form data
  const [title, setTitle] = useState('Our Company');
  const [description, setDescription] = useState('We provide exceptional services and products to our clients.');
  const [image, setImage] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to the server
    console.log('Submitted Data:', { title, description, image });
    alert('About Us Snapshot updated successfully!');
  };

  // Function to handle file input changes
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="about-us-snapshot-management">
      <h2>About Us Snapshot Management</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter the description"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {image && <img src={image} alt="Preview" style={{ width: '100px', marginTop: '10px' }} />}
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default AboutUsSnapshotManagement;
