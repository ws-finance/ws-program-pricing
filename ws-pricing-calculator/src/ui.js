import { el, show, hide, getString, getNumber, formatCurrency, calculateComponentCost } from './utils.js';
import { applyTravelToSummary } from './travel.js';

let summaryPanelInitialized = false;
export let appliedTravel = {
    airfare: 0,
    lodging: 0,
    transport: 0,
    meals: 0,
    mileage: 0
};

// ========================
// Helper Functions
// ========================

function getInputNumber(id, fallback = 0) {
    const input = el(id);
    return input ? (parseFloat(input.value) || 0) : fallback;
}

function setText(id, value) {
    const node = el(id);
    if (node) node.textContent = value;
}

function getTravelCosts() {
    return {
        airfare: getInputNumber('airfare', appliedTravel.airfare),
        lodging: getInputNumber('hotel', appliedTravel.lodging),
        transport: getInputNumber('transportation', appliedTravel.transport),
        meals: getInputNumber('mealsPerDiem', appliedTravel.meals),
        mileage: appliedTravel.mileage
    };
}

function getTravelTotal(costs) {
    return Object.values(costs).reduce((sum, v) => sum + v, 0);
}

function calculateBaseTotal() {
    let baseTotal = 0;
    document.querySelectorAll('.program-section').forEach(section => {
        let programTotal = 0;
        section.querySelectorAll('tbody tr').forEach(row => {
            const costText = row.querySelector('.cost-cell').textContent;
            const cost = parseFloat(costText.replace(/[$,]/g, ''));
            programTotal += cost;
        });

        const programTotalElement = section.querySelector('#programTotal');
        if (programTotalElement) {
            programTotalElement.textContent = formatCurrency(programTotal);
        }
        baseTotal += programTotal;
    });
    return baseTotal;
}

function calculateTotals() {
    const baseTotal = calculateBaseTotal();
    const indirectRate = getInputNumber('indirectRate');
    const markupRate = getInputNumber('markup');

    const indirectCost = baseTotal * (indirectRate / 100);
    const markupCost = (baseTotal + indirectCost) * (markupRate / 100);

    const travel = getTravelCosts();
    const travelTotal = getTravelTotal(travel);

    const subtotal = baseTotal + indirectCost + markupCost;
    const grandTotal = subtotal + travelTotal;

    return {
        baseTotal,
        indirectCost,
        markupCost,
        subtotal,
        grandTotal,
        travel,
        travelTotal
    };
}

function renderTotals(totals) {
    const { baseTotal, indirectCost, markupCost, subtotal, grandTotal, travel } = totals;

    setText('airfareSummary', formatCurrency(travel.airfare));
    setText('hotelSummary', formatCurrency(travel.lodging));
    setText('transportSummary', formatCurrency(travel.transport));
    setText('mealsSummary', formatCurrency(travel.meals));
    setText('carMileageSummary', formatCurrency(travel.mileage));
    setText('travelSummary', formatCurrency(totals.travelTotal));

    setText('baseCost', formatCurrency(baseTotal));
    setText('indirectCost', formatCurrency(indirectCost));
    setText('markupCost', formatCurrency(markupCost));
    setText('subtotal', formatCurrency(subtotal));
    setText('totalAmount', formatCurrency(grandTotal));
}

export function updateTotal() {
    const totals = calculateTotals();
    renderTotals(totals);
}

