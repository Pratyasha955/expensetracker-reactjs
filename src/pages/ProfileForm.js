import React, { useState } from 'react';
import './ProfileForm.css';

const ProfileForm = () => {
  const [fullName, setFullName] = useState('');
  const [imageLink, setImageLink] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Submitted data:', { fullName, imageLink });
    // You can perform further actions like sending data to backend here
    // Reset form fields after submission
    setFullName('');
    setImageLink('');
  };

  return (
    <div className="profile-form-container"> 
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="fullName" className="form-label">Full Name:</label> 
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="form-input" 
            required
          />
        </div>
        <div className="form-group"> 
          <label htmlFor="imageLink" className="form-label">Image Link:</label> 
          <input
            type="url"
            id="imageLink"
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
            className="form-input" 
            required
          />
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default ProfileForm;
