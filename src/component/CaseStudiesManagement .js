import React, { useState } from 'react';

const CaseStudiesManagement = () => {
  const [caseStudies, setCaseStudies] = useState([
    { title: 'Case Study 1', description: 'Description for case study 1' },
    { title: 'Case Study 2', description: 'Description for case study 2' },
  ]);

  const [newCaseStudy, setNewCaseStudy] = useState({ title: '', description: '' });

  const handleCaseStudyChange = (index, field, value) => {
    const updatedCaseStudies = [...caseStudies];
    updatedCaseStudies[index] = { ...updatedCaseStudies[index], [field]: value };
    setCaseStudies(updatedCaseStudies);
  };

  const handleAddCaseStudy = () => {
    setCaseStudies([...caseStudies, { ...newCaseStudy }]);
    setNewCaseStudy({ title: '', description: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to the server
    console.log('Submitted Case Studies:', caseStudies);
    alert('Case Studies updated successfully!');
  };

  return (
    <div className="case-studies-management">
      <h2>Case Studies/Success Stories Management</h2>
      <form onSubmit={handleSubmit}>
        {caseStudies.map((caseStudy, index) => (
          <div key={index} className="form-group">
            <label>Case Study {index + 1} Title:</label>
            <input
              type="text"
              value={caseStudy.title}
              onChange={(e) => handleCaseStudyChange(index, 'title', e.target.value)}
              placeholder="Enter case study title"
            />
            <label>Description:</label>
            <textarea
              value={caseStudy.description}
              onChange={(e) => handleCaseStudyChange(index, 'description', e.target.value)}
              placeholder="Enter case study description"
            />
          </div>
        ))}
        <div className="form-group">
          <h3>Add New Case Study</h3>
          <label>Title:</label>
          <input
            type="text"
            value={newCaseStudy.title}
            onChange={(e) => setNewCaseStudy({ ...newCaseStudy, title: e.target.value })}
            placeholder="Enter new case study title"
          />
          <label>Description:</label>
          <textarea
            value={newCaseStudy.description}
            onChange={(e) => setNewCaseStudy({ ...newCaseStudy, description: e.target.value })}
            placeholder="Enter new case study description"
          />
          <button type="button" onClick={handleAddCaseStudy}>Add Case Study</button>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default CaseStudiesManagement;
