import React, { useState } from 'react';

export const CustomizeOrganization = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    organizationName: '',
    position: '',
    industry: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <div className="customize-container">
      <div className="customize-content">
        <img className="customize-logo" alt="Talenxify logo" src="/talenxify-logo-1.png" />
            
        <p className="page-indicator">1 / 2</p>
            
        <h1 className="customize-title">Customize your Organization</h1>
        <p className="customize-subtitle">
          Tell us about your organization.
        </p>

        <form className="customize-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Organization Name</label>
            <input
              type="text"
              name="organizationName"
              className="form-input"
              placeholder="Link to your linkedin profile"
              value={formData.organizationName}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Position In Organization</label>
            <input
              type="text"
              name="position"
              className="form-input"
              placeholder="Enter your position in Organization"
              value={formData.position}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Industry</label>
            <select
              name="industry"
              className="form-select"
              value={formData.industry}
              onChange={handleInputChange}
            >
              <option value="">Select industry</option>
              <option value="technology">Technology</option>
              <option value="healthcare">Healthcare</option>
              <option value="finance">Finance</option>
              <option value="education">Education</option>
              <option value="retail">Retail</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="create-account-btn"
            onClick={(e) => {
              e.preventDefault();
              console.log('Button clicked, navigating to upload');
              if (onNavigate) {
                onNavigate();
              }
            }}
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};