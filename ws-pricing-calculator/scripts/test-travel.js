const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const DIST = path.join(__dirname, '..', 'dist');
const PORT = parseInt(process.env.TEST_PORT, 10) || 8080;

function serveDist() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let urlPath = req.url.split('?')[0];
      if (urlPath === '/' || urlPath === '') urlPath = '/index.html';
      const filePath = path.join(DIST, decodeURIComponent(urlPath));
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end('Not found');
          return;
        }
        const ext = path.extname(filePath).toLowerCase();
        const map = {
          '.html': 'text/html',
          '.js': 'application/javascript',
          '.css': 'text/css',
          '.json': 'application/json',
          '.png': 'image/png',
          '.svg': 'image/svg+xml',
          '.webmanifest': 'application/manifest+json'
        };
        res.writeHead(200, { 'Content-Type': map[ext] || 'application/octet-stream' });
        res.end(data);
      });
    }).listen(PORT, () => resolve(server));
  });
}

function parseMoney(str) {
  return parseFloat(String(str).replace(/[^0-9.-]+/g, '')) || 0;
}

(async () => {
  const server = await serveDist();
  console.log('Serving', DIST, 'on port', PORT);

  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.error('PAGE ERROR:', err.stack));

  const scenarios = [
    { plfs: 1, numberOfAirfare: 1, trips: 1, days: 1, additionalTrips: 0, avgNightsAdditional: 0 },
    { plfs: 2, numberOfAirfare: 1, trips: 1, days: 2, additionalTrips: 1, avgNightsAdditional: 1 },
    { plfs: 2, numberOfAirfare: 2, trips: 2, days: 3, additionalTrips: 2, avgNightsAdditional: 2 },
    { plfs: 1, numberOfAirfare: 2, trips: 1, days: 0, additionalTrips: 0, avgNightsAdditional: 0 },
    { plfs: 3, numberOfAirfare: 1, trips: 2, days: 1, additionalTrips: 1, avgNightsAdditional: 2 },
    { plfs: 0, numberOfAirfare: 1, trips: 1, days: 1, additionalTrips: 1, avgNightsAdditional: 1 },
    { plfs: 1, numberOfAirfare: 0, trips: 1, days: 1, additionalTrips: 1, avgNightsAdditional: 1 },
    { plfs: 2, numberOfAirfare: 2, trips: 3, days: 2, additionalTrips: 1, avgNightsAdditional: 3 }
  ];

  // Base known rates to keep tests deterministic
  const base = { airfarePerTrip: 500, perDiem: 100, lodging: 275, ground: 100 };

  let failures = 0;

  for (let i = 0; i < scenarios.length; i++) {
    const s = scenarios[i];
    await page.goto(`http://localhost:${PORT}`, { waitUntil: 'networkidle0' });

    // Populate inputs
    await page.evaluate((s, base) => {
      const set = (id, v) => { const el = document.getElementById(id); if (el) el.value = String(v); };
      set('travelAirfare', base.airfarePerTrip);
      set('travelPerDiem', base.perDiem);
      set('travelLodgingPerNight', base.lodging);
      set('travelGroundPerDay', base.ground);
      set('travelPLFs', s.plfs);
      set('numberOfAirfare', s.numberOfAirfare);
      set('travelTrips', s.trips);
      set('travelDays', s.days);
      set('numOfAdditionalTrips', s.additionalTrips);
      set('avgNumOfNightsPerAdditionalTrip', s.avgNightsAdditional);

      // Force any in-memory flags
      const evt = new Event('input', { bubbles: true });
      document.getElementById('travelAirfare').dispatchEvent(evt);
    }, s, base);

    // Debug: capture current DOM input values before clicking
    const domValues = await page.evaluate(() => {
      const ids = ['travelAirfare','travelPerDiem','travelLodgingPerNight','travelGroundPerDay','travelPLFs','numberOfAirfare','travelTrips','travelDays','numOfAdditionalTrips','avgNumOfNightsPerAdditionalTrip'];
      const out = {};
      ids.forEach(id => {
        const el = document.getElementById(id);
        out[id] = el ? el.value : null;
      });
      return out;
    });
    console.log(' DOM values:', domValues);

    // Click calculate (use DOM click to avoid overlay/clickable issues)
    await page.evaluate(() => document.getElementById('calculateTravelBtn').click());

    // Wait for dataset on button to be populated
    await page.waitForFunction(() => !!document.getElementById('calculateTravelBtn').dataset.airfare);

    const results = await page.evaluate(() => {
      const fmt = t => String(t).replace(/[^0-9.-]+/g, '');
      const calcBtn = document.getElementById('calculateTravelBtn');
      const totalText = document.getElementById('travelTotal')?.innerText || '';
      return {
        totalText,
        btnDataset: {
          airfare: calcBtn.dataset.airfare || '0',
          lodging: calcBtn.dataset.lodging || '0',
          transport: calcBtn.dataset.transport || '0',
          perdiem: calcBtn.dataset.perdiem || '0'
        }
      };
    });

    const airfareActual = parseFloat(results.btnDataset.airfare);
    const lodgingActual = parseFloat(results.btnDataset.lodging);
    const transportActual = parseFloat(results.btnDataset.transport);
    const perdiemActual = parseFloat(results.btnDataset.perdiem);

    // Compute expected according to the same logic in src/travel.js
    const plfs = s.plfs || 0;
    const trips = s.trips || 1;
    const days = s.days || 0;
    const additionalTrips = s.additionalTrips || 0;
    const avgNightsAdditional = s.avgNightsAdditional || 0;
    const numberOfAirfare = s.numberOfAirfare || 1;
    const perTrip = base.airfarePerTrip;
    const perDiem = base.perDiem;
    const lodging = base.lodging;
    const ground = base.ground;

    const airfareTotal = perTrip * numberOfAirfare * trips * plfs;
    const perDiemTotal = perDiem * (days + 1) * trips * plfs;
    const lodgingTotal = lodging * days * trips * plfs;
    const groundTotal = ground * days * trips * plfs;

    // Additional-trip airfare should NOT use the numberOfAirfare multiplier
    const addAirfareTotal = perTrip * additionalTrips * plfs;
    const addPerDiemTotal = perDiem * (avgNightsAdditional + 1) * additionalTrips * plfs;
    const addLodgingTotal = lodging * avgNightsAdditional * additionalTrips * plfs;
    const addGroundTotal = ground * avgNightsAdditional * additionalTrips * plfs;

    const totalAirfare = airfareTotal + addAirfareTotal;
    const totalPerDiem = perDiemTotal + addPerDiemTotal;
    const totalLodging = lodgingTotal + addLodgingTotal;
    const totalGround = groundTotal + addGroundTotal;

    const expected = {
      airfare: Number(totalAirfare.toFixed(2)),
      lodging: Number(totalLodging.toFixed(2)),
      transport: Number(totalGround.toFixed(2)),
      perdiem: Number(totalPerDiem.toFixed(2)),
      total: Number((totalAirfare + totalPerDiem + totalLodging + totalGround).toFixed(2))
    };

    const actualTotalText = results.totalText.replace(/[^0-9.-]+/g, '');
    const actualTotal = Number(parseFloat(actualTotalText || '0').toFixed(2));

    const approxEqual = (a, b) => Math.abs(a - b) < 0.01;

    const pass = approxEqual(airfareActual, expected.airfare) &&
                 approxEqual(lodgingActual, expected.lodging) &&
                 approxEqual(transportActual, expected.transport) &&
                 approxEqual(perdiemActual, expected.perdiem) &&
                 approxEqual(actualTotal, expected.total);

    console.log(`Scenario ${i + 1}:`, s);
    console.log(' Expected:', expected);
    console.log(' Actual:', { airfare: airfareActual, lodging: lodgingActual, transport: transportActual, perdiem: perdiemActual, total: actualTotal });
    console.log(' Result:', pass ? 'PASS' : 'FAIL', '\n');

    if (!pass) failures++;
  }

  await browser.close();
  server.close();

  if (failures > 0) {
    console.error(`Tests failed: ${failures} scenarios failing`);
    process.exit(2);
  }
  console.log('All scenarios passed');
  process.exit(0);
})();
