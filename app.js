// Hourly rates from Pricing - Salaries.csv
const hourlyRates = {
    'PLF': 54.28,
    'Program Coordinator': 38.82,
    'Director of Evaluation': 62.08
};

// Program data parsed from Pricing - Hourly Estimates.csv
const programData = {
    'Traditional Comprehensive School Partnership (TCSP)': [
        {
            component: 'Yearly launch workshop',
            description: '1 day, 6 hours delivery + 2 hours set-up/tear down\n(Delivery = 6 hours, Prep = 24 hours (6 x 4) - Prep ratio of 4/1, Set-up/Tear Down = 2 hours, Total = 32 hours)',
            multiplier: 1,
            hours: { PLF: 32, 'Program Coordinator': 0, 'Director of Evaluation': 0 }
        },
        {
            component: '1:1 Coaching',
            description: '15 teachers, 8 sessions per teacher (15 x 8 = 120)\n(Prep ratio of 1.5/1)',
            multiplier: 120,
            hours: { PLF: 2.5, 'Program Coordinator': 0, 'Director of Evaluation': 0 }
        },
        {
            component: 'Deep Dives',
            description: '90 min delivery, In-person aligned with existing coaching schedule OR virtual, 2 sessions included yearly (x2)\n(Delivery = 1.5 hours, Prep = 6 hours (1.5 x 4) - Prep ratio of 4/1, Total = 7.5 hours)',
            multiplier: 2,
            hours: { PLF: 7.5, 'Program Coordinator': 0, 'Director of Evaluation': 0 }
        },
        {
            component: 'MOY Evaluation',
            description: 'Survey data aggregation and top sheet creation, Once yearly',
            multiplier: 1,
            hours: { PLF: 2, 'Program Coordinator': 0, 'Director of Evaluation': 20 },
            evaluation: true
        },
        {
            component: 'EOY Evaluation',
            description: 'Survey data aggregation and top sheet creation, Once yearly',
            multiplier: 1,
            hours: { PLF: 2, 'Program Coordinator': 0, 'Director of Evaluation': 20 },
            evaluation: true
        },
        {
            component: 'Quarterly Admin Meetings',
            description: '1 hour per quarter (1 x 4 = 4)\n(Prep for admin meetings included in coaching prep)',
            multiplier: 4,
            hours: { PLF: 2.5, 'Program Coordinator': 0, 'Director of Evaluation': 0 }
        },
        {
            component: 'Travel - Low',
            description: 'Estimated travel time 30 min to 2 hours each way\n(Assumes all in-person delivery: 1 launch workshop + 8 Coaching Sessions = 9 trips)',
            multiplier: 9,
            hours: { PLF: 3, 'Program Coordinator': 0, 'Director of Evaluation': 0 },
            isTravel: true
        },
        {
            component: 'Travel - Mid',
            description: 'Estimated travel time 2 to 6 hours each way',
            multiplier: 9,
            hours: { PLF: 8, 'Program Coordinator': 0, 'Director of Evaluation': 0 },
            isTravel: true
        },
        {
            component: 'Travel - High',
            description: 'Estimated travel time 6 to 10 hours each way',
            multiplier: 9,
            hours: { PLF: 16, 'Program Coordinator': 0, 'Director of Evaluation': 0 },
            isTravel: true
        }
    ],
    'Professional Learning Community Comprehensive School Partnership (PLC CSP)': [
        {
            component: 'Yearly launch workshop',
            description: '1 day, 6 hours delivery + 2 hours set-up/tear down\n(Delivery = 6 hours, Prep = 24 hours (6 x 4) - Prep ratio of 4/1, Set-up/Tear Down = 2 hours, Total = 32 hours)',
            multiplier: 1,
            hours: { PLF: 32, 'Program Coordinator': 0, 'Director of Evaluation': 0 }
        },
        {
            component: 'PLC sessions',
            description: '6 sessions per year, 90 minute sessions, Up to 20 participants\n(Delivery 1.5 hours, Prep 6 hours (1.5 x 4) - Prep ratio of 4/1, Total = 7.5 hours)',
            multiplier: 6,
            hours: { PLF: 7.5, 'Program Coordinator': 0, 'Director of Evaluation': 0 }
        },
        {
            component: 'MOY Evaluation',
            description: 'Survey data aggregation and top sheet creation, Once yearly',
            multiplier: 1,
            hours: { PLF: 2, 'Program Coordinator': 0, 'Director of Evaluation': 20 },
            evaluation: true
        },
        {
            component: 'EOY Evaluation',
            description: 'Survey data aggregation and top sheet creation, Once yearly',
            multiplier: 1,
            hours: { PLF: 2, 'Program Coordinator': 0, 'Director of Evaluation': 20 },
            evaluation: true
        },
        {
            component: 'Quarterly Admin Meetings',
            description: '1 hour per quarter (1 x 4 = 4)\n(Prep for admin meetings included in PLC prep)',
            multiplier: 4,
            hours: { PLF: 2.5, 'Program Coordinator': 0, 'Director of Evaluation': 0 }
        },
        {
            component: 'Travel - Low',
            description: 'Estimated travel time 30 min to 2 hours each way\n(Assumes all in-person delivery: 1 launch workshop + 6 PLC Sessions = 7 trips)',
            multiplier: 7,
            hours: { PLF: 3, 'Program Coordinator': 0, 'Director of Evaluation': 0 },
            isTravel: true
        },
        {
            component: 'Travel - Mid',
            description: 'Estimated travel time 2 to 6 hours each way',
            multiplier: 7,
            hours: { PLF: 8, 'Program Coordinator': 0, 'Director of Evaluation': 0 },
            isTravel: true
        },
        {
            component: 'Travel - High',
            description: 'Estimated travel time 6 to 10 hours each way',
            multiplier: 7,
            hours: { PLF: 16, 'Program Coordinator': 0, 'Director of Evaluation': 0 },
            isTravel: true
        }
    ],
    'Virtual CSP': [
        {
            component: 'Yearly launch workshop',
            description: '1 day, 6 hours delivery + 2 hours set-up/tear down\n(Delivery = 6 hours, Prep = 24 hours (6 x 4) - Prep ratio 4/1, Set-up/Tear Down = 2 hours, Total = 32 hours)',
            multiplier: 1,
            hours: { PLF: 32, 'Program Coordinator': 0, 'Director of Evaluation': 0 }
        },
        {
            component: '1:1 Coaching',
            description: '15 teachers, 8 sessions per teacher (15 x 8 = 120)',
            multiplier: 120,
            hours: { PLF: 2.5, 'Program Coordinator': 0, 'Director of Evaluation': 0 }
        },
        {
            component: 'Deep Dives',
            description: '90 min delivery, In-person aligned with existing coaching schedule OR virtual, 2 sessions included yearly (x2)\n(Delivery = 1.5 hours, Prep = 6 hours (1.5 x 4) - Prep ratio 4/1, Total = 7.5 hours)',
            multiplier: 2,
            hours: { PLF: 7.5, 'Program Coordinator': 0, 'Director of Evaluation': 0 }
        },
        {
            component: 'MOY Evaluation',
            description: 'Survey data aggregation and top sheet creation, Once yearly',
            multiplier: 1,
            hours: { PLF: 2, 'Program Coordinator': 0, 'Director of Evaluation': 20 },
            evaluation: true
        },
        {
            component: 'EOY Evaluation',
            description: 'Survey data aggregation and top sheet creation, Once yearly',
            multiplier: 1,
            hours: { PLF: 2, 'Program Coordinator': 0, 'Director of Evaluation': 20 },
            evaluation: true
        },
        {
            component: 'Quarterly Admin Meetings',
            description: '1 hour per quarter (1 x 4 = 4)\n(Prep for admin meetings included in coaching prep)',
            multiplier: 4,
            hours: { PLF: 2.5, 'Program Coordinator': 0, 'Director of Evaluation': 0 }
        },
        {
            component: 'Travel - Low',
            description: 'Estimated travel time 30 min to 2 hours each way\n(Assumes in-person delivery of 1 launch workshop, all other components virtual)',
            multiplier: 1,
            hours: { PLF: 3, 'Program Coordinator': 0, 'Director of Evaluation': 0 },
            isTravel: true
        },
        {
            component: 'Travel - Mid',
            description: 'Estimated travel time 2 to 6 hours each way',
            multiplier: 1,
            hours: { PLF: 8, 'Program Coordinator': 0, 'Director of Evaluation': 0 },
            isTravel: true
        },
        {
            component: 'Travel - High',
            description: 'Estimated travel time 6 to 10 hours each way',
            multiplier: 1,
            hours: { PLF: 16, 'Program Coordinator': 0, 'Director of Evaluation': 0 },
            isTravel: true
        }
    ],
    'Changemaker Hub (CMH)': [
        {
            component: 'CMH Delivery',
            description: '1 day - 6 to 7 hours of delivery + 2 hours set-up/tear down\n(Delivery = 6 hours, Prep = 24 hours (6 x 4) - Prep ratio 4/1, Set-up/Tear Down = 2 hours, Total = 32 hours per PLF. MINIMUM 2 PLFs Required = 64 hours)',
            multiplier: 1,
            hours: { PLF: 64, 'Program Coordinator': 0, 'Director of Evaluation': 8 }
        },
        {
            component: 'CMH Prep and Logistic Coordination',
            description: 'Up to 6 1-hour meetings with clients, Eventbrite coordination and monitoring, Travel coordination, Event Logistics (Meal prep and Facilities location/rental not included)',
            multiplier: 1,
            hours: { PLF: 0, 'Program Coordinator': 38, 'Director of Evaluation': 0 }
        },
        {
            component: 'Evaluation',
            description: 'Survey data aggregation and top sheet creation',
            multiplier: 1,
            hours: { PLF: 0, 'Program Coordinator': 0, 'Director of Evaluation': 10 },
            evaluation: true
        },
        {
            component: 'Travel - Low',
            description: 'Estimated travel time 30 min to 2 hours each way\n(Assumes in-person delivery of 1 Changemaker Hub with 3 staff members)',
            multiplier: 3,
            hours: { PLF: 3, 'Program Coordinator': 0, 'Director of Evaluation': 0 },
            isTravel: true
        },
        {
            component: 'Travel - Mid',
            description: 'Estimated travel time 2 to 6 hours each way',
            multiplier: 3,
            hours: { PLF: 8, 'Program Coordinator': 0, 'Director of Evaluation': 0 },
            isTravel: true
        },
        {
            component: 'Travel - High',
            description: 'Estimated travel time 6 to 10 hours each way',
            multiplier: 3,
            hours: { PLF: 16, 'Program Coordinator': 0, 'Director of Evaluation': 0 },
            isTravel: true
        }
    ],
    '2 day Leadership Cohort': [
        {
            component: 'Workshop Delivery',
            description: '2 consecutive days, 12 hours delivery + 2 hours set-up/tear down per day (4 hours total)\n(Delivery = 12 hours, Prep = 48 hours (12 x 4) - Prep ratio 4/1, Set-up/Tear Down = 4 hours, Total = 64 hours)',
            multiplier: 1,
            hours: { PLF: 64, 'Program Coordinator': 0, 'Director of Evaluation': 0 }
        },
        {
            component: 'Evaluation',
            description: 'Survey aggregation and data topsheet creation',
            multiplier: 1,
            hours: { PLF: 0, 'Program Coordinator': 0, 'Director of Evaluation': 15 },
            evaluation: true
        },
        {
            component: 'Travel - Low',
            description: 'Estimated travel time 30 min to 2 hours each way\n(Assumes in-person delivery of 1 2 consecutive day launch workshop)',
            multiplier: 1,
            hours: { PLF: 3, 'Program Coordinator': 0, 'Director of Evaluation': 0 },
            isTravel: true
        },
        {
            component: 'Travel - Mid',
            description: 'Estimated travel time 2 to 6 hours each way',
            multiplier: 1,
            hours: { PLF: 8, 'Program Coordinator': 0, 'Director of Evaluation': 0 },
            isTravel: true
        },
        {
            component: 'Travel - High',
            description: 'Estimated travel time 6 to 10 hours each way',
            multiplier: 1,
            hours: { PLF: 16, 'Program Coordinator': 0, 'Director of Evaluation': 0 },
            isTravel: true
        }
    ],
    '3 day Leadership Cohort': [
        {
            component: 'Workshop Delivery',
            description: '3 consecutive days, 18 hours delivery + 2 hours set-up/tear down per day (6 hours total)\n(Delivery = 18 hours, Prep = 72 hours (18 x 4) - Prep ratio 4/1, Set-up/Tear Down = 6 hours, Total = 96 hours)',
            multiplier: 1,
            hours: { PLF: 64, 'Program Coordinator': 0, 'Director of Evaluation': 0 }
        },
        {
            component: 'Evaluation',
            description: 'Survey aggregation and data topsheet creation',
            multiplier: 1,
            hours: { PLF: 0, 'Program Coordinator': 0, 'Director of Evaluation': 15 },
            evaluation: true
        },
        {
            component: 'Travel - Low',
            description: 'Estimated travel time 30 min to 2 hours each way\n(Assumes in-person delivery of 3 non-consecutive sessions, requiring 3 overnight trips)',
            multiplier: 3,
            hours: { PLF: 3, 'Program Coordinator': 0, 'Director of Evaluation': 0 },
            isTravel: true
        },
        {
            component: 'Travel - Mid',
            description: 'Estimated travel time 2 to 6 hours each way',
            multiplier: 3,
            hours: { PLF: 8, 'Program Coordinator': 0, 'Director of Evaluation': 0 },
            isTravel: true
        },
        {
            component: 'Travel - High',
            description: 'Estimated travel time 6 to 10 hours each way',
            multiplier: 3,
            hours: { PLF: 16, 'Program Coordinator': 0, 'Director of Evaluation': 0 },
            isTravel: true
        }
    ],
    'LCE (Virtually Delivered)': [
        {
            component: 'Design Sprint Sessions',
            description: '6 sessions per year, 2 hours, 4-5 participants per group (single group is standard)\n(Delivery 1.5 hours, Prep 6 hours (1.5 x 4) - Prep ratio 4/1, Total = 7.5 hours)',
            multiplier: 6,
            hours: { PLF: 7.5, 'Program Coordinator': 0, 'Director of Evaluation': 0 }
        },
        {
            component: 'Evaluation',
            description: 'Survey aggregation and data topsheet creation',
            multiplier: 1,
            hours: { PLF: 0, 'Program Coordinator': 0, 'Director of Evaluation': 20 },
            evaluation: true
        },
        {
            component: 'Optional 1:1 or small group Coaching',
            description: 'Added in 4 hour blocks, one hour between each session',
            multiplier: 4,
            hours: { PLF: 2.5, 'Program Coordinator': 0, 'Director of Evaluation': 0 }
        }
    ],
    'Readiness Assessment': [
        {
            component: 'Instrument Design and Implementation',
            description: 'Survey Design/Revision (16 hours), Survey Administration - Educators, Students, and Community/Caregivers (8 hours), Focus Group Design and Revision (8 hours), Focus Group Admin (8 hours)\n*If FG\'s take more than 8 hours, we charge in 4 hour increments @ $165/hr\nFocus Groups should be facilitated virtually. Each participant should have their own device.',
            multiplier: 1,
            hours: { PLF: 0, 'Program Coordinator': 0, 'Director of Evaluation': 40 }
        },
        {
            component: 'Onsite Observations and Analysis',
            description: 'Based on 15 teacher sample size, Observation and analysis of current teacher practice on WS yearly rubrics (estimated at 45 min per teacher, with a cap of 8 teacher/day/PLF. 15x45 min= 11.25 hours), Review of curricular and planning documents (estimated at 45 min per teacher x 15 teachers = 11.25 hours), Prep and analysis at 1.5/1 ratio (22.5x1.5 = 33.75 hours), Total = 56.25, rounded down to 56',
            multiplier: 1,
            hours: { PLF: 56, 'Program Coordinator': 0, 'Director of Evaluation': 0 }
        },
        {
            component: 'Analysis and report creation',
            description: 'Survey, focus group, and teacher observation data aggregated and report creation = 40 hours',
            multiplier: 1,
            hours: { PLF: 0, 'Program Coordinator': 0, 'Director of Evaluation': 40 }
        },
        {
            component: 'Travel - Low',
            description: 'Estimated travel time 30 min to 2 hours each way\n(Assumes in-person delivery of teacher observations for up to 15 teachers. Standard package assumes 2 nights and 3 days travel)',
            multiplier: 1,
            hours: { PLF: 3, 'Program Coordinator': 0, 'Director of Evaluation': 0 },
            isTravel: true
        },
        {
            component: 'Travel - Mid',
            description: 'Estimated travel time 2 to 6 hours each way',
            multiplier: 1,
            hours: { PLF: 8, 'Program Coordinator': 0, 'Director of Evaluation': 0 },
            isTravel: true
        },
        {
            component: 'Travel - High',
            description: 'Estimated travel time 6 to 10 hours each way',
            multiplier: 1,
            hours: { PLF: 16, 'Program Coordinator': 0, 'Director of Evaluation': 0 },
            isTravel: true
        }
    ],
    'Capstone Course Creation': [
        {
            component: '1:1 Coaching/Course Creation Consultation',
            description: '1 teacher or up to a group of 4 (i.e. grade-level team, department, etc), 40 hours of consultation/coaching\n(Prep ratio of 1.5/1)',
            multiplier: 40,
            hours: { PLF: 2.5, 'Program Coordinator': 0, 'Director of Evaluation': 0 }
        }
    ],
    'Critical Conversation': [
        {
            component: 'Event Facilitation',
            description: '3 hours of delivery, Prep ratio of 1.5/1 --> 3x1.5 = 4.5',
            multiplier: 1,
            hours: { PLF: 7.5, 'Program Coordinator': 0, 'Director of Evaluation': 0 }
        },
        {
            component: 'Internal Meetings',
            description: 'Coordination, logistics, etc.',
            multiplier: 1,
            hours: { PLF: 2, 'Program Coordinator': 0, 'Director of Evaluation': 0 }
        },
        {
            component: 'Travel - Low',
            description: 'Estimated travel time 30 min to 2 hours each way\n(Assumes in-person event for 1 night)',
            multiplier: 1,
            hours: { PLF: 3, 'Program Coordinator': 0, 'Director of Evaluation': 0 },
            isTravel: true
        },
        {
            component: 'Travel - Mid',
            description: 'Estimated travel time 2 to 6 hours each way',
            multiplier: 1,
            hours: { PLF: 8, 'Program Coordinator': 0, 'Director of Evaluation': 0 },
            isTravel: true
        },
        {
            component: 'Travel - High',
            description: 'Estimated travel time 6 to 10 hours each way',
            multiplier: 1,
            hours: { PLF: 16, 'Program Coordinator': 0, 'Director of Evaluation': 0 },
            isTravel: true
        }
    ],
    'Stand Alone Pricing': [
        {
            component: 'Coaching/Consultation',
            description: '1 hour of delivery with 1.5 hours of prep',
            multiplier: 1,
            hours: { PLF: 2.5, 'Program Coordinator': 0, 'Director of Evaluation': 0 }
        },
        {
            component: 'PLC facilitation',
            description: '1.5 hours of delivery with 6 hours of prep',
            multiplier: 1,
            hours: { PLF: 7.5, 'Program Coordinator': 0, 'Director of Evaluation': 0 }
        },
        {
            component: '1 day workshop',
            description: '1 day, 6 hours delivery + 2 hours set-up/tear down\n(Delivery = 6 hours, Prep = 24 hours (6 x 4) - Prep ratio 4/1, Set-up/Tear Down = 2 hours, Total = 32 hours)',
            multiplier: 1,
            hours: { PLF: 32, 'Program Coordinator': 0, 'Director of Evaluation': 0 }
        }
    ]
};

