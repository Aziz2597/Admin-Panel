import React, { useState } from 'react';

const PortfolioManagement = () => {
  const [portfolioItems, setPortfolioItems] = useState([
    { title: 'Project 1', description: 'Description for project 1', image: '' },
    { title: 'Project 2', description: 'Description for project 2', image: '' },
  ]);

  const [newPortfolioItem, setNewPortfolioItem] = useState({ title: '', description: '', image: '' });

  const handlePortfolioChange = (index, field, value) => {
    const updatedPortfolioItems = [...portfolioItems];
    updatedPortfolioItems[index] = { ...updatedPortfolioItems[index], [field]: value };
    setPortfolioItems(updatedPortfolioItems);
  };

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedPortfolioItems = [...portfolioItems];
      updatedPortfolioItems[index] = { ...updatedPortfolioItems[index], image: URL.createObjectURL(file) };
      setPortfolioItems(updatedPortfolioItems);
    }
  };

  const handleAddPortfolioItem = () => {
    setPortfolioItems([...portfolioItems, { ...newPortfolioItem }]);
    setNewPortfolioItem({ title: '', description: '', image: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to the server
    console.log('Submitted Portfolio Items:', portfolioItems);
    alert('Portfolio updated successfully!');
  };

  return (
    <div className="portfolio-management">
      <h2>Portfolio/Gallery Preview Management</h2>
      <form onSubmit={handleSubmit}>
        {portfolioItems.map((item, index) => (
          <div key={index} className="form-group">
            <label>Portfolio Item {index + 1} Title:</label>
            <input
              type="text"
              value={item.title}
              onChange={(e) => handlePortfolioChange(index, 'title', e.target.value)}
              placeholder="Enter portfolio item title"
            />
            <label>Description:</label>
            <textarea
              value={item.description}
              onChange={(e) => handlePortfolioChange(index, 'description', e.target.value)}
              placeholder="Enter portfolio item description"
            />
            <label>Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(index, e)}
            />
            {item.image && <img src={item.image} alt="Preview" style={{ width: '100px', marginTop: '10px' }} />}
          </div>
        ))}
        <div className="form-group">
          <h3>Add New Portfolio Item</h3>
          <label>Title:</label>
          <input
            type="text"
            value={newPortfolioItem.title}
            onChange={(e) => setNewPortfolioItem({ ...newPortfolioItem, title: e.target.value })}
            placeholder="Enter new portfolio item title"
          />
          <label>Description:</label>
          <textarea
            value={newPortfolioItem.description}
            onChange={(e) => setNewPortfolioItem({ ...newPortfolioItem, description: e.target.value })}
            placeholder="Enter new portfolio item description"
          />
          <label>Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setNewPortfolioItem({ ...newPortfolioItem, image: URL.createObjectURL(file) });
              }
            }}
          />
          {newPortfolioItem.image && <img src={newPortfolioItem.image} alt="Preview" style={{ width: '100px', marginTop: '10px' }} />}
          <button type="button" onClick={handleAddPortfolioItem}>Add Portfolio Item</button>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default PortfolioManagement;
