import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DataTable.css'; // Import the CSS file

const DataTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      const storedData = JSON.parse(localStorage.getItem('formData')) || [];
      setData(storedData);
    };

    // Fetch data when component mounts
    handleStorageChange();

    // Add an event listener for storage changes
    window.addEventListener('storage', handleStorageChange);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
    localStorage.setItem('formData', JSON.stringify(updatedData));
  };

  const handleEdit = (index) => {
    const itemToEdit = data[index];
    const updatedName = prompt('Enter new name:', itemToEdit.name);
    const updatedEmail = prompt('Enter new email:', itemToEdit.email);
    const updatedPhoneNumber = prompt('Enter new phone number:', itemToEdit.phoneNumber);

    if (updatedName && updatedEmail && updatedPhoneNumber) {
      const updatedData = data.map((item, i) =>
        i === index ? { ...item, name: updatedName, email: updatedEmail, phoneNumber: updatedPhoneNumber } : item
      );
      setData(updatedData);
      localStorage.setItem('formData', JSON.stringify(updatedData));
    } else {
      alert('All fields are required!');
    }
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleGoToProfiles = () => {
    navigate('/profiles');
  };

  return (
    <div className="data-table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phoneNumber}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(startIndex + index)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(startIndex + index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-controls">
        {currentPage > 1 && <button onClick={handlePreviousPage}>Previous</button>}
        {endIndex < data.length && <button onClick={handleNextPage}>Next</button>}
      </div>
      <button className="go-to-profiles-button" onClick={handleGoToProfiles}>Go to Profiles Page</button>
    </div>
  );
};

export default DataTable;
