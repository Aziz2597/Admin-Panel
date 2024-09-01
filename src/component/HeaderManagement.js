import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HeaderManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [newMenuItem, setNewMenuItem] = useState({ name: '', route: '' });
  const [showAddNew, setShowAddNew] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [currentUpdateIndex, setCurrentUpdateIndex] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/headers');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  const handleAddMenuItem = async () => {
    try {
      await axios.post('http://localhost:5001/api/headers', [newMenuItem]);
      setMenuItems([...menuItems, newMenuItem]);
      setNewMenuItem({ name: '', route: '' });
      setShowAddNew(false);
    } catch (error) {
      console.error('Error adding new menu item:', error);
    }
  };

  const handleUpdateMenuItem = async (index) => {
    try {
      const updatedItem = menuItems[index];
      if (!updatedItem._id) {
        console.error('Item does not have a valid _id:', updatedItem);
        return;
      }

      const response = await axios.put(`http://localhost:5001/api/headers/${updatedItem._id}`, updatedItem);

      if (response.status === 200) {
        const updatedMenuItems = [...menuItems];
        updatedMenuItems[index] = response.data.data;
        setMenuItems(updatedMenuItems);
        setShowUpdate(false);
        setCurrentUpdateIndex(null);
      } else {
        console.error('Failed to update the item:', response);
      }
    } catch (error) {
      console.error('Error updating menu item:', error);
    }
  };

  const handleDeleteMenuItem = async (index) => {
    try {
      const deletedItem = menuItems[index];
      await axios.delete(`http://localhost:5001/api/headers/${deletedItem._id}`);
      setMenuItems(menuItems.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  const openUpdateWindow = (index) => {
    setCurrentUpdateIndex(index);
    setShowUpdate(true);
  };

  const handleCancelAddNew = () => {
    setNewMenuItem({ name: '', route: '' });
    setShowAddNew(false);
  };

  const handleCancelUpdate = () => {
    setShowUpdate(false);
    setCurrentUpdateIndex(null);
  };

  return (
    <div>
      <h2>Header Management</h2>
      <ul style={{ paddingLeft: '0', marginLeft: '20px' }}>
        {menuItems.map((item, index) => (
          <li
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'relative',
              paddingLeft: '20px' // Increase padding to accommodate bullet
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: '0',
                content: '"•"',
                fontSize: '20px',
                color: '#000'
              }}
            >
              •
            </span>
            <div style={{ flex: 1 }}>
              {item.name} ({item.route})
            </div>
            <div>
              <button style={{ marginRight: '10px' }} onClick={() => openUpdateWindow(index)}>Update</button>
              <button onClick={() => handleDeleteMenuItem(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {showUpdate && currentUpdateIndex !== null && (
        <div>
          <h3>Update Menu Item</h3>
          <label>Header Name:</label>
          <input
            type="text"
            value={menuItems[currentUpdateIndex].name}
            onChange={(e) => {
              const updatedItems = [...menuItems];
              updatedItems[currentUpdateIndex].name = e.target.value;
              setMenuItems(updatedItems);
            }}
          />
          <label>Route Path:</label>
          <input
            type="text"
            value={menuItems[currentUpdateIndex].route}
            onChange={(e) => {
              const updatedItems = [...menuItems];
              updatedItems[currentUpdateIndex].route = e.target.value;
              setMenuItems(updatedItems);
            }}
          />
          <button style={{ marginRight: '10px' }} onClick={() => handleUpdateMenuItem(currentUpdateIndex)}>Save</button>
          <button onClick={handleCancelUpdate}>Cancel</button>
        </div>
      )}
      <button onClick={() => setShowAddNew(true)}>Add New</button>

      {showAddNew && (
        <div>
          <h3>Add New Menu Item</h3>
          <label>Header Name:</label>
          <input
            type="text"
            value={newMenuItem.name}
            onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
            placeholder="Enter new header name"
          />
          <label>Route Path:</label>
          <input
            type="text"
            value={newMenuItem.route}
            onChange={(e) => setNewMenuItem({ ...newMenuItem, route: e.target.value })}
            placeholder="Enter new route path"
          />
          <button style={{ marginRight: '10px' }} onClick={handleAddMenuItem}>Save</button>
          <button onClick={handleCancelAddNew}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default HeaderManagement;