// Calculate cost for a component
function calculateComponentCost(component, quantity) {
    if (quantity === 0) return 0;
    
    let totalCost = 0;
    Object.entries(component.hours).forEach(([staff, hours]) => {
        if (hours > 0) {
            totalCost += hours * hourlyRates[staff] * quantity;
        }
    });
    
    return totalCost;
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }).format(amount);
}

// Update total
function updateTotal() {
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

    // Apply indirect rate and markup
    const indirectRate = parseFloat(document.getElementById('indirectRate').value) || 0;
    const markupRate = parseFloat(document.getElementById('markup').value) || 0;

    // Add additional costs
    const airfare = parseFloat(document.getElementById('airfare').value) || 0;
    const hotel = parseFloat(document.getElementById('hotel').value) || 0;
    const transportation = parseFloat(document.getElementById('transportation').value) || 0;
    const additionalCosts = airfare + hotel + transportation;

    // Apply indirect rate to both base cost and additional costs
    const indirectCost = (baseTotal + additionalCosts) * (indirectRate / 100);
    const markupCost = (baseTotal + additionalCosts + indirectCost) * (markupRate / 100);
    const subtotal = baseTotal + additionalCosts + indirectCost + markupCost;
    const grandTotal = subtotal;

    // Update display
    document.getElementById('baseCost').textContent = formatCurrency(baseTotal);
    document.getElementById('indirectCost').textContent = formatCurrency(indirectCost);
    document.getElementById('markupCost').textContent = formatCurrency(markupCost);
    document.getElementById('subtotal').textContent = formatCurrency(subtotal);
    document.getElementById('totalAmount').textContent = formatCurrency(grandTotal);
}// Create component row
function createComponentRow(component, programName, componentIndex) {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50 transition-colors';

    // Component name and description
    const tdComponent = document.createElement('td');
    tdComponent.className = 'px-6 py-4';
    const componentContainer = document.createElement('div');
    componentContainer.className = 'flex items-center gap-2';
    
    const componentName = document.createElement('div');
    componentName.className = 'text-sm font-medium text-slate-900';
    componentName.textContent = component.component;
    componentContainer.appendChild(componentName);
    
    // Add tooltip icon if description exists
    if (component.description) {
        const tooltipIcon = document.createElement('span');
        tooltipIcon.className = 'text-slate-400 hover:text-slate-600 cursor-help text-xs';
        tooltipIcon.innerHTML = 'ℹ️';
        tooltipIcon.title = component.description.replace(/\n/g, ' ');
        componentContainer.appendChild(tooltipIcon);
    }
    
    tdComponent.appendChild(componentContainer);
    tr.appendChild(tdComponent);

    // Staff hours
    const tdStaff = document.createElement('td');
    tdStaff.className = 'px-6 py-4';
    const staffHours = document.createElement('div');
    staffHours.className = 'flex flex-wrap gap-1';

    Object.entries(component.hours).forEach(([staff, hours]) => {
        if (hours > 0) {
            const badge = document.createElement('span');
            badge.className = 'inline-flex items-center px-2 py-1 rounded text-xs font-medium';
            if (staff === 'PLF') {
                badge.className += ' bg-primary-100 text-primary-800';
            } else if (staff === 'Program Coordinator') {
                badge.className += ' bg-secondary-100 text-secondary-800';
            } else if (staff === 'Director of Evaluation') {
                badge.className += ' bg-accent-100 text-accent-800';
            }

            badge.textContent = `${staff}: ${hours}h`;
            staffHours.appendChild(badge);
        }
    });

    tdStaff.appendChild(staffHours);
    tr.appendChild(tdStaff);

    // Quantity input
    const tdQuantity = document.createElement('td');
    tdQuantity.className = 'px-6 py-4';
    const input = document.createElement('input');
    input.type = 'number';
    input.className = 'w-16 px-2 py-1 text-sm border border-slate-300 rounded focus:border-primary-500 focus:ring-1 focus:ring-primary-500';
    input.min = '0';
    input.value = component.multiplier.toString();
    input.dataset.program = programName;
    input.dataset.component = componentIndex;

    input.addEventListener('input', (e) => {
        const quantity = parseInt(e.target.value) || 0;
        const cost = calculateComponentCost(component, quantity);
        const costCell = e.target.closest('tr').querySelector('.cost-cell');
        costCell.textContent = formatCurrency(cost);
        updateTotal();
    });

    tdQuantity.appendChild(input);
    tr.appendChild(tdQuantity);

    // Cost
    const tdCost = document.createElement('td');
    tdCost.className = 'px-6 py-4 cost-cell text-sm font-medium text-slate-900 text-right';
    tr.appendChild(tdCost);

    // Calculate initial cost
    const initialQuantity = parseInt(input.value) || 0;
    const initialCost = calculateComponentCost(component, initialQuantity);
    tdCost.textContent = formatCurrency(initialCost);

    return tr;
}

