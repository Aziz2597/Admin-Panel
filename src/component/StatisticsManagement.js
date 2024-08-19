import React, { useState } from 'react';

const StatisticsManagement = () => {
  const [statistics, setStatistics] = useState([
    { label: 'Users', value: '1000' },
    { label: 'Projects', value: '200' },
  ]);

  const [newStatistic, setNewStatistic] = useState({ label: '', value: '' });

  const handleStatisticChange = (index, field, value) => {
    const updatedStatistics = [...statistics];
    updatedStatistics[index] = { ...updatedStatistics[index], [field]: value };
    setStatistics(updatedStatistics);
  };

  const handleAddStatistic = () => {
    setStatistics([...statistics, { ...newStatistic }]);
    setNewStatistic({ label: '', value: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to the server
    console.log('Submitted Statistics:', statistics);
    alert('Statistics updated successfully!');
  };

  return (
    <div className="statistics-management">
      <h2>Statistics/Company Highlights Management</h2>
      <form onSubmit={handleSubmit}>
        {statistics.map((statistic, index) => (
          <div key={index} className="form-group">
            <label>Statistic {index + 1} Label:</label>
            <input
              type="text"
              value={statistic.label}
              onChange={(e) => handleStatisticChange(index, 'label', e.target.value)}
              placeholder="Enter statistic label"
            />
            <label>Value:</label>
            <input
              type="text"
              value={statistic.value}
              onChange={(e) => handleStatisticChange(index, 'value', e.target.value)}
              placeholder="Enter statistic value"
            />
          </div>
        ))}
        <div className="form-group">
          <h3>Add New Statistic</h3>
          <label>Label:</label>
          <input
            type="text"
            value={newStatistic.label}
            onChange={(e) => setNewStatistic({ ...newStatistic, label: e.target.value })}
            placeholder="Enter new statistic label"
          />
          <label>Value:</label>
          <input
            type="text"
            value={newStatistic.value}
            onChange={(e) => setNewStatistic({ ...newStatistic, value: e.target.value })}
            placeholder="Enter new statistic value"
          />
          <button type="button" onClick={handleAddStatistic}>Add Statistic</button>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default StatisticsManagement;
