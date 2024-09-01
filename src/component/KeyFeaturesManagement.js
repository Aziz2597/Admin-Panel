import React, { useState, useEffect } from 'react';
import axios from 'axios';

const KeyFeaturesManagement = () => {
  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState({
    title: '',
    subHeadline: '',
    icon: '',
    description: ''
  });
  const [showAddNew, setShowAddNew] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [currentUpdateIndex, setCurrentUpdateIndex] = useState(null);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/features');
        setFeatures(response.data);
      } catch (error) {
        console.error('Error fetching features:', error);
      }
    };

    fetchFeatures();
  }, []);

  const handleAddFeature = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/features', newFeature);
      setFeatures([...features, response.data]);
      setNewFeature({
        title: '',
        subHeadline: '',
        icon: '',
        description: ''
      });
      setShowAddNew(false);
    } catch (error) {
      console.error('Error adding new feature:', error);
    }
  };

  const handleUpdateFeature = async (index) => {
    try {
      const updatedFeature = features[index];
      if (!updatedFeature._id) {
        console.error('Feature does not have a valid _id:', updatedFeature);
        return;
      }

      const response = await axios.put(`http://localhost:5001/api/features/${updatedFeature._id}`, updatedFeature);
      const updatedFeatures = [...features];
      updatedFeatures[index] = response.data;
      setFeatures(updatedFeatures);
      setShowUpdate(false);
      setCurrentUpdateIndex(null);
    } catch (error) {
      console.error('Error updating feature:', error);
    }
  };

  const handleDeleteFeature = async (index) => {
    try {
      const deletedFeature = features[index];
      await axios.delete(`http://localhost:5001/api/features/${deletedFeature._id}`);
      setFeatures(features.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting feature:', error);
    }
  };

  const openUpdateWindow = (index) => {
    setCurrentUpdateIndex(index);
    setShowUpdate(true);
  };

  const handleCancelAddNew = () => {
    setNewFeature({
      title: '',
      subHeadline: '',
      icon: '',
      description: ''
    });
    setShowAddNew(false);
  };

  const handleCancelUpdate = () => {
    setShowUpdate(false);
    setCurrentUpdateIndex(null);
  };

  return (
    <div>
      <h2>Key Features/Services Management</h2>
      <ul>
        {features.map((feature, index) => (
          <li key={feature._id} style={{ display: 'flex', justifyContent: 'space-between' }}>
            {feature.title}
            <div>
              <button style={{ marginRight: '10px' }} onClick={() => openUpdateWindow(index)}>Update</button>
              <button onClick={() => handleDeleteFeature(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {showUpdate && currentUpdateIndex !== null && (
        <div>
          <h3>Update Feature</h3>
          <label>Title:</label>
          <input
            type="text"
            value={features[currentUpdateIndex].title}
            onChange={(e) => {
              const updatedItems = [...features];
              updatedItems[currentUpdateIndex].title = e.target.value;
              setFeatures(updatedItems);
            }}
          />
          <label>Sub-headline:</label>
          <input
            type="text"
            value={features[currentUpdateIndex].subHeadline}
            onChange={(e) => {
              const updatedItems = [...features];
              updatedItems[currentUpdateIndex].subHeadline = e.target.value;
              setFeatures(updatedItems);
            }}
          />
          <label>Icon URL:</label>
          <input
            type="text"
            value={features[currentUpdateIndex].icon}
            onChange={(e) => {
              const updatedItems = [...features];
              updatedItems[currentUpdateIndex].icon = e.target.value;
              setFeatures(updatedItems);
            }}
          />
          <label>Description:</label>
          <input
            type="text"
            value={features[currentUpdateIndex].description}
            onChange={(e) => {
              const updatedItems = [...features];
              updatedItems[currentUpdateIndex].description = e.target.value;
              setFeatures(updatedItems);
            }}
          />
          <button style={{ marginRight: '10px' }} onClick={() => handleUpdateFeature(currentUpdateIndex)}>Save</button>
          <button onClick={handleCancelUpdate}>Cancel</button>
        </div>
      )}
      <button onClick={() => setShowAddNew(true)}>Add New</button>

      {showAddNew && (
        <div>
          <h3>Add New Feature</h3>
          <label>Title:</label>
          <input
            type="text"
            value={newFeature.title}
            onChange={(e) => setNewFeature({ ...newFeature, title: e.target.value })}
            placeholder="Enter feature title"
          />
          <label>Sub-headline:</label>
          <input
            type="text"
            value={newFeature.subHeadline}
            onChange={(e) => setNewFeature({ ...newFeature, subHeadline: e.target.value })}
            placeholder="Enter sub-headline"
          />
          <label>Icon URL:</label>
          <input
            type="text"
            value={newFeature.icon}
            onChange={(e) => setNewFeature({ ...newFeature, icon: e.target.value })}
            placeholder="Enter icon URL"
          />
          <label>Description:</label>
          <input
            type="text"
            value={newFeature.description}
            onChange={(e) => setNewFeature({ ...newFeature, description: e.target.value })}
            placeholder="Enter description"
          />
          <button style={{ marginRight: '10px' }} onClick={handleAddFeature}>Save</button>
          <button onClick={handleCancelAddNew}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default KeyFeaturesManagement;
