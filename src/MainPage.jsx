import React from 'react';
import Form from './components/Form';
import DataTable from './components/DataTable';
import './styles/MainPage.css'; 

const MainPage = () => {
  return (
    <div className="main-page-container">
      <h1>Data Entry Form</h1>
      <Form />
      <h2>Data Table</h2>
      <DataTable />
    </div>
  );
};

export default MainPage;
