const openai = require('../config/openai');
const Content = require('../models/Content');

const generateContent = async (req, res, next) => {
  const { topic, niche } = req.body;

  if (!topic || !niche) {
    return res.status(400).json({ message: 'Topic and niche are required' });
  }

  try {
    const prompt = `
You are a content strategist. Suggest one trending Instagram reel idea for a creator in the "${niche}" niche, focused on the topic "${topic}".
Include:
- Reel idea
- A strong opening hook
- Caption
- 5 relevant hashtags`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
    });

    const result = completion.choices[0].message.content;

    // Save to MongoDB
    const saved = await Content.create({ topic, niche, result });

    res.status(200).json({ output: result, saved });
  } catch (error) {
  console.error("OpenAI Error:", error); // optional
  next(error); // Pass error to middleware
}

};

module.exports = { generateContent };
