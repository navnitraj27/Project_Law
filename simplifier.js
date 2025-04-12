const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Keywords that usually appear in legal questions
const legalKeywords = [
  'contract', 'negligence', 'tort', 'liability', 'statute',
  'law', 'legal', 'rights', 'obligations', 'court', 'plaintiff',
  'defendant', 'appeal', 'jurisdiction', 'evidence', 'property',
  'habeas corpus', 'constitution', 'act', 'section', 'penalty',
  'litigation', 'breach', 'agreement', 'criminal', 'civil'
];

function isLegalRelated(text) {
  const lower = text.toLowerCase();
  return legalKeywords.some(keyword => lower.includes(keyword));
}

async function simplifyLaw(text) {
  if (!isLegalRelated(text)) {
    return 'Please ask a question related to law or legal terms.';
  }

  const prompt = `Simplify this legal language for a normal person:\n"${text}"\n\nSimplified Explanation:`;

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 150,
  });

  const reply = response.choices[0].message.content.trim();
  return reply;
}

module.exports = simplifyLaw;
