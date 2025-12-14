import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

const indexHtml = fs.readFileSync(path.resolve('./index.html'), 'utf-8');
const dom = new JSDOM(indexHtml, { runScripts: 'dangerously', resources: 'usable' });
const { window } = dom;
global.window = window;
global.document = window.document;

(async function run() {
    // import the modules
    const travel = await import('../src/travel.js');
    const ui = await import('../src/ui.js');

    // create required DOM elements
    const calcBtn = document.getElementById('calculateTravelBtn');
    if (!calcBtn) {
        console.error('calculateTravelBtn not found');
        process.exit(2);
    }

    // set inputs
    document.getElementById('travelTrips').value = '1';
    document.getElementById('travelPLFs').value = '1';

    // Prefill editable airfare and car fields
    const airfareInput = document.getElementById('travelAirfare');
    const carMiles = document.getElementById('travelCarMiles');
    const carRate = document.getElementById('travelCarRate');
    airfareInput.value = '200';
    carMiles.value = '10';
    carRate.value = '0.65';

    // Run calculate
    travel.calculateTravel();

    const expectedCarTotal = 10 * 0.65 * 1 * 1; // miles * rate * trips * plfs
    const datasetCar = parseFloat(calcBtn.dataset.carMileage || '0');

    if (Math.abs(datasetCar - expectedCarTotal) > 0.0001) {
        console.error('Car total mismatch', datasetCar, expectedCarTotal);
        process.exit(3);
    } else {
        console.log('Car total computed OK', datasetCar);
    }

    // Apply to summary
    travel.applyTravelToSummary(ui.appliedTravel);
    if ((ui.appliedTravel.carMileage || 0) !== datasetCar) {
        console.error('appliedTravel.carMileage mismatch', ui.appliedTravel.carMileage, datasetCar);
        process.exit(4);
    }
    const carSummary = document.getElementById('carMileageSummary');
    if (!carSummary) {
        console.error('carMileageSummary element missing');
        process.exit(5);
    }
    if (carSummary.textContent.trim() === '$0.00') {
        console.error('carMileageSummary not updated');
        process.exit(6);
    }

    console.log('Apply to summary OK; carSummary:', carSummary.textContent.trim());
    process.exit(0);
})();
