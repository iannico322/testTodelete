import React, { useState } from 'react';

const ComputerVision = () => {
// State variables for the file, the result and the error
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Function to handle the file change event
  function handleFileChange(event) {
    // Get the file from the event target
    const file = event.target.files[0];
    // Set the file state
    setFile(file);
    // Reset the result and error state
    setResult(null);
    setError(null);
  }

  // Function to handle the upload button click event
  function handleUploadClick() {
    // Check if the file is an image
    if (file && file.type.startsWith('image/')) {
      // Create a FileReader object
      const reader = new FileReader();
      // Set the onload event handler for the reader
      reader.onload = function (event) {
        // Get the base64 data from the event
        const base64 = event.target.result;
        // Set the headers for the request
        const headers = {
          'Authorization': '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', // Replace with your secret key
          'Content-Type': 'application/json',
        };
        // Set the data for the request
        const data = {
          query: base64,
          response_type: 'image_classification',
        };
        // Make a POST request to the OpenAI API endpoint using fetch
        fetch('https://api.openai.com/v1/answers', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            // Handle the data
            console.log(data);
            // Set the result state
            setResult(data.answers[0]);
            // Reset the error state
            setError(null);
          })
          .catch((error) => {
            // Handle the error
            console.error(error);
            // Set the error state
            setError(error.message);
            // Reset the result state
            setResult(null);
          });
      };
      // Read the file as base64 data using the reader
      reader.readAsDataURL(file);
    } else {
      // Set an error message
      setError('Please select an image file');
      // Reset the result state
      setResult(null);
    }
  }

  return (
    <div className="image-uploader">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUploadClick}>Upload</button>
      <div className="result">
        {result && <p>The image is classified as {result}</p>}
        {error && <p>Something went wrong: {error}</p>}
      </div>
    </div>
  );
}


export default ComputerVision;
