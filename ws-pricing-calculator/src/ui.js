import { el, show, hide, getString, getNumber, formatCurrency, calculateComponentCost } from './utils.js';

let summaryPanelInitialized = false;
export let appliedTravel = {
    airfare: 0,
    lodging: 0,
    transport: 0,
    meals: 0
};

export function updateTotal() {
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

    const indirectEl = el('indirectRate');
    const markupEl = el('markup');
    const indirectRate = indirectEl ? (parseFloat(indirectEl.value) || 0) : 0;
    const markupRate = markupEl ? (parseFloat(markupEl.value) || 0) : 0;

    const airfareEl = el('airfare');
    const hotelEl = el('hotel');
    const transportationEl = el('transportation');
    const mealsEl = el('mealsPerDiem');
    const airfare = airfareEl ? (parseFloat(airfareEl.value) || 0) : (appliedTravel.airfare || 0);
    const hotel = hotelEl ? (parseFloat(hotelEl.value) || 0) : (appliedTravel.lodging || 0);
    const transportation = transportationEl ? (parseFloat(transportationEl.value) || 0) : (appliedTravel.transport || 0);
    const mealsPerDiem = mealsEl ? (parseFloat(mealsEl.value) || 0) : (appliedTravel.meals || 0);
    const additionalCosts = airfare + hotel + transportation + mealsPerDiem;

    const travelSummaryEl = el('travelSummary');
    if (travelSummaryEl) travelSummaryEl.textContent = formatCurrency(additionalCosts);

    const airfareSummaryEl = el('airfareSummary');
    const hotelSummaryEl = el('hotelSummary');
    const transportSummaryEl = el('transportSummary');
    const mealsSummaryEl = el('mealsSummary');
    if (airfareSummaryEl) airfareSummaryEl.textContent = formatCurrency(airfare);
    if (hotelSummaryEl) hotelSummaryEl.textContent = formatCurrency(hotel);
    if (transportSummaryEl) transportSummaryEl.textContent = formatCurrency(transportation);
    if (mealsSummaryEl) mealsSummaryEl.textContent = formatCurrency(mealsPerDiem);

    const indirectCost = baseTotal * (indirectRate / 100);
    const markupCost = (baseTotal + indirectCost) * (markupRate / 100);
    const subtotal = baseTotal + indirectCost + markupCost;
    const grandTotal = subtotal + additionalCosts;

    const baseCostEl = el('baseCost');
    const indirectCostEl = el('indirectCost');
    const markupCostEl = el('markupCost');
    const subtotalEl = el('subtotal');
    const totalAmountEl = el('totalAmount');
    if (baseCostEl) baseCostEl.textContent = formatCurrency(baseTotal);
    if (indirectCostEl) indirectCostEl.textContent = formatCurrency(indirectCost);
    if (markupCostEl) markupCostEl.textContent = formatCurrency(markupCost);
    if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
    if (totalAmountEl) totalAmountEl.textContent = formatCurrency(grandTotal);
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

export function toggleInstructions() {
    const content = el('instructionsContent');
    const icon = el('instructionsIcon');
    if (!content || !icon) return;
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.classList.add('rotate-180');
    } else {
        content.classList.add('hidden');
        icon.classList.remove('rotate-180');
    }
}

export function toggleTravelInstructions() {
    const content = el('travelInstructionsContent');
    const icon = el('travelInstructionsIcon');
    if (!content || !icon) return;
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.classList.add('rotate-180');
    } else {
        content.classList.add('hidden');
        icon.classList.remove('rotate-180');
    }
}

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
    summaryPanelInitialized = true;
}

export function clearTravel() {
    appliedTravel.airfare = 0;
    appliedTravel.lodging = 0;
    appliedTravel.transport = 0;
    appliedTravel.meals = 0;
    appliedTravel.carMileage = 0;
    const calcBtn = el('calculateTravelBtn');
    if (calcBtn) {
        calcBtn.dataset.airfare = '0';
        calcBtn.dataset.lodging = '0';
        calcBtn.dataset.transport = '0';
        calcBtn.dataset.perdiem = '0';
        calcBtn.dataset.carMileage = '0';
    }
    const airfareSummaryEl = el('airfareSummary');
    const hotelSummaryEl = el('hotelSummary');
    const transportSummaryEl = el('transportSummary');
    const mealsSummaryEl = el('mealsSummary');
    const travelSummaryEl = el('travelSummary');
    const travelTotalEl = el('travelTotal');
    const airfarePreviewEl = el('travelAirfarePerTrip');
    const airfareInputEl = el('travelAirfare');
    const travelCarTotalEl = el('travelCarTotal');
    if (airfareSummaryEl) airfareSummaryEl.textContent = formatCurrency(0);
    if (hotelSummaryEl) hotelSummaryEl.textContent = formatCurrency(0);
    if (transportSummaryEl) transportSummaryEl.textContent = formatCurrency(0);
    if (mealsSummaryEl) mealsSummaryEl.textContent = formatCurrency(0);
    if (travelSummaryEl) travelSummaryEl.textContent = formatCurrency(0);
    if (travelTotalEl) travelTotalEl.textContent = formatCurrency(0);
    if (airfarePreviewEl) airfarePreviewEl.textContent = formatCurrency(0);
    if (airfareInputEl) airfareInputEl.value = '';
    if (travelCarTotalEl) travelCarTotalEl.value = '0.00';
    updateTotal();
}
