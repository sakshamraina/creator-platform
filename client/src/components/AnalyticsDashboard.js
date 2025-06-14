import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

const initialData = {
  followers: [1200, 1250, 1280, 1295, 1330, 1360, 1400],
  engagement: [
    { post: 1, likes: 320, comments: 25 },
    { post: 2, likes: 400, comments: 40 },
    { post: 3, likes: 290, comments: 10 },
    { post: 4, likes: 500, comments: 30 },
    { post: 5, likes: 600, comments: 70 },
  ],
  bestPostTime: "Wednesday 7 PM"
};

const AnalyticsDashboard = () => {
  const [data, setData] = useState(initialData);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
        setData(json);
      } catch {
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  const followerData = data.followers.map((value, i) => ({
    day: `Day ${i + 1}`,
    followers: value
  }));

  const engagementData = data.engagement.map(post => ({
    post: `Post ${post.post}`,
    engagement: post.likes + post.comments
  }));

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-8">
      <h2 className="text-2xl font-bold text-center">📊 Instagram Analytics</h2>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">📈 Follower Growth</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={followerData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="followers" stroke="#2563eb" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">💬 Engagement (Likes + Comments)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={engagementData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="post" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="engagement" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold">⏰ Best Time to Post</h3>
        <p className="text-xl">{data.bestPostTime}</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <label className="font-medium">📂 Upload new JSON file:</label>
        <input type="file" accept=".json" onChange={handleFileUpload} className="mt-2" />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
