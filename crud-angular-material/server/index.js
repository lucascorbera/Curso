const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();

// Libera CORS apenas para o Angular local
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

// Config Jira
const JIRA_URL = 'https://tecbantv.atlassian.net/rest/api/3/search/jql';
const JIRA_EMAIL = 'lucas.corbera@tbforte.com.br';

app.post('/jira/search', async (req, res) => {
    try {
        const response = await fetch(JIRA_URL, {
            method: 'POST',
            headers: {
                Authorization: `Basic ${Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString(
                    'base64'
                )}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error('Erro no proxy Jira:', err);
        res.status(500).json({ error: 'Erro ao consultar Jira' });
    }
});

app.listen(3000, () => console.log('✅ Proxy rodando em http://localhost:3000'));
