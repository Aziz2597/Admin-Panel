import React, { useState } from 'react';

const NewsManagement = () => {
  const [newsItems, setNewsItems] = useState([
    { title: 'News Item 1', content: 'Content for news item 1' },
    { title: 'News Item 2', content: 'Content for news item 2' },
  ]);

  const [newNewsItem, setNewNewsItem] = useState({ title: '', content: '' });

  const handleNewsChange = (index, field, value) => {
    const updatedNewsItems = [...newsItems];
    updatedNewsItems[index] = { ...updatedNewsItems[index], [field]: value };
    setNewsItems(updatedNewsItems);
  };

  const handleAddNewsItem = () => {
    setNewsItems([...newsItems, { ...newNewsItem }]);
    setNewNewsItem({ title: '', content: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to the server
    console.log('Submitted News Items:', newsItems);
    alert('News Management updated successfully!');
  };

  return (
    <div className="news-management">
      <h2>Latest News/Blog Posts Management</h2>
      <form onSubmit={handleSubmit}>
        {newsItems.map((newsItem, index) => (
          <div key={index} className="form-group">
            <label>News Item {index + 1} Title:</label>
            <input
              type="text"
              value={newsItem.title}
              onChange={(e) => handleNewsChange(index, 'title', e.target.value)}
              placeholder="Enter news title"
            />
            <label>Content:</label>
            <textarea
              value={newsItem.content}
              onChange={(e) => handleNewsChange(index, 'content', e.target.value)}
              placeholder="Enter news content"
            />
          </div>
        ))}
        <div className="form-group">
          <h3>Add New News Item</h3>
          <label>Title:</label>
          <input
            type="text"
            value={newNewsItem.title}
            onChange={(e) => setNewNewsItem({ ...newNewsItem, title: e.target.value })}
            placeholder="Enter new news title"
          />
          <label>Content:</label>
          <textarea
            value={newNewsItem.content}
            onChange={(e) => setNewNewsItem({ ...newNewsItem, content: e.target.value })}
            placeholder="Enter new news content"
          />
          <button type="button" onClick={handleAddNewsItem}>Add News Item</button>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default NewsManagement;
