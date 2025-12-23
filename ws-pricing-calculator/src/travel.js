import { el, formatCurrency } from './utils.js';
import { updateTotal } from './ui.js';

export let travelRates = [];
export let lodgingDefaults = {};
export let defaultPerDiem = 100;
export let defaultGround = 100;

export function parseMoney(str) {
    if (!str) return 0;
    return parseFloat(str.toString().replace(/[$,\s\"]/g, '')) || 0;
}

export async function loadTravelData() {
    try {
        const res = await fetch('Test - Interim Program Pricing to scale - Travel Pricing.csv');
        const text = await res.text();
        const lines = text.split(/\r?\n/).map(l => l.trim());

        // parse sections
        let section = '';
        for (let i = 0; i < lines.length; i++) {
            const parts = lines[i].split(',').map(p => p.replace(/^\"|\"$/g, '').trim());
            if (!lines[i]) continue;
            if (/^Airfare/i.test(parts[0])) { section = 'airfare'; continue; }
            if (/^Hotels & Lodging/i.test(lines[i])) { section = 'hotels'; continue; }
            if (/^Meals & Incidentals/i.test(lines[i])) { section = 'meals'; continue; }
            if (/^Transportation/i.test(lines[i])) { section = 'transport'; continue; }

            if (section === 'airfare') {
                // expect From,To,Amount (Roundtrip),Lodging Per Night
                if (parts[0] && parts[1] !== undefined && parts[2] !== undefined) {
                    const from = parts[0];
                    const to = parts[1];
                    const amount = parseMoney(parts[2]);
                    const lodging = parseMoney(parts[3]);
                    travelRates.push({ from, to, amount, lodging });
                }
            } else if (section === 'hotels') {
                // Location,,Amount per Night,
                // parts[0] is location, parts[2] amount
                const loc = parts[0];
                const amt = parseMoney(parts[2]);
                if (loc) lodgingDefaults[loc] = amt;
            } else if (section === 'meals') {
                // next non-empty line has per diem
                const val = parseMoney(parts[2] || parts[1] || parts[0]);
                if (val) defaultPerDiem = val;
            } else if (section === 'transport') {
                const val = parseMoney(parts[2] || parts[1] || parts[0]);
                if (val) defaultGround = val;
            }
        }

        populateTravelSelectors();
    } catch (err) {
        console.error('Failed to load travel CSV', err);
    }
}

export function populateTravelSelectors() {
    const fromSet = new Set();
    const toSet = new Set();
    travelRates.forEach(r => { if (r.from) fromSet.add(r.from); if (r.to) toSet.add(r.to); });

    const travelFrom = el('travelFrom');
    const travelTo = el('travelTo');
    if (travelFrom) travelFrom.innerHTML = '';
    if (travelTo) travelTo.innerHTML = '';

    Array.from(fromSet).forEach(f => {
        const o = document.createElement('option'); o.value = f; o.textContent = f; if (travelFrom) travelFrom.appendChild(o);
    });
    Array.from(toSet).forEach(t => {
        const o = document.createElement('option'); o.value = t; o.textContent = t; if (travelTo) travelTo.appendChild(o);
    });

    // set defaults
    if (travelFrom && travelFrom.options.length) travelFrom.selectedIndex = 0;
    if (travelTo && travelTo.options.length) travelTo.selectedIndex = 0;

    // Always re-attach event listeners after repopulating
    if (window.attachTravelDropdownListeners) window.attachTravelDropdownListeners();

    // default per diem and ground (guard elements)
    const travelPerDiemEl = el('travelPerDiem');
    const travelGroundEl = el('travelGroundPerDay');
    if (travelPerDiemEl) travelPerDiemEl.value = defaultPerDiem;
    if (travelGroundEl) travelGroundEl.value = defaultGround;

    // Call updateAirfarePreview and calculateTravel on init
    updateAirfarePreview();
    calculateTravel();
}

export function onTravelToChange() {
    const travelToEl = el('travelTo');
    const lodgingElem = el('lodgingRegion');
    if (!travelToEl) return; // nothing to do if selector missing
    const to = travelToEl.value;
    let lodgingRegion = 'all';
    if (lodgingElem) {
        if (lodgingElem.tagName === 'SELECT') lodgingRegion = lodgingElem.value;
        else if (lodgingElem.type === 'checkbox') lodgingRegion = lodgingElem.checked ? 'NYC/SF' : 'all';
    }
    // try to set lodging per night from direct match
    // common keys in lodgingDefaults: 'All regions ex. NYC/SFO', 'NYC/SF'
    let lodging = 0;
    // search travelRates for a matching to lodging
    const sample = travelRates.find(r => r.to === to && r.lodging);
    if (sample) lodging = sample.lodging;
    // fallback to defaults
    if (!lodging) {
        if (lodgingRegion === 'NYC/SF' && lodgingDefaults['NYC/SF']) {
            lodging = lodgingDefaults['NYC/SF'];
        } else if (lodgingDefaults['All regions ex. NYC/SFO']) {
            lodging = lodgingDefaults['All regions ex. NYC/SFO'];
        } else if (lodgingDefaults['NYC/SF']) {
            lodging = lodgingDefaults['NYC/SF'];
        } else lodging = 275;
    }
    const travelLodgingEl = el('travelLodgingPerNight');
    if (travelLodgingEl) travelLodgingEl.value = lodging;
    // also update airfare preview whenever travel destination changes
    updateAirfarePreview();
}

export function updateAirfarePreview() {
    const airfareInputEl = el('travelAirfare');
    const airfarePreviewEl = el('travelAirfarePerTrip');
    if (!airfarePreviewEl) return;
    
    // Use user-entered value if available, otherwise use CSV rate
    let perTrip = 0;
    if (airfareInputEl && airfareInputEl.value) {
        perTrip = parseFloat(airfareInputEl.value) || 0;
    } else {
        const travelFromEl = el('travelFrom');
        const travelToEl = el('travelTo');
        if (travelFromEl && travelToEl) {
            const from = travelFromEl.value;
            const to = travelToEl.value;
            const rate = travelRates.find(r => r.from === from && r.to === to);
            perTrip = rate ? rate.amount : 0;
            // Prefill the editable airfare input only if it's empty (preserve user edits)
            if (airfareInputEl && !airfareInputEl.value) {
                airfareInputEl.value = perTrip > 0 ? perTrip.toFixed(2) : '';
            }
        }
    }
    
    airfarePreviewEl.textContent = formatCurrency(perTrip);
}

export function calculateTravel() {
    const travelFromEl = el('travelFrom');
    const travelToEl = el('travelTo');
    const perDiemEl = el('travelPerDiem');
    const tripsEl = el('travelTrips');
    const daysEl = el('travelDays');
    const plfsEl = el('travelPLFs');
    const lodgingPerNightEl = el('travelLodgingPerNight');
    const groundPerDayEl = el('travelGroundPerDay');
    const carMilesEl = el('travelCarMiles');
    const carRateEl = el('travelCarRate');
    const carTotalEl = el('travelCarTotal');
    const airfareInputEl = el('travelAirfare');
    const numberOfAirfareEl = el('numberOfAirfare');
    const numAdditionalTripsEl = el('numOfAdditionalTrips');
    const avgAdditionalNightsEl = el('avgNumOfNightsPerAdditionalTrip');

    // If core inputs are missing, bail out safely
    if (!travelFromEl || !travelToEl) return;

    const from = travelFromEl.value;
    const to = travelToEl.value;
    const perDiem = parseFloat(perDiemEl?.value) || 0;
    const trips = parseInt(tripsEl?.value) || 1;
    const days = parseInt(daysEl?.value) || 0;
    const plfs = parseInt(plfsEl?.value) || 0;
    const lodgingPerNight = parseFloat(lodgingPerNightEl?.value) || 0;
    const groundPerDay = parseFloat(groundPerDayEl?.value) || 0;
    const carMiles = parseFloat(carMilesEl?.value) || 0;
    const carRate = parseFloat(carRateEl?.value) || 0.70;
    const numberOfAirfare = parseInt(numberOfAirfareEl?.value) || 0;
    // find airfare amount from CSV or use user-edited value
    const rate = travelRates.find(r => r.from === from && r.to === to);
    const csvAirfarePerTrip = rate ? rate.amount : 0;
    // Use editable airfare input if provided, otherwise use CSV rate
    const airfarePerTrip = airfareInputEl && airfareInputEl.value ? parseFloat(airfareInputEl.value) : csvAirfarePerTrip;

    // Airfare: if user enters number of flights, use that (per staff), else use trips * staff
    let airfareTotal = 0;
    if (numberOfAirfare > 0) {
        airfareTotal = numberOfAirfare * plfs * airfarePerTrip;
    } else {
        airfareTotal = trips * plfs * airfarePerTrip;
    }
    const perDiemTotal = perDiem * (days + 1) * trips * plfs; // Per diem is for nights + 1
    const lodgingTotal = lodgingPerNight * days * trips * plfs;
    const groundTotal = groundPerDay * days * trips * plfs;
    // Treat car mileage as trip-level (do not multiply by staff, allow carpooling)
    const carMileageTotal = carMiles * carRate * trips;

    // Additional trips calculations
    const numAdditionalTrips = parseInt(numAdditionalTripsEl?.value) || 0;
    const avgAdditionalNights = parseInt(avgAdditionalNightsEl?.value) || 0;

    // Per-additional-trip costs (per staff member)
    const perAddLodging = lodgingPerNight * avgAdditionalNights;
    const perAddGround = groundPerDay * avgAdditionalNights;
    const perAddPerDiem = perDiem * (avgAdditionalNights + 1); // same rule as main per-diem
    const perAddCarMileage = carMiles * carRate; // reuse per-trip mileage

    const lodgingAddTotal = perAddLodging * numAdditionalTrips * plfs;
    const transportAddTotal = perAddGround * numAdditionalTrips * plfs;
    const perdiemAddTotal = perAddPerDiem * numAdditionalTrips * plfs;
    // Additional trip mileage is treated as trip-level (not multiplied by staff)
    const carAddTotal = perAddCarMileage * numAdditionalTrips;

    const additionalTripsTotal = lodgingAddTotal + transportAddTotal + perdiemAddTotal + carAddTotal;

    const total = airfareTotal + perDiemTotal + lodgingTotal + groundTotal + carMileageTotal + additionalTripsTotal;

    // Update car mileage total field
    if (carTotalEl) carTotalEl.value = carMileageTotal.toFixed(2);

    const travelTotalEl = el('travelTotal');
    if (travelTotalEl) travelTotalEl.textContent = formatCurrency(total);

    // also show a preview of airfare/lodging/transport in small attributes
    const calcBtn = el('calculateTravelBtn');
    if (calcBtn) {
        calcBtn.dataset.airfare = airfareTotal.toFixed(2);
        calcBtn.dataset.lodging = (lodgingTotal + lodgingAddTotal).toFixed(2);
        calcBtn.dataset.transport = (groundTotal + transportAddTotal).toFixed(2);
        calcBtn.dataset.perdiem = (perDiemTotal + perdiemAddTotal).toFixed(2);
        calcBtn.dataset.carMileage = (carMileageTotal + carAddTotal).toFixed(2);
        calcBtn.dataset.flights = (numberOfAirfare > 0 ? numberOfAirfare * plfs : trips * plfs).toFixed(2);
        calcBtn.dataset.additionalTrips = additionalTripsTotal.toFixed(2);
    }
    // update airfare per-trip preview
    const airfarePreviewEl = el('travelAirfarePerTrip');
    if (airfarePreviewEl) airfarePreviewEl.textContent = formatCurrency(airfarePerTrip);
}

export function applyTravelToSummary(appliedTravel) {
    // Read calculated totals from the Calculate button dataset and store them
    // in the appliedTravel object. Then update the visible summary lines and
    // recalc totals.
    console.log('applyTravelToSummary called with appliedTravel:', appliedTravel);
    const calcBtn = el('calculateTravelBtn');
    const airfareTotal = parseFloat(calcBtn?.dataset.airfare) || 0;
    const lodgingTotal = parseFloat(calcBtn?.dataset.lodging) || 0;
    const transportTotal = parseFloat(calcBtn?.dataset.transport) || 0;
    const perDiemTotal = parseFloat(calcBtn?.dataset.perdiem) || 0;
    const carMileageTotal = parseFloat(calcBtn?.dataset.carMileage) || 0;

    appliedTravel.airfare = airfareTotal;
    appliedTravel.lodging = lodgingTotal;
    appliedTravel.transport = transportTotal;
    appliedTravel.meals = perDiemTotal;
    appliedTravel.carMileage = carMileageTotal;

    // Update summary display spans (they will be used by updateTotal too)
    const airfareSummaryEl = el('airfareSummary');
    const hotelSummaryEl = el('hotelSummary');
    const transportSummaryEl = el('transportSummary');
    const mealsSummaryEl = el('mealsSummary');
    const carMileageSummaryEl = el('carMileageSummary');
    const travelSummaryEl = el('travelSummary');
    if (airfareSummaryEl) airfareSummaryEl.textContent = formatCurrency(airfareTotal);
    if (hotelSummaryEl) hotelSummaryEl.textContent = formatCurrency(lodgingTotal);
    if (transportSummaryEl) transportSummaryEl.textContent = formatCurrency(transportTotal);
    if (mealsSummaryEl) mealsSummaryEl.textContent = formatCurrency(perDiemTotal);
    if (carMileageSummaryEl) carMileageSummaryEl.textContent = formatCurrency(carMileageTotal);
    if (travelSummaryEl) travelSummaryEl.textContent = formatCurrency(airfareTotal + lodgingTotal + transportTotal + perDiemTotal + carMileageTotal);

    updateTotal();
}
