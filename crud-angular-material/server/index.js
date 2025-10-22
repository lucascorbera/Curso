const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

const JIRA_URL = 'https://tecbantv.atlassian.net/rest/api/3';
const JIRA_EMAIL = 'lucas.corbera@tbforte.com.br';
const JIRA_API_TOKEN = '';
// ✅ Proxy genérico usando query param "endpoint" ao invés de coringa
app.post('/jira', async (req, res) => {
    try {
        const endpoint = req.query.endpoint; // pega ?endpoint=search/jql
        if (!endpoint) {
            return res.status(400).json({ error: 'Endpoint do Jira não informado' });
        }

        const url = `${JIRA_URL}/${endpoint}`;
        const response = await fetch(url, {
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
