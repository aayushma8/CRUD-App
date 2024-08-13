import React, { useState, useEffect } from 'react';
import '../styles/Profiles.css'; // Import the CSS file

const Profiles = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('formData')) || [];
    setData(storedData);
  }, []);

  return (
    <div className="profiles-container">
      <h1>Profiles</h1>
      <table className="profiles-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Date of Birth</th>
            <th>City</th>
            <th>District</th>
            <th>Province</th>
            <th>Country</th>
            <th>Profile Picture</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.dob}</td>
              <td>{item.address.city}</td>
              <td>{item.address.district}</td>
              <td>{item.address.province}</td>
              <td>{item.address.country}</td>
              <td>
                {item.profilePicture && (
                  <img
                    src={URL.createObjectURL(item.profilePicture)}
                    alt="Profile"
                    className="profile-picture"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Profiles;
