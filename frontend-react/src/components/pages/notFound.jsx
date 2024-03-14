// NotFound.js or NotFound.jsx
import React from 'react';

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-2">404 Not Found</h1>
      <p className="text-lg">Sorry, the page you are looking for does not exist.</p>
      <a href="/" className="mt-4 text-blue-500 hover:underline">Go Home</a>
    </div>
  );
};

export default NotFound;
