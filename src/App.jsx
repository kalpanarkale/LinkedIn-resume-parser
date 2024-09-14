import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [htmlResume, setHtmlResume] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('pdf', pdfFile);
    formData.append('apiKey', apiKey);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setHtmlResume(response.data.html);
    } catch (error) {
      console.error('Error uploading the file', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4 m-1.5">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full m-1.5">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6 m-1.5">LinkedIn PDF to HTML Resume</h1>
        <form onSubmit={handleSubmit} className="space-y-6 m-1.5">
          <div className="m-1.5">
            <label className="block text-sm font-medium text-gray-700 m-1.5">OpenAI API Key:</label>
            <input
              type="text"
              value={apiKey}
              onChange={handleApiKeyChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm m-1.5"
              placeholder="Enter your OpenAI API Key"
            />
          </div>
          <div className="m-1.5">
            <label className="block text-sm font-medium text-gray-700 m-1.5">Upload PDF:</label>
            <input
              type="file"
              onChange={handleFileChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm m-1.5"
            />
          </div>
          <div className="m-1.5">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 m-1.5"
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate HTML Resume'}
            </button>
          </div>
        </form>
      </div>

      {htmlResume && (
        <div className="mt-8 w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg m-1.5">
          <h2 className="text-2xl font-semibold mb-4 m-1.5">Generated HTML Resume</h2>
          <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded-lg m-1.5">{htmlResume}</pre>
        </div>
      )}
    </div>
  );
}

export default App;