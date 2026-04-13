export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { messages, projectContext } = req.body;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: 'Tu es un assistant expert en gestion de projets. Tu aides à structurer, mettre à jour et améliorer les projets. Contexte du projet : ' + projectContext,
      messages: messages
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}
