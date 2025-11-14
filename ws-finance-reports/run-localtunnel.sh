#!/usr/bin/env bash
# Optional helper: start localtunnel for port 3000 and print the public URL.
# Usage: make sure your server is running (npm start), then run this script.

PORT=${1:-3000}
SUBDOMAIN=${2:-"ws-finance-reports-$(date +%s | tail -c 4)"}

echo "Starting localtunnel on port $PORT with subdomain $SUBDOMAIN"

echo "Run your server first (npm start). Then in another terminal run this script to get a public URL."

echo "Command: npx localtunnel --port $PORT --subdomain $SUBDOMAIN"

# Run the command (uncomment the next line to auto-run it instead of printing)
# npx localtunnel --port $PORT --subdomain $SUBDOMAIN

exit 0
