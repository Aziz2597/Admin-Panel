import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactInfoManagement = () => {
  const [contactInfo, setContactInfo] = useState({
    phone: [],
    email: [],
    address: [],
  });
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [newDetail, setNewDetail] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5001/api/contact-info')
      .then(response => {
        setContactInfo(response.data);
      })
      .catch(error => {
        console.error('Error fetching contact info:', error);
      });
  }, []);

  const handleAddNewClick = () => {
    setIsAdding(true);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsAdding(false);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setNewDetail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedOption || !newDetail) {
      alert('Please fill in all fields');
      return;
    }

    if (isEditing) {
      axios.put('http://localhost:5001/api/contact-info', { type: selectedOption, index: editIndex, newDetail })
        .then(response => {
          setContactInfo(response.data);
          resetForm();
          alert('Contact detail updated successfully!');
        })
        .catch(error => {
          console.error('Error updating contact detail:', error);
          alert('Error updating contact detail');
        });

    } else {
      axios.post('http://localhost:5001/api/contact-info', { type: selectedOption, detail: newDetail })
        .then(response => {
          setContactInfo(response.data);
          resetForm();
          alert('Contact detail added successfully!');
        })
        .catch(error => {
          console.error('Error adding contact detail:', error);
          alert('Error adding contact detail');
        });
    }
  };


  const handleEdit = (option, index) => {
    setIsEditing(true);
    setSelectedOption(option);
    setNewDetail(contactInfo[option][index]);
    setEditIndex(index);
  };

  const handleDelete = (option, index) => {
    axios.delete('http://localhost:5001/api/contact-info', { data: { type: option, index } })
      .then(response => {
        setContactInfo(response.data);
        alert('Contact detail deleted successfully!');
      })
      .catch(error => {
        console.error('Error deleting contact detail:', error);
      });

  };

  const handleCancel = () => {
    resetForm();
  };

  const resetForm = () => {
    setIsAdding(false);
    setIsEditing(false);
    setSelectedOption(null);
    setNewDetail('');
    setEditIndex(null);
  };

  return (
    <div className="contact-info-management">
      <h2 style={{borderBottom: '2px solid #ccc'}}>Contact Information Management</h2>

      {['phone', 'email', 'address'].map((option) => (
        contactInfo[option].length > 0 && (
          <div key={option}>
            <h3 style={{marginBottom: '-12px'}}>Added {option.charAt(0).toUpperCase() + option.slice(1)}s:</h3>
            <ul style={{ paddingLeft: '0', marginLeft: '20px' , marginBottom: '0px'} }>
              {contactInfo[option].map((detail, index) => (
                <li
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    position: 'relative',
                    paddingLeft: '30px', 
                    marginBottom: '0px'
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: '10px',
                      fontSize: '20px',
                      color: '#000'
                    }}
                  >
                    •
                  </span>
                  <div style={{ flex: 1 }}>
                    {detail}
                  </div>
                  <div>
                    <button
                      style={{ marginRight: '10px' }}
                      onClick={() => handleEdit(option, index)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(option, index)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>

          </div>


        )
      ))}

      {!isAdding && !selectedOption && (
        <button onClick={handleAddNewClick}>Add New Contact Detail</button>
      )}

      {isAdding && (
        <div className="popup">
          <h3>Select the type of contact detail:</h3>
          <button style={{ marginRight: '10px' }} onClick={() => handleOptionClick('phone')}>Phone Number</button>
          <button style={{ marginRight: '10px' }} onClick={() => handleOptionClick('email')}>Email</button>
          <button style={{ marginRight: '10px' }} onClick={() => handleOptionClick('address')}>Address</button>
        </div>
      )}


      {selectedOption && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="detail">
              {selectedOption === 'phone' && 'Phone Number:'}
              {selectedOption === 'email' && 'Email Address:'}
              {selectedOption === 'address' && 'Physical Address:'}
            </label>
            {selectedOption === 'address' ? (
              <textarea
                id="detail"
                value={newDetail}
                onChange={handleChange}
                placeholder={`Enter ${selectedOption}`}
              />
            ) : (
              <input
                type={selectedOption === 'email' ? 'email' : 'text'}
                id="detail"
                value={newDetail}
                onChange={handleChange}
                placeholder={`Enter ${selectedOption}`}
              />
            )}
          </div>
          <button style={{ marginRight: '10px' }} type="submit">{isEditing ? 'Update' : 'Save'} Changes</button>
          <button style={{ marginRight: '10px' }} type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactInfoManagement;
