fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer API_KEY'
    },
    body: JSON.stringify({
        model: 'sonar-pro',
        messages: [
            {
                role: 'system',
                content: 'Be precise and concise.'
            },
            {
                role: 'user',
                content: 'How many stars are there in our galaxy?'
            }
        ]
    })
})
    .then(response => response.json())
    .then(body => console.log(JSON.stringify(body)))