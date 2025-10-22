import { useState, useEffect } from 'react';

const TestPage = () => {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    setMessage('Test page is working!');
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Prompt Test Page</h1>
        <p className="text-xl text-muted-foreground">{message}</p>
      </div>
    </div>
  );
};

export default TestPage;