// Populate program selector
function populateProgramSelector() {
    const selector = document.getElementById('programSelector');

    Object.keys(programData).forEach(programName => {
        const option = document.createElement('option');
        option.value = programName;
        option.textContent = programName;
        selector.appendChild(option);
    });

    selector.addEventListener('change', (e) => {
        const selectedProgram = e.target.value;
        if (selectedProgram) {
            renderSelectedProgram(selectedProgram);
            document.getElementById('selectedProgramContainer').classList.remove('hidden');
        } else {
            document.getElementById('selectedProgramContainer').classList.add('hidden');
            document.getElementById('summaryPanel').classList.add('hidden');
            document.getElementById('emptyState').classList.remove('hidden');
        }
    });
}

// Render selected program
function renderSelectedProgram(programName) {
    const container = document.getElementById('programsContainer');
    container.innerHTML = ''; // Clear previous

    const components = programData[programName];

    const section = document.createElement('div');
    section.className = 'bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden program-section';

    // Header
    const header = document.createElement('div');
    header.className = 'bg-slate-800 px-6 py-4';
    header.innerHTML = `
        <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold text-white">${programName}</h3>
            <div class="text-lg font-semibold text-white" id="programTotal">$0.00</div>
        </div>
    `;
    section.appendChild(header);

    // Table
    const table = document.createElement('table');
    table.className = 'w-full';

    const thead = document.createElement('thead');
    thead.className = 'bg-slate-50';
    thead.innerHTML = `
        <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Component</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Staff & Hours</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Quantity</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Cost</th>
        </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    tbody.className = 'bg-white divide-y divide-slate-200';
    components.forEach((component, index) => {
        tbody.appendChild(createComponentRow(component, programName, index));
    });
    table.appendChild(tbody);

    section.appendChild(table);

    // Add travel note if program has travel components
    if (components.some(c => c.isTravel)) {
        const travelNote = document.createElement('div');
        travelNote.className = 'bg-amber-50 border-l-4 border-amber-400 p-4';
        travelNote.innerHTML = '<div class="flex"><div class="ml-3"><p class="text-sm text-amber-700"><strong>Note:</strong> Select only ONE travel level (Low, Mid, or High) based on your location.</p></div></div>';
        section.appendChild(travelNote);
    }

    container.appendChild(section);

    // Show summary panel and hide empty state
    document.getElementById('summaryPanel').classList.remove('hidden');
    document.getElementById('emptyState').classList.add('hidden');

    // Update total for initial values
    updateTotal();
}

// Export functionality
function exportToPDF() {
    const selectedProgram = document.getElementById('programSelector').value;
    if (!selectedProgram) {
        alert('Please select a program first');
        return;
    }

    let exportText = 'PRICING ESTIMATE\n\n';
    exportText += `Generated on: ${new Date().toLocaleDateString()}\n\n`;

    const section = document.querySelector('.program-section');
    const programName = section.querySelector('h3').textContent;
    const programTotal = section.querySelector('#programTotal').textContent;

    exportText += `${programName}\n${'='.repeat(60)}\n`;

    section.querySelectorAll('tbody tr').forEach(row => {
        const quantity = parseInt(row.querySelector('input[type="number"]').value) || 0;
        if (quantity > 0) {
            const component = row.querySelector('td:first-child div:first-child').textContent;
            const cost = row.querySelector('.cost-cell').textContent;
            exportText += `${component} (Qty: ${quantity}): ${cost}\n`;
        }
    });

    exportText += `\n${'='.repeat(60)}\n`;
    exportText += `Base Cost: ${document.getElementById('baseCost').textContent}\n`;
    exportText += `Additional Costs: $${((parseFloat(document.getElementById('airfare').value) || 0) + (parseFloat(document.getElementById('hotel').value) || 0) + (parseFloat(document.getElementById('transportation').value) || 0)).toFixed(2)}\n`;
    exportText += `Indirect Cost (${document.getElementById('indirectRate').value}% on Base + Additional): ${document.getElementById('indirectCost').textContent}\n`;
    exportText += `Markup (${document.getElementById('markup').value}%): ${document.getElementById('markupCost').textContent}\n`;
    exportText += `Subtotal: ${document.getElementById('subtotal').textContent}\n\n`;

    exportText += `Additional Cost Breakdown:\n`;
    exportText += `Airfare: $${(parseFloat(document.getElementById('airfare').value) || 0).toFixed(2)}\n`;
    exportText += `Hotel: $${(parseFloat(document.getElementById('hotel').value) || 0).toFixed(2)}\n`;
    exportText += `Transportation: $${(parseFloat(document.getElementById('transportation').value) || 0).toFixed(2)}\n`;

    const additionalTotal = (parseFloat(document.getElementById('airfare').value) || 0) +
                           (parseFloat(document.getElementById('hotel').value) || 0) +
                           (parseFloat(document.getElementById('transportation').value) || 0);
    exportText += `Additional Total: $${additionalTotal.toFixed(2)}\n\n`;

    exportText += `${'='.repeat(60)}\nGRAND TOTAL: ${document.getElementById('totalAmount').textContent}\n`;

    // Create download
    const blob = new Blob([exportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pricing-estimate-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Toggle instructions visibility
function toggleInstructions() {
    const content = document.getElementById('instructionsContent');
    const icon = document.getElementById('instructionsIcon');
    
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.classList.add('rotate-180');
    } else {
        content.classList.add('hidden');
        icon.classList.remove('rotate-180');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    populateProgramSelector();

    // Add event listeners for rate and markup inputs
    document.getElementById('indirectRate').addEventListener('input', updateTotal);
    document.getElementById('markup').addEventListener('input', updateTotal);

    // Add event listeners for additional cost inputs
    document.getElementById('airfare').addEventListener('input', updateTotal);
    document.getElementById('hotel').addEventListener('input', updateTotal);
    document.getElementById('transportation').addEventListener('input', updateTotal);
});
