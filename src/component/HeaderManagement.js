import React, { useState } from 'react';

const HeaderManagement = () => {
  const [menuItems, setMenuItems] = useState(['Home', 'About', 'Services', 'Contact']);

  const handleMenuChange = (index, value) => {
    const newMenuItems = [...menuItems];
    newMenuItems[index] = value;
    setMenuItems(newMenuItems);
  };

  return (
    <div>
      <h2>Header Management</h2>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <input
              type="text"
              value={item}
              onChange={(e) => handleMenuChange(index, e.target.value)}
            />
          </li>
        ))}
      </ul>
      <button onClick={() => setMenuItems([...menuItems, 'New Item'])}>Add Menu Item</button>
      <button type="submit">Save Changes</button>
    </div> 
  );
};

export default HeaderManagement;
