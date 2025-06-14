// client/src/components/IdeaForm.js
import React, { useState } from 'react';
import axios from 'axios';

const IdeaForm = ({ setResult }) => {
  const [topic, setTopic] = useState('');
  const [niche, setNiche] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/content/generate', { topic, niche });
      setResult(res.data.output);
    } catch (err) {
      setError('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 shadow rounded-lg space-y-4">
      <input
        type="text"
        placeholder="Enter a topic (e.g., Fitness for beginners)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full border px-4 py-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Enter niche (e.g., Fitness, Fashion)"
        value={niche}
        onChange={(e) => setNiche(e.target.value)}
        className="w-full border px-4 py-2 rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Idea'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default IdeaForm;
