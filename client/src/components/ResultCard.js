// client/src/components/ResultCard.js
import React from 'react';

const ResultCard = ({ content }) => {
  const parseContent = () => {
    const lines = content.split('\n').filter(Boolean);
    const parsed = { hook: '', idea: '', caption: '', hashtags: [] };

    lines.forEach((line) => {
      if (line.toLowerCase().includes('hook')) parsed.hook = line;
      else if (line.toLowerCase().includes('idea')) parsed.idea = line;
      else if (line.toLowerCase().includes('caption')) parsed.caption = line;
      else if (line.includes('#')) parsed.hashtags.push(...line.split(' ').filter((tag) => tag.startsWith('#')));
    });

    return parsed;
  };

  const { hook, idea, caption, hashtags } = parseContent();

  return (
    <div className="max-w-xl mx-auto bg-white mt-6 p-6 shadow-md rounded-lg space-y-3">
      <h2 className="text-xl font-semibold">🧠 Generated Content Idea</h2>
      {hook && <p><strong>Hook:</strong> {hook}</p>}
      {idea && <p><strong>Idea:</strong> {idea}</p>}
      {caption && <p><strong>Caption:</strong> {caption}</p>}
      {hashtags.length > 0 && (
        <p><strong>Hashtags:</strong> {hashtags.map((tag, i) => (
          <span key={i} className="inline-block bg-gray-100 px-2 py-1 mx-1 rounded">{tag}</span>
        ))}</p>
      )}
    </div>
  );
};

export default ResultCard;
