import React, { useState, useEffect } from 'react'
import ProductPage from './pages/ProductPage'

function App() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null);

  useEffect(() => {
    // check if backend is running
    const checkBackend = async() => {
        try {
            const response = await fetch('http://localhost:5000/api/health');
            if(!response.ok) throw new Error('Backend not available');
            setLoading(false);
        } catch (error) {
            setError('Backend server is not running. Please start the backend.');
            setLoading(false);
        }
    };
    checkBackend();
  },[]);

  if(loading){
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center max-w-md">
          <p className="text-red-600 mb-4">{error}</p>
          <p className="text-gray-600 mb-4">Make sure to:</p>
          <ol className="text-left text-gray-600 space-y-2 mb-4">
            <li>1. Set up PostgreSQL and create the database</li>
            <li>2. Configure DATABASE_URL in backend/.env</li>
            <li>3. Run: cd backend && npm run prisma:migrate</li>
            <li>4. Run: cd backend && npm run dev</li>
          </ol>
        </div>
      </div>
    );
  }

  return <ProductPage />;

}

export default App
