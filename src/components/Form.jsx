import React, { useState, useEffect } from 'react';
import { getCountries } from '../services/countryService';
import { useNavigate } from 'react-router-dom';
import '../styles/Form.css';

const Form = () => {
  const initialFormData = {
    name: '',
    email: '',
    phoneNumber: '',
    dob: '',
    address: {
      city: '',
      district: '',
      province: '',
      country: 'Nepal',
    },
    profilePicture: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      const countriesList = await getCountries();
      setCountries(countriesList);
    };
    fetchCountries();
  }, []);

  const validateForm = () => {
    const { name, email, phoneNumber, profilePicture } = formData;

    if (!name || !email || !phoneNumber) {
      alert('Name, Email, and Phone Number are required.');
      return false;
    }

    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert('Phone Number should only contain numbers.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Invalid email format.');
      return false;
    }

    if (profilePicture && profilePicture.type !== 'image/png') {
      alert('Only PNG images are allowed.');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const existingData = JSON.parse(localStorage.getItem('formData')) || [];
        existingData.push(formData);
        localStorage.setItem('formData', JSON.stringify(existingData));
        alert('Form submitted successfully!');
        setFormData(initialFormData); // Clear form fields
      } catch (error) {
        alert('Submission failed. Could not save data to local storage.');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (name === 'city' || name === 'district' || name === 'province' || name === 'country') {
        return {
          ...prev,
          address: {
            ...prev.address,
            [name]: value,
          },
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      profilePicture: file,
    }));
  };

  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Phone Number:
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </label>
        <label>
          Date of Birth:
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
        </label>
        <label>
          City:
          <input type="text" name="city" value={formData.address.city} onChange={handleChange} />
        </label>
        <label>
          District:
          <input type="text" name="district" value={formData.address.district} onChange={handleChange} />
        </label>
        <label>
          Province:
          <select name="province" value={formData.address.province} onChange={handleChange}>
            <option value="">Select Province</option>
            <option value="Province 1">Province 1</option>
            <option value="Province 2">Province 2</option>
            <option value="Province 3">Province 3</option>
            <option value="Province 4">Province 4</option>
            <option value="Province 5">Province 5</option>
            <option value="Province 6">Province 6</option>
            <option value="Province 7">Province 7</option>
          </select>
        </label>
        <label>
          Country:
          <select name="country" value={formData.address.country} onChange={handleChange}>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </label>
        <label>
          Profile Picture:
          <input type="file" accept="image/png" onChange={handleFileChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