export function createComponentRow(component, programName, componentIndex) {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50 transition-colors';
    if (component.isTravel) tr.classList.add('bg-blue-50');

    const tdComponent = document.createElement('td');
    tdComponent.className = 'px-6 py-4';
    const componentContainer = document.createElement('div');
    componentContainer.className = 'flex items-center gap-2';
    
    const componentName = document.createElement('div');
    componentName.className = 'text-sm font-medium text-slate-900';
    componentName.textContent = component.component;
    componentContainer.appendChild(componentName);
    
    if (component.description) {
        const tooltipIcon = document.createElement('span');
        tooltipIcon.className = 'text-slate-400 hover:text-slate-600 cursor-help text-xs';
        tooltipIcon.innerHTML = 'ℹ️';
        tooltipIcon.title = component.description.replace(/\n/g, ' ');
        componentContainer.appendChild(tooltipIcon);
    }
    
    tdComponent.appendChild(componentContainer);
    tr.appendChild(tdComponent);

    const tdStaff = document.createElement('td');
    tdStaff.className = 'px-6 py-4';
    const staffHours = document.createElement('div');
    staffHours.className = 'flex flex-wrap gap-1';
    Object.entries(component.hours).forEach(([staff, hours]) => {
        if (hours > 0) {
            const badge = document.createElement('span');
            badge.className = 'inline-flex items-center px-2 py-1 rounded text-xs font-medium';
            if (staff === 'PLF') badge.className += ' bg-primary-100 text-primary-800';
            else if (staff === 'Program Coordinator') badge.className += ' bg-secondary-100 text-secondary-800';
            else if (staff === 'Director of Evaluation') badge.className += ' bg-accent-100 text-accent-800';
            badge.textContent = staff;
            staffHours.appendChild(badge);
        }
    });
    tdStaff.appendChild(staffHours);
    tr.appendChild(tdStaff);

    const tdQuantity = document.createElement('td');
    tdQuantity.className = 'px-6 py-4';
    const qtyInput = document.createElement('input');
    qtyInput.type = 'number';
    qtyInput.className = 'quantity-input w-16 px-2 py-1 text-sm border border-slate-300 rounded focus:border-primary-500 focus:ring-1 focus:ring-primary-500';
    qtyInput.min = '0';
    qtyInput.value = component.multiplier.toString();
    qtyInput.dataset.program = programName;
    qtyInput.dataset.component = componentIndex;
    tdQuantity.appendChild(qtyInput);
    tr.appendChild(tdQuantity);

    const tdMultiplier = document.createElement('td');
    tdMultiplier.className = 'px-6 py-4';
    const multInput = document.createElement('input');
    multInput.type = 'number';
    multInput.className = 'multiplier-input w-16 px-2 py-1 text-sm border border-slate-300 rounded focus:border-primary-500 focus:ring-1 focus:ring-primary-500';
    multInput.min = '0';
    multInput.step = '1';
    multInput.value = '1';
    if (component.evaluation) {
        multInput.disabled = true;
        multInput.title = 'Multiplier fixed for evaluation items';
        multInput.className += ' opacity-50 cursor-not-allowed';
    }
    tdMultiplier.appendChild(multInput);
    tr.appendChild(tdMultiplier);

    const tdCost = document.createElement('td');
    tdCost.className = 'px-6 py-4 cost-cell text-sm font-medium text-slate-900 text-right';
    tr.appendChild(tdCost);

    function recomputeRowCost() {
        const q = parseFloat(qtyInput.value) || 0;
        const m = parseFloat(multInput.value) || 1;
        const cost = calculateComponentCost(component, q * m);
        tdCost.textContent = formatCurrency(cost);
        updateTotal();
    }

    qtyInput.addEventListener('input', recomputeRowCost);
    multInput.addEventListener('input', recomputeRowCost);
    recomputeRowCost();

    return tr;
}

export function populateProgramSelector(programData) {
    const selector = el('programSelector');
    Object.keys(programData).forEach(programName => {
        const option = document.createElement('option');
        option.value = programName;
        option.textContent = programName;
        selector.appendChild(option);
    });
    selector.addEventListener('change', (e) => {
        const selectedProgram = e.target.value;
        if (selectedProgram) {
            renderSelectedProgram(selectedProgram, programData);
            show('selectedProgramContainer');
        } else {
            hide('selectedProgramContainer');
            hide('summaryPanel');
            show('emptyState');
        }
    });
}

export function renderSelectedProgram(programName, programData) {
    const container = el('programsContainer');
    container.innerHTML = '';
    show('summaryPanel');
    hide('emptyState');

    const section = document.createElement('div');
    section.className = 'bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden program-section';
    const header = document.createElement('div');
    header.className = 'bg-slate-800 px-6 py-4';
    header.innerHTML = `<div class="flex justify-between items-center"><h3 class="text-lg font-semibold text-white">${programName}</h3><div class="text-lg font-semibold text-white" id="programTotal">$0.00</div></div>`;
    section.appendChild(header);

    const table = document.createElement('table');
    table.className = 'w-full';
    const thead = document.createElement('thead');
    thead.className = 'bg-slate-50';
    thead.innerHTML = `<tr><th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Component</th><th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Staff</th><th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Quantity</th><th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Multiplier</th><th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Cost</th></tr>`;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    tbody.className = 'bg-white divide-y divide-slate-200';
    const components = programData[programName];
    components.forEach((component, index) => {
        tbody.appendChild(createComponentRow(component, programName, index));
    });
    table.appendChild(tbody);
    section.appendChild(table);

    if (components.some(c => c.isTravel)) {
        const travelNote = document.createElement('div');
        travelNote.className = 'bg-amber-50 border-l-4 border-amber-400 p-4';
        travelNote.innerHTML = '<div class="flex"><div class="ml-3"><p class="text-sm text-amber-700"><strong>Note:</strong> Select only ONE travel level (Low, Mid, or High) based on your location.</p></div></div>';
        section.appendChild(travelNote);
    }

    container.appendChild(section);
    if (!summaryPanelInitialized) initializeSummaryPanel();
    updateTotal();
}

