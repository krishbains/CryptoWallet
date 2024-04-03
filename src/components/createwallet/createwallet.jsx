import React from 'react';
import { CSVDownload } from 'react-csv';
import "./create_wallet.css";

export default function CreateWallet() {
  const [data, setData] = React.useState(null); // State to hold CSV data

  const writeToCSV = (email, password) => {
    const newData = [[email, password]]; // Convert email and password to CSV format
    setData(newData); // Set data to trigger download
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Collect input values
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    // Call writeToCSV with email and password
    writeToCSV(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='main-container'>
        <div className='main-frame-background1'>
          <div className='main-frame'>
            <span className='login'>Login</span>
            <div className='password-input'>
              <input className='password-input-1' name="email" type="text" placeholder="Enter your email"/>
            </div>
            <div className='confirm-password-input'>
              <input className='confirm-password' name="password" type="text" placeholder="Enter your password"/>
            </div>
            <div className='continue-button'>
              <button className='continue'>Login</button>
            </div>
          </div>
        </div>
        {data && <CSVDownload data={data} filename="database.csv" />} {/* Render CSVDownload component */}
      </div>
    </form>
  );
}
