require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const IntuitOAuth = require('intuit-oauth');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI; // e.g. http://localhost:3000/callback
const COMPANY_ID = process.env.COMPANY_ID; // realmId (QuickBooks company id)
const ENV = (process.env.ENVIRONMENT || 'sandbox').toLowerCase(); // 'sandbox' or 'production'

if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI) {
    console.warn('Warning: CLIENT_ID, CLIENT_SECRET or REDIRECT_URI not set in environment. You must set these to use the app.');
}

const TOKEN_FILE = path.join(__dirname, 'tokens.json');

function getOauthClient(tokens) {
    const oauthClient = new IntuitOAuth({
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        environment: ENV === 'production' ? 'Production' : 'Sandbox',
        redirectUri: REDIRECT_URI
    });
    if (tokens) oauthClient.token = tokens;
    return oauthClient;
}

function saveTokens(tokens) {
    fs.writeFileSync(TOKEN_FILE, JSON.stringify(tokens, null, 2));
}
function loadTokens() {
    try {
        const raw = fs.readFileSync(TOKEN_FILE);
        return JSON.parse(raw);
    } catch (e) {
        return null;
    }
}

const AUTH_BASE = 'https://appcenter.intuit.com/connect/oauth2';
const TOKEN_URL = 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer';

function getApiBase() {
    if (ENV === 'production') return 'https://quickbooks.api.intuit.com';
    return 'https://sandbox-quickbooks.api.intuit.com';
}

function getAuthUrl(state) {
    const scope = encodeURIComponent('com.intuit.quickbooks.accounting');
    const url = `${AUTH_BASE}?client_id=${encodeURIComponent(CLIENT_ID)}&response_type=code&scope=${scope}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${encodeURIComponent(state)}`;
    return url;
}

app.get('/', (req, res) => {
    res.send(`
    <h3>QuickBooks proxy</h3>
    <p><a href="/auth">Connect to QuickBooks (OAuth)</a></p>
    <p>After authorizing, use <code>/reports/general-ledger</code> endpoint to fetch reports (requires COMPANY_ID or the company used in OAuth session).</p>
    `);
});

// Health/debug endpoint to verify public tunnels reach this machine
app.get('/__health', (req, res) => {
    res.json({ ok: true, time: new Date().toISOString(), headers: req.headers });
});

// Debug endpoint to confirm server loaded important env values (does NOT return secrets)
app.get('/whoami', (req, res) => {
    const hasClientId = !!CLIENT_ID;
    const clientIdSample = CLIENT_ID ? `${CLIENT_ID.slice(0,4)}...${CLIENT_ID.slice(-4)}` : null;
    res.json({
        clientIdSet: hasClientId,
        clientIdSample,
        redirectUri: REDIRECT_URI || null,
        environment: ENV || null
    });
});

app.get('/auth', (req, res) => {
    const state = crypto.randomBytes(16).toString('hex');
    const oauthClient = getOauthClient();
    // build authorize URL via SDK
    const authUri = oauthClient.authorizeUri({ scope: 'com.intuit.quickbooks.accounting', state });
    console.log('Redirecting user to Intuit authorize URL:', authUri);
    res.redirect(authUri);
});

// OAuth callback - exchange code for tokens
app.get('/callback', async (req, res) => {
    // Log incoming callback query to help debug redirect/authorization issues
    console.log('OAuth callback received:', req.query);
    const { code, state, realmId } = req.query;
    if (!code) {
        return res.status(400).send('Missing code in callback');
    }

    try {
        const oauthClient = getOauthClient();
        // Use SDK to exchange code for tokens
        const tokenResponse = await oauthClient.createToken(req.url);
        // oauthClient.token is now populated
        const tokens = oauthClient.token || {};
        tokens.realmId = realmId || COMPANY_ID || tokens.realmId;
        saveTokens(tokens);

        res.send(`<p>Connected. RealmId: ${tokens.realmId || 'unknown'}</p><p>Tokens saved to server. You can now call <code>/reports/general-ledger</code>.</p>`);
    } catch (err) {
        console.error('Callback error (SDK)', err);
        // If SDK returned a parsed error object, try to show the JSON
        const msg = err && err.message ? err.message : JSON.stringify(err);
        res.status(500).send('Callback error: ' + msg);
    }
});

async function refreshAccessToken(tokens) {
    if (!tokens || !tokens.refresh_token) throw new Error('No refresh token available');
    const oauthClient = getOauthClient(tokens);
    try {
        const refreshed = await oauthClient.refresh();
        const newTokens = oauthClient.token || refreshed;
        // preserve realmId if present
        if (tokens.realmId && !newTokens.realmId) newTokens.realmId = tokens.realmId;
        saveTokens(newTokens);
        return newTokens;
    } catch (err) {
        throw new Error('Refresh failed (SDK): ' + (err && err.message ? err.message : JSON.stringify(err)));
    }
}

async function getValidTokens() {
    let tokens = loadTokens();
    if (!tokens) throw new Error('Not authenticated: obtain tokens via /auth and /callback');

    // naive expiry handling: tokens.expires_in is seconds from issuance; tokens may not have issued_at timestamp
    // For demo: attempt a test call; if 401 then refresh.
    return tokens;
}

async function callQuickBooksReport(reportName, queryParams = {}) {
    let tokens = loadTokens();
    if (!tokens) throw new Error('Not authenticated - no tokens.json');

    const companyId = tokens.realmId || COMPANY_ID;
    if (!companyId) throw new Error('companyId (realmId) not available. Provide COMPANY_ID env or authorize an app');

    const apiBase = getApiBase();
    const url = new URL(`${apiBase}/v3/company/${companyId}/reports/${reportName}`);
    Object.entries(queryParams).forEach(([k,v]) => {
        if (v !== undefined && v !== null) url.searchParams.append(k, v);
    });

    async function doFetch(token) {
        const resp = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });
        return resp;
    }

    let resp = await doFetch(tokens.access_token);
    if (resp.status === 401) {
        // try refresh
        try {
            tokens = await refreshAccessToken(tokens);
        } catch (e) {
            throw new Error('Token refresh failed: ' + e.message);
        }
        resp = await doFetch(tokens.access_token);
    }

    if (!resp.ok) {
        const body = await resp.text();
        throw new Error(`QuickBooks API error ${resp.status}: ${body}`);
    }

    const json = await resp.json();
    return json;
}

// Proxy endpoint to fetch GeneralLedger similar to your Power BI Query
app.get('/reports/general-ledger', async (req, res) => {
    try {
        // Accept query params: start_date, end_date, account_type, columns, minorversion
        const allowed = ['start_date','end_date','account_type','columns','minorversion','accounting_method'];
        const params = {};
        allowed.forEach(k => { if (req.query[k]) params[k] = req.query[k]; });

        const data = await callQuickBooksReport('GeneralLedger', params);
        // Return raw report JSON; consumer can transform as needed
        res.json(data);
    } catch (err) {
        console.error('Report fetch failed', err);
        res.status(500).json({ error: err.message });
    }
});

app.get('/tokens', (req, res) => {
    const t = loadTokens();
    res.json(t || {});
});

app.listen(PORT, () => {
    console.log(`QBO proxy listening on http://localhost:${PORT}`);
    console.log('Visit /auth to connect a QuickBooks company (OAuth)');
});
