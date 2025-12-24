import { el, formatCurrency } from './utils.js';
import { updateTotal } from './ui.js';

/* =========================
   State
========================= */

export let travelRates = [];
export let lodgingDefaults = {};
export let defaultPerDiem = 100;
export let defaultGround = 100;

let airfareUserEdited = false;

/* =========================
   Utilities
========================= */

export function parseMoney(str) {
    if (!str) return 0;
    return parseFloat(str.toString().replace(/[$,\s"]/g, '')) || 0;
}

function getSelectedRoute() {
    const from = el('travelFrom')?.value;
    const to = el('travelTo')?.value;
    return { from, to };
}

function getCsvAirfare(from, to) {
    if (!from || !to) return 0;

    // Helper to normalize strings for tolerant matching
    const normalize = s => (s || '').toString().trim().toLowerCase();

    // 1) Try exact match first (preserve existing behavior)
    let rate = travelRates.find(r => r.from === from && r.to === to);
    if (rate) return rate.amount || 0;

    // 2) Try normalized (case/whitespace-insensitive) match
    const nFrom = normalize(from);
    const nTo = normalize(to);
    rate = travelRates.find(r => normalize(r.from) === nFrom && normalize(r.to) === nTo);
    if (rate) return rate.amount || 0;

    // 3) Try reverse direction (A->B not present but B->A exists) — assume symmetric if present
    rate = travelRates.find(r => normalize(r.from) === nTo && normalize(r.to) === nFrom);
    if (rate) return rate.amount || 0;

    return 0;
}

/* =========================
   CSV Loading
========================= */

export async function loadTravelData() {
    try {
        const res = await fetch('Test - Interim Program Pricing to scale - Travel Pricing.csv');
        const text = await res.text();
        parseTravelCsv(text);
        populateTravelSelectors();
    } catch (err) {
        console.error('Failed to load travel CSV', err);
    }
}

function parseTravelCsv(text) {
    const lines = text.split(/\r?\n/).map(l => l.trim());
    let section = '';

    for (const line of lines) {
        if (!line) continue;

        const parts = line.split(',').map(p => p.replace(/^"|"$/g, '').trim());

        if (/^Airfare/i.test(parts[0])) { section = 'airfare'; continue; }
        if (/^Hotels & Lodging/i.test(line)) { section = 'hotels'; continue; }
        if (/^Meals & Incidentals/i.test(line)) { section = 'meals'; continue; }
        if (/^Transportation/i.test(line)) { section = 'transport'; continue; }

        switch (section) {
            case 'airfare': {
                const [from, to, amt, lodging] = parts;
                if (from && to && amt !== undefined) {
                    travelRates.push({
                        from,
                        to,
                        amount: parseMoney(amt),
                        lodging: parseMoney(lodging)
                    });
                }
                break;
            }
            case 'hotels': {
                const loc = parts[0];
                const amt = parseMoney(parts[2]);
                if (loc) lodgingDefaults[loc] = amt;
                break;
            }
            case 'meals': {
                const val = parseMoney(parts[2] || parts[1] || parts[0]);
                if (val) defaultPerDiem = val;
                break;
            }
            case 'transport': {
                const val = parseMoney(parts[2] || parts[1] || parts[0]);
                if (val) defaultGround = val;
                break;
            }
        }
    }
}

/* =========================
   UI Population
========================= */

export function populateTravelSelectors() {
    const fromSet = new Set();
    const toSet = new Set();

    travelRates.forEach(r => {
        if (r.from) fromSet.add(r.from);
        if (r.to) toSet.add(r.to);
    });

    const travelFrom = el('travelFrom');
    const travelTo = el('travelTo');

    if (travelFrom) travelFrom.innerHTML = '';
    if (travelTo) travelTo.innerHTML = '';

    [...fromSet].forEach(f => {
        const o = document.createElement('option');
        o.value = f;
        o.textContent = f;
        travelFrom?.appendChild(o);
    });

    [...toSet].forEach(t => {
        const o = document.createElement('option');
        o.value = t;
        o.textContent = t;
        travelTo?.appendChild(o);
    });

    if (travelFrom?.options.length) travelFrom.selectedIndex = 0;
    if (travelTo?.options.length) travelTo.selectedIndex = 0;

    if (window.attachTravelDropdownListeners) {
        window.attachTravelDropdownListeners();
    }

    el('travelPerDiem') && (el('travelPerDiem').value = defaultPerDiem);
    el('travelGroundPerDay') && (el('travelGroundPerDay').value = defaultGround);

    setAirfareFromCsv();
    attachAirfareInputListeners();
    updateAirfarePreview();
    calculateTravel();
}

/* =========================
   Airfare Handling
========================= */

function setAirfareFromCsv() {
    const airfareInput = el('travelAirfare');
    if (!airfareInput) return;

    const { from, to } = getSelectedRoute();
    const csvValue = getCsvAirfare(from, to);

    airfareInput.value = csvValue ? csvValue.toFixed(2) : '';
    airfareUserEdited = false;
}

export function updateAirfarePreview() {
    const airfareInput = el('travelAirfare');
    const preview = el('travelAirfarePerTrip');
    if (!preview) return;

    const val = parseFloat(airfareInput?.value) || 0;
    preview.textContent = formatCurrency(val);
}

/* =========================
   Destination Change
========================= */

export function onTravelToChange() {
    const to = el('travelTo')?.value;
    if (!to) return;

    let lodging = 0;
    const sample = travelRates.find(r => r.to === to && r.lodging);

    if (sample) {
        lodging = sample.lodging;
    } else {
        lodging =
            lodgingDefaults['NYC/SF'] ||
            lodgingDefaults['All regions ex. NYC/SFO'] ||
            275;
    }

    el('travelLodgingPerNight') && (el('travelLodgingPerNight').value = lodging);

    airfareUserEdited = false;
    setAirfareFromCsv();
    updateAirfarePreview();
    calculateTravel();
}

/* =========================
   User Input Tracking
========================= */

function attachAirfareInputListeners() {
    const airfareInput = el('travelAirfare');
    if (!airfareInput || airfareInput.dataset.bound) return;

    airfareInput.addEventListener('input', () => {
        airfareUserEdited = true;
        updateAirfarePreview();
        calculateTravel();
    });

    airfareInput.addEventListener('blur', () => {
        if (!airfareInput.value) airfareUserEdited = false;
    });

    airfareInput.dataset.bound = 'true';
}

/* =========================
   Calculation
========================= */

export function calculateTravel() {
    const airfareInput = el('travelAirfare');
    const perTrip = parseFloat(airfareInput?.value) || 0;
    // Number of flights per staff member (e.g. 2 staff × 2 flights = 4 flights)
    const numberOfAirfare = parseInt(el('numberOfAirfare')?.value) || 1;

    const plfs = parseInt(el('travelPLFs')?.value) || 0;
    const trips = parseInt(el('travelTrips')?.value) || 1;
    const days = parseInt(el('travelDays')?.value) || 0;
    // Additional trips (separate from main trips)
    const additionalTrips = parseInt(el('numOfAdditionalTrips')?.value) || 0;
    const avgNightsAdditional = parseInt(el('avgNumOfNightsPerAdditionalTrip')?.value) || 0;

    const perDiem = parseFloat(el('travelPerDiem')?.value) || 0;
    const lodging = parseFloat(el('travelLodgingPerNight')?.value) || 0;
    const ground = parseFloat(el('travelGroundPerDay')?.value) || 0;

    const airfareTotal = perTrip * numberOfAirfare * trips * plfs;
    const perDiemTotal = perDiem * (days + 1) * trips * plfs;
    const lodgingTotal = lodging * days * trips * plfs;
    const groundTotal = ground * days * trips * plfs;

    // Additional trips totals
    // Additional-trip airfare should NOT multiply by the '# of flights' field
    // (additional trips are counted separately from the per-trip flights multiplier)
    const addAirfareTotal = perTrip * additionalTrips * plfs;
    const addPerDiemTotal = perDiem * (avgNightsAdditional + 1) * additionalTrips * plfs;
    const addLodgingTotal = lodging * avgNightsAdditional * additionalTrips * plfs;
    const addGroundTotal = ground * avgNightsAdditional * additionalTrips * plfs;

    const totalAirfare = airfareTotal + addAirfareTotal;
    const totalPerDiem = perDiemTotal + addPerDiemTotal;
    const totalLodging = lodgingTotal + addLodgingTotal;
    const totalGround = groundTotal + addGroundTotal;

    const total =
        totalAirfare +
        totalPerDiem +
        totalLodging +
        totalGround;

    el('travelTotal') && (el('travelTotal').textContent = formatCurrency(total));

    const calcBtn = el('calculateTravelBtn');
    if (calcBtn) {
        calcBtn.dataset.airfare = totalAirfare.toFixed(2);
        calcBtn.dataset.lodging = totalLodging.toFixed(2);
        calcBtn.dataset.transport = totalGround.toFixed(2);
        calcBtn.dataset.perdiem = totalPerDiem.toFixed(2);
    }
}

/* =========================
   Apply to Summary
========================= */

export function applyTravelToSummary(appliedTravel) {
    const btn = el('calculateTravelBtn');

    appliedTravel.airfare = parseFloat(btn?.dataset.airfare) || 0;
    appliedTravel.lodging = parseFloat(btn?.dataset.lodging) || 0;
    appliedTravel.transport = parseFloat(btn?.dataset.transport) || 0;
    appliedTravel.meals = parseFloat(btn?.dataset.perdiem) || 0;

    el('airfareSummary').textContent = formatCurrency(appliedTravel.airfare);
    el('hotelSummary').textContent = formatCurrency(appliedTravel.lodging);
    el('transportSummary').textContent = formatCurrency(appliedTravel.transport);
    el('mealsSummary').textContent = formatCurrency(appliedTravel.meals);
    el('travelSummary').textContent = formatCurrency(
        appliedTravel.airfare +
        appliedTravel.lodging +
        appliedTravel.transport +
        appliedTravel.meals
    );

    updateTotal();
}
