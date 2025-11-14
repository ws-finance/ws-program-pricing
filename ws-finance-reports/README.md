# ws-finance-reports

QuickBooks Online Reports proxy for ws-finance

This Node.js app provides a small backend to authenticate with QuickBooks Online (OAuth2), persist tokens, refresh them, and fetch the Reports API (GeneralLedger). It's intended to act as a backend data source for Power BI or other ETL.

Prerequisites
- Node.js 16+ installed
- An Intuit Developer app created (https://developer.intuit.com). Set the OAuth redirect URI to `http://localhost:3000/callback` (or whatever REDIRECT_URI you will use).
- If you plan to use the production QBO API, set ENVIRONMENT=production. For sandbox testing, use sandbox.

Setup
1. Copy `.env.example` to `.env` and set your CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, and optionally COMPANY_ID (realmId)

2. Install dependencies:

```bash
cd ws-finance-reports
npm install
```

3. Run the server:

```bash
npm start
```

4. Open `http://localhost:3000` and click "Connect to QuickBooks (OAuth)". After authorizing, the app will save tokens to `tokens.json`.

Fetching the General Ledger (report)

Endpoint:

GET /reports/general-ledger

Query parameters supported (examples):
- start_date=2021-07-01
- end_date=2025-06-30
- account_type=Expense,Income,OtherIncome,OtherExpense
- columns=tx_date,debt_amt,credit_amt,klass_name,account_name,account_num,name,memo
- minorversion=69

Example:

http://localhost:3000/reports/general-ledger?start_date=2021-07-01&end_date=2025-06-30&account_type=Expense,Income&columns=tx_date,debt_amt,credit_amt&minorversion=69

This will proxy your request to the QuickBooks Reports/GeneralLedger endpoint and return the JSON response.

Notes & next steps
- For production use, store tokens securely (database, vault) and harden error handling.
- Add retry/backoff for network calls and logging.
- If you want CSV-like output compatible with Power BI, you can transform the report JSON into a flat table in this app before returning.
- Power BI can also call this endpoint directly (using web connector) assuming your server is accessible to Power BI and tokens are handled server-side.

Security
- Do not commit your `.env` (contains secrets). Use proper secrets management for production.

If you'd like, I can:
- Add a simple transformation that mirrors your Power BI M-query logic so the endpoint returns a flat table (CSV/JSON) ready for Power BI.
- Add a small UI to pick date range and report options.
- Implement secure token storage (e.g., SQLite) and an admin endpoint to inspect/clear tokens.