export function exportToPDF(programData) {
    const selectedProgram = getString('programSelector');
    if (!selectedProgram) {
        alert('Please select a program first');
        return;
    }

    let exportText = 'PRICING ESTIMATE\n\nGenerated on: ' + new Date().toLocaleDateString() + '\n\n';
    const section = document.querySelector('.program-section');
    const programName = section ? (section.querySelector('h3')?.textContent || 'Program') : 'Program';
    exportText += programName + '\n' + '='.repeat(60) + '\n';

    section.querySelectorAll('tbody tr').forEach(row => {
        const qtyEl = row.querySelector('.quantity-input');
        const multEl = row.querySelector('.multiplier-input');
        const quantity = parseFloat(qtyEl?.value) || 0;
        const multiplier = parseFloat(multEl?.value) || 1;
        if (quantity > 0) {
            const component = row.querySelector('td:first-child div:first-child').textContent;
            const cost = row.querySelector('.cost-cell').textContent;
            exportText += component + ' (Qty: ' + quantity + ' × ' + multiplier + '): ' + cost + '\n';
        }
    });

    exportText += '\n' + '='.repeat(60) + '\nBase Cost: ' + (el('baseCost')?.textContent || '$0.00') + '\n';
    const additionalTotal = (getNumber('airfare', appliedTravel.airfare || 0) || appliedTravel.airfare || 0) + (getNumber('hotel', appliedTravel.lodging || 0) || appliedTravel.lodging || 0) + (getNumber('transportation', appliedTravel.transport || 0) || appliedTravel.transport || 0) + (getNumber('mealsPerDiem', appliedTravel.meals || 0) || appliedTravel.meals || 0);
    exportText += 'Additional Costs: $' + additionalTotal.toFixed(2) + '\n';
    exportText += 'GRAND TOTAL: ' + (el('totalAmount')?.textContent || '$0.00') + '\n';

    const blob = new Blob([exportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pricing-estimate-' + new Date().toISOString().split('T')[0] + '.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function toggleSection(contentId, iconId) {
    const content = el(contentId);
    const icon = el(iconId);
    if (!content || !icon) return;

    const isHidden = content.classList.contains('hidden');
    content.classList.toggle('hidden', !isHidden);
    icon.classList.toggle('rotate-180', isHidden);
}

export const toggleInstructions = () =>
    toggleSection('instructionsContent', 'instructionsIcon');

export const toggleTravelInstructions = () =>
    toggleSection('travelInstructionsContent', 'travelInstructionsIcon');

function initializeSummaryPanel() {
    if (summaryPanelInitialized) return;
    const indirectEl = el('indirectRate');
    const markupEl = el('markup');
    if (indirectEl) indirectEl.addEventListener('input', updateTotal);
    if (markupEl) markupEl.addEventListener('input', updateTotal);
    const airfareEl = el('airfare');
    const hotelEl = el('hotel');
    const transportEl = el('transportation');
    const mealsEl = el('mealsPerDiem');
    if (airfareEl) airfareEl.addEventListener('input', updateTotal);
    if (hotelEl) hotelEl.addEventListener('input', updateTotal);
    if (transportEl) transportEl.addEventListener('input', updateTotal);
    if (mealsEl) mealsEl.addEventListener('input', updateTotal);
    setupLodgingRegionToggle();
    summaryPanelInitialized = true;
}

// Lodging region toggle handler
function setupLodgingRegionToggle() {
    const lodgingRegion = el('lodgingRegion');
    const lodgingPerNight = el('travelLodgingPerNight');
    if (!lodgingRegion || !lodgingPerNight) return;
    lodgingRegion.addEventListener('change', () => {
        lodgingPerNight.value = lodgingRegion.checked ? '375' : '275';
    });
}

export function clearTravel() {
    appliedTravel.airfare = 0;
    appliedTravel.lodging = 0;
    appliedTravel.transport = 0;
    appliedTravel.meals = 0;
    appliedTravel.mileage = 0;

    const calcBtn = el('calculateTravelBtn');
    if (calcBtn) {
        calcBtn.dataset.airfare = '0';
        calcBtn.dataset.lodging = '0';
        calcBtn.dataset.transport = '0';
        calcBtn.dataset.perdiem = '0';
        calcBtn.dataset.mileage = '0';
    }

    // Clear all travel summary displays directly
    const TRAVEL_SUMMARY_FIELDS = [
        'airfareSummary',
        'hotelSummary',
        'transportSummary',
        'mealsSummary',
        'carMileageSummary',
        'travelSummary',
        'travelTotal',
        'travelAirfarePerTrip'
    ];
    TRAVEL_SUMMARY_FIELDS.forEach(id => setText(id, formatCurrency(0)));

    // Clear travel input fields
    const airfareInputEl = el('travelAirfare');
    const travelCarTotalEl = el('travelCarTotal');
    const travelCarMilesEl = el('travelCarMiles');
    if (airfareInputEl) airfareInputEl.value = '';
    if (travelCarTotalEl) travelCarTotalEl.value = '0.00';
    if (travelCarMilesEl) travelCarMilesEl.value = '0';

    updateTotal();
}
