const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const simplifyLaw = require('./simplifier');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/simplify', async (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ error: 'Question is required.' });
  }

  try {
    const simplified = await simplifyLaw(question);
    res.json({ answer: simplified });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error simplifying the legal text.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
