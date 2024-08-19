import React, { useState } from 'react';

const KeyFeaturesManagement = () => {
  const [features, setFeatures] = useState(['Feature 1', 'Feature 2']);

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  return (
    <div>
      <h2>Key Features/Services Management</h2>
      <ul>
        {features.map((feature, index) => (
          <li key={index}>
            <input
              type="text"
              value={feature}
              onChange={(e) => handleFeatureChange(index, e.target.value)}
            />
          </li>
        ))}
      </ul>
      <button onClick={() => setFeatures([...features, 'New Feature'])}>Add Feature</button>
    </div>
  );
};

export default KeyFeaturesManagement;
