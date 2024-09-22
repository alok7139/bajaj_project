import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState('');
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare the data array
    const dataArray = data.split(',').map(item => item.trim());

    // Convert the file to base64
    let file_b64 = '';
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        file_b64 = reader.result.split(',')[1]; // Remove "data:image/png;base64,"
        sendData(dataArray, file_b64);
      };
    } else {
      sendData(dataArray, file_b64);
    }
  };

  // Function to send data to the backend
  const sendData = async (dataArray, file_b64) => {
    try {
      const res = await axios.post('http://localhost:3000/bfhl', {
        data: dataArray,
        file_b64
      });
      setResponse(res.data);
    } catch (error) {
      console.error('Error making POST request:', error);
    }
  };

  // UI
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">BFHL POST Request</h1>
      <form className="bg-white p-6 shadow-md rounded-md w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Data (comma-separated):</label>
          <input
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder='e.g. M, 1, 334, 4, B, Z, a'
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">File (optional):</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Submit
        </button>
      </form>

      {response && (
        <div className="mt-8 p-4 bg-white shadow-md rounded-md w-full max-w-lg">
          <h2 className="text-xl font-bold mb-4">Response</h2>
          <pre className="bg-gray-100 p-4 rounded-md">{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
