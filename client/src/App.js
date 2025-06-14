// client/src/App.js
import React, { useState } from 'react';
import IdeaForm from './components/IdeaForm';
import ResultCard from './components/ResultCard';
import AnalyticsDashboard from './components/AnalyticsDashboard';


function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">📸 Content Idea Generator</h1>
      <IdeaForm setResult={setResult} />
      {result && <ResultCard content={result} />}
      <AnalyticsDashboard />
      
    </div>
  );
}

export default App;
