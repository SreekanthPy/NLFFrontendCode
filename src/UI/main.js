import React, { useState } from 'react';
import { GoogleSpreadsheet } from 'google-spreadsheet';

const SHEET_ID = 'your_sheet_id'; // Replace with your Google Sheet ID

const YourComponent = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const doc = new GoogleSpreadsheet(SHEET_ID);
    await doc.useServiceAccountAuth({
      client_email: 'YOUR_CLIENT_EMAIL',
      private_key: 'YOUR_PRIVATE_KEY',
    });

    await doc.loadInfo(); // Loads document properties and worksheets
    const sheet = doc.sheetsByIndex[0]; // Use the first sheet or specify the index

    await sheet.addRow(data); // Add a new row with the collected data

    // Clear the form fields after submitting
    setData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={data.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={data.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <textarea
        name="message"
        value={data.message}
        onChange={handleChange}
        placeholder="Message"
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default YourComponent;
