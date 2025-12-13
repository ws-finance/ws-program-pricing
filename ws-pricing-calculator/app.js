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
            hours: { PLF: 64, 'Program Coordinator': 8, 'Director of Evaluation': 0 }
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
            component: 'Launch Workshop',
            description: '2 hours (Delivery 2 hours Prep =8 hours (2x4) Prep ratio 4/1 Total = 10 hours)',
            multiplier: 1,
            hours:{PLF: 10  }
        },
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
    "Profile of a Graduate": [
        {
            component: 'DIY Kit',
            description: 'Supporting materials and directions for delivery - flat fee, no additional services',
            multiplier: 1,
            hours: {PLF:0, 'Program Coordinator': 0, 'Director of Evaluation':0},
            flatFee: 7500
        },
        {
            component: '1:1 Coaching',
            description: '10 hours of coaching in standard package \n (Prep ratio of 1.5/1)',
            multiplier: 10,
            hours: {PLF:2.5, 'Program Coordinator': 0, 'Director of Evaluation':0}

        },
        {
            component: 'Co-facilitation of listenting sessions',
            description: 'In-person 1 facilitator \n Session length 90 min + set up/tear down (2.5 hours) \n Prep ratio 4/1 = 1.5x4= 6 hours + 1 for set up for a total of 8.5',
            multiplier: 1,
            hours: {PLF: 8.5, 'Program Coordinator':0, 'Director of Evaluation':0},
        },
        {
            component: 'Profile of a learner Marketing and Design',
            description: 'Draft + Final, branded to school/district \n Flat fee of 2500',
            multiplier: 1,
            hours: {PLF:0, 'Program Coordinator': 0, 'Director of Evaluation':0},
            flatFee: 2500
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
    ]
};

// Flag to ensure summary panel listeners are only initialized once
let summaryPanelInitialized = false;

// Holds the user-applied travel totals (when Apply to Additional Costs is used)
let appliedTravel = {
    airfare: 0,
    lodging: 0,
    transport: 0,
    meals: 0
};

// DOM helper utilities to centralize defensive access
function el(id) { return document.getElementById(id); }
function show(id) { const e = el(id); if (e && e.classList) e.classList.remove('hidden'); }
function hide(id) { const e = el(id); if (e && e.classList) e.classList.add('hidden'); }
function setText(id, txt) { const e = el(id); if (e) e.textContent = txt; }
function setValue(id, val) { const e = el(id); if (e) e.value = val; }
function getNumber(id, fallback = 0) { const e = el(id); if (!e) return fallback; return (parseFloat(e.value) || fallback); }
function getString(id, fallback = '') { const e = el(id); if (!e) return fallback; return e.value; }

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

    // Apply indirect rate and markup (guard element access because
    // the summary panel may not exist yet in some timing scenarios)
    const indirectEl = el('indirectRate');
    const markupEl = el('markup');
    const indirectRate = indirectEl ? (parseFloat(indirectEl.value) || 0) : 0;
    const markupRate = markupEl ? (parseFloat(markupEl.value) || 0) : 0;

    // Add additional costs (guard each input; default to 0 if missing)
    // Prefer explicit input fields if present (legacy), otherwise use the
    // values the user applied from the travel calculator (appliedTravel).
    const airfareEl = el('airfare');
    const hotelEl = el('hotel');
    const transportationEl = el('transportation');
    const mealsEl = el('mealsPerDiem');
    const airfare = airfareEl ? (parseFloat(airfareEl.value) || 0) : (appliedTravel.airfare || 0);
    const hotel = hotelEl ? (parseFloat(hotelEl.value) || 0) : (appliedTravel.lodging || 0);
    const transportation = transportationEl ? (parseFloat(transportationEl.value) || 0) : (appliedTravel.transport || 0);
    const mealsPerDiem = mealsEl ? (parseFloat(mealsEl.value) || 0) : (appliedTravel.meals || 0);
    const additionalCosts = airfare + hotel + transportation + mealsPerDiem;

    // Update travel summary display if present
    const travelSummaryEl = el('travelSummary');
    if (travelSummaryEl) travelSummaryEl.textContent = formatCurrency(additionalCosts);

    // Update individual travel breakdown elements (guarded)
    const airfareSummaryEl = el('airfareSummary');
    const hotelSummaryEl = el('hotelSummary');
    const transportSummaryEl = el('transportSummary');
    const mealsSummaryEl = el('mealsSummary');
    if (airfareSummaryEl) airfareSummaryEl.textContent = formatCurrency(airfare);
    if (hotelSummaryEl) hotelSummaryEl.textContent = formatCurrency(hotel);
    if (transportSummaryEl) transportSummaryEl.textContent = formatCurrency(transportation);
    if (mealsSummaryEl) mealsSummaryEl.textContent = formatCurrency(mealsPerDiem);

    // Apply indirect and markup only to the base cost (travel/additional
    // costs are not subject to indirect or markup). Then add additional
    // costs to the final total after subtotal.
    const indirectCost = baseTotal * (indirectRate / 100);
    const markupCost = (baseTotal + indirectCost) * (markupRate / 100);
    const subtotal = baseTotal + indirectCost + markupCost;
    const grandTotal = subtotal + additionalCosts;

    // Update display (guard writes in case panel elements are not present)
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
}// Create component row
function createComponentRow(component, programName, componentIndex) {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50 transition-colors';

    if (component.isTravel) {
        tr.classList.add('bg-blue-50');
    }

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

            badge.textContent = `${staff}`;
            staffHours.appendChild(badge);
        }
    });

    tdStaff.appendChild(staffHours);
    tr.appendChild(tdStaff);

    // Quantity input
    const tdQuantity = document.createElement('td');
    tdQuantity.className = 'px-6 py-4';
    const qtyInput = document.createElement('input');
    qtyInput.type = 'number';
    qtyInput.className = 'quantity-input w-16 px-2 py-1 text-sm border border-slate-300 rounded focus:border-primary-500 focus:ring-1 focus:ring-primary-500';
    qtyInput.min = '0';
    // keep existing data model: component.multiplier currently holds the
    // default "quantity" value for the component (e.g. 120 for coaching).
    qtyInput.value = component.multiplier.toString();
    qtyInput.dataset.program = programName;
    qtyInput.dataset.component = componentIndex;

    tdQuantity.appendChild(qtyInput);
    tr.appendChild(tdQuantity);

    // Multiplier input (new column) - multiplies the quantity to compute cost
    const tdMultiplier = document.createElement('td');
    tdMultiplier.className = 'px-6 py-4';
    const multInput = document.createElement('input');
    multInput.type = 'number';
    multInput.className = 'multiplier-input w-16 px-2 py-1 text-sm border border-slate-300 rounded focus:border-primary-500 focus:ring-1 focus:ring-primary-500';
    multInput.min = '0';
    multInput.step = '1';
    // default multiplier is 1
    multInput.value = '1';
    // If this component is an evaluation item, disable the multiplier
    // to prevent users from changing it. Evaluation components should
    // have a fixed multiplier of 1.
    if (component.evaluation) {
        multInput.value = '1';
        multInput.disabled = true;
        multInput.title = 'Multiplier fixed for evaluation items';
        // visually indicate disabled state
        multInput.className += ' opacity-50 cursor-not-allowed';
        multInput.setAttribute('aria-disabled', 'true');
    }
    tdMultiplier.appendChild(multInput);
    tr.appendChild(tdMultiplier);

    // Cost
    const tdCost = document.createElement('td');
    tdCost.className = 'px-6 py-4 cost-cell text-sm font-medium text-slate-900 text-right';
    tr.appendChild(tdCost);

    // Helper to recompute cost for this row
    function recomputeRowCost() {
        const q = parseFloat(qtyInput.value) || 0;
        const m = parseFloat(multInput.value) || 1;
        const effectiveQty = q * m;
        const cost = calculateComponentCost(component, effectiveQty);
        tdCost.textContent = formatCurrency(cost);
        updateTotal();
    }

    // Wire inputs
    qtyInput.addEventListener('input', recomputeRowCost);
    multInput.addEventListener('input', recomputeRowCost);

    // Calculate initial cost
    recomputeRowCost();

    return tr;
}

// Populate program selector
function populateProgramSelector() {
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
            renderSelectedProgram(selectedProgram);
            show('selectedProgramContainer');
        } else {
            hide('selectedProgramContainer');
            hide('summaryPanel');
            show('emptyState');
        }
    });
}

// Render selected program
function renderSelectedProgram(programName) {
    const container = el('programsContainer');
    container.innerHTML = ''; // Clear previous

    // Show summary panel and hide empty state
    show('summaryPanel');
    hide('emptyState');

    // Reset travel form (guard each element because summary panel may be
    // missing in some render/timing/CSP scenarios in certain browsers)
    const travelFromEl = el('travelFrom');
    const travelToEl = el('travelTo');
    const travelPerDiemEl = el('travelPerDiem');
    const travelTripsEl = el('travelTrips');
    const travelDaysEl = el('travelDays');
    const travelPLFsEl = el('travelPLFs');
    const travelGroundEl = el('travelGroundPerDay');
    const lodgingRegionEl = el('lodgingRegion');
    if (travelFromEl) travelFromEl.selectedIndex = 0;
    if (travelToEl) travelToEl.selectedIndex = 0;
    if (travelPerDiemEl) travelPerDiemEl.value = defaultPerDiem;
    if (travelTripsEl) travelTripsEl.value = 1;
    if (travelDaysEl) travelDaysEl.value = 1;
    if (travelPLFsEl) travelPLFsEl.value = 1;
    if (travelGroundEl) travelGroundEl.value = defaultGround;
    if (lodgingRegionEl) lodgingRegionEl.checked = false;
    if (typeof onTravelToChange === 'function' && (travelToEl || travelFromEl || lodgingRegionEl)) onTravelToChange();
    if (typeof calculateTravel === 'function' && (travelFromEl || travelToEl)) calculateTravel();
    // Do not auto-apply travel totals into the summary here; wait for the
    // user to confirm via the "Apply to Additional Costs" button. This
    // avoids attempting to write into summary inputs before their
    // listeners/initialization are complete.


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
            <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Staff</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Quantity</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Multiplier</th>
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
    show('summaryPanel');
    hide('emptyState');

    // Initialize summary panel listeners once (safely after panel exists)
    if (!summaryPanelInitialized) initializeSummaryPanel();

    // Update total for initial values
    updateTotal();
}

// Export functionality
function exportToPDF() {
    const selectedProgram = getString('programSelector');
    if (!selectedProgram) {
        alert('Please select a program first');
        return;
    }

    let exportText = 'PRICING ESTIMATE\n\n';
    exportText += `Generated on: ${new Date().toLocaleDateString()}\n\n`;

    const section = document.querySelector('.program-section');
    const programName = section ? (section.querySelector('h3')?.textContent || 'Program') : 'Program';
    const programTotal = section ? (section.querySelector('#programTotal')?.textContent || '$0.00') : '$0.00';

    exportText += `${programName}\n${'='.repeat(60)}\n`;

    section.querySelectorAll('tbody tr').forEach(row => {
        const qtyEl = row.querySelector('.quantity-input');
        const multEl = row.querySelector('.multiplier-input');
        const quantity = parseFloat(qtyEl?.value) || 0;
        const multiplier = parseFloat(multEl?.value) || 1;
        if (quantity > 0) {
            const component = row.querySelector('td:first-child div:first-child').textContent;
            const cost = row.querySelector('.cost-cell').textContent;
            exportText += `${component} (Qty: ${quantity} × ${multiplier}): ${cost}\n`;
        }
    });

    exportText += `\n${'='.repeat(60)}\n`;
    exportText += `Base Cost: ${el('baseCost')?.textContent || '$0.00'}\n`;
    // Safely read additional costs: prefer explicit inputs if present, else
    // fallback to appliedTravel values filled by the Apply action.
    const airfareVal = getNumber('airfare', appliedTravel.airfare || 0) || appliedTravel.airfare || 0;
    const hotelVal = getNumber('hotel', appliedTravel.lodging || 0) || appliedTravel.lodging || 0;
    const transportVal = getNumber('transportation', appliedTravel.transport || 0) || appliedTravel.transport || 0;
    const mealsVal = getNumber('mealsPerDiem', appliedTravel.meals || 0) || appliedTravel.meals || 0;
    const additionalTotal = airfareVal + hotelVal + transportVal + mealsVal;

    exportText += `Additional Costs: $${additionalTotal.toFixed(2)}\n`;
    exportText += `Indirect Cost (${el('indirectRate')?.value || 0}% on Base): ${el('indirectCost')?.textContent || '$0.00'}\n`;
    exportText += `Markup (${el('markup')?.value || 0}% on Base+Indirect): ${el('markupCost')?.textContent || '$0.00'}\n`;
    exportText += `Subtotal (Base + Indirect + Markup): ${el('subtotal')?.textContent || '$0.00'}\n\n`;

    exportText += `Additional Cost Breakdown:\n`;
    exportText += `Airfare: $${airfareVal.toFixed(2)}\n`;
    exportText += `Hotel: $${hotelVal.toFixed(2)}\n`;
    exportText += `Transportation: $${transportVal.toFixed(2)}\n`;
    exportText += `Meals / Per Diem: $${mealsVal.toFixed(2)}\n`;
    exportText += `Additional Total: $${additionalTotal.toFixed(2)}\n\n`;

    exportText += `${'='.repeat(60)}\nGRAND TOTAL: ${el('totalAmount')?.textContent || '$0.00'}\n`;

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

// Toggle travel instructions dropdown
function toggleTravelInstructions() {
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Populate program selector and load travel data. Event listeners for
    // inputs inside the summary panel are attached lazily the first time
    // the panel is shown (see initializeSummaryPanel).
    populateProgramSelector();
    loadTravelData();
});

// Initialize all event listeners that depend on the summary panel being
// present in the DOM. This is called once when a program is selected and
// the summary panel is first displayed.
function initializeSummaryPanel() {
    if (summaryPanelInitialized) return;

    // Add event listeners for rate and markup inputs
    const indirectEl = el('indirectRate');
    const markupEl = el('markup');
    if (indirectEl) indirectEl.addEventListener('input', updateTotal);
    if (markupEl) markupEl.addEventListener('input', updateTotal);

    // Add event listeners for additional cost inputs
    const airfareEl = el('airfare');
    const hotelEl = el('hotel');
    const transportEl = el('transportation');
    const mealsEl = el('mealsPerDiem');
    if (airfareEl) airfareEl.addEventListener('input', updateTotal);
    if (hotelEl) hotelEl.addEventListener('input', updateTotal);
    if (transportEl) transportEl.addEventListener('input', updateTotal);
    if (mealsEl) mealsEl.addEventListener('input', updateTotal);

    // Wire up travel calculator controls (they live inside the summary panel)
    const calcBtn = el('calculateTravelBtn');
    const applyBtn = el('applyTravelBtn');
    const travelTo = el('travelTo');
    const travelFrom = el('travelFrom');
    const lodgingRegionSelect = el('lodgingRegion');

    if (calcBtn) calcBtn.addEventListener('click', calculateTravel);
    if (applyBtn) applyBtn.addEventListener('click', applyTravelToSummary);
    const clearBtn = el('clearTravelBtn');
    if (clearBtn) clearBtn.addEventListener('click', clearTravel);
    if (travelTo) travelTo.addEventListener('change', onTravelToChange);
    if (travelFrom) travelFrom.addEventListener('change', () => { onTravelToChange(); updateAirfarePreview(); });
    if (lodgingRegionSelect) lodgingRegionSelect.addEventListener('change', () => { onTravelToChange(); calculateTravel(); });

    summaryPanelInitialized = true;
}

// Clear applied travel totals (does not change the travel input fields)
function clearTravel() {
    appliedTravel.airfare = 0;
    appliedTravel.lodging = 0;
    appliedTravel.transport = 0;
    appliedTravel.meals = 0;

    // Clear datasets on calculate button (if present)
    const calcBtn = el('calculateTravelBtn');
    if (calcBtn) {
        calcBtn.dataset.airfare = '0';
        calcBtn.dataset.lodging = '0';
        calcBtn.dataset.transport = '0';
        calcBtn.dataset.perdiem = '0';
    }

    // Update UI spans to zero
    const airfareSummaryEl = el('airfareSummary');
    const hotelSummaryEl = el('hotelSummary');
    const transportSummaryEl = el('transportSummary');
    const mealsSummaryEl = el('mealsSummary');
    const travelSummaryEl = el('travelSummary');
    const travelTotalEl = el('travelTotal');
    if (airfareSummaryEl) airfareSummaryEl.textContent = formatCurrency(0);
    if (hotelSummaryEl) hotelSummaryEl.textContent = formatCurrency(0);
    if (transportSummaryEl) transportSummaryEl.textContent = formatCurrency(0);
    if (mealsSummaryEl) mealsSummaryEl.textContent = formatCurrency(0);
    if (travelSummaryEl) travelSummaryEl.textContent = formatCurrency(0);
    if (travelTotalEl) travelTotalEl.textContent = formatCurrency(0);

    updateTotal();
}

// --- Travel calculator implementation ---
let travelRates = [];
let lodgingDefaults = {};
let defaultPerDiem = 100;
let defaultGround = 100;

function parseMoney(str) {
    if (!str) return 0;
    return parseFloat(str.toString().replace(/[$,\s\"]/g, '')) || 0;
}

async function loadTravelData() {
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

function populateTravelSelectors() {
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

    // default per diem and ground (guard elements)
    const travelPerDiemEl = el('travelPerDiem');
    const travelGroundEl = el('travelGroundPerDay');
    if (travelPerDiemEl) travelPerDiemEl.value = defaultPerDiem;
    if (travelGroundEl) travelGroundEl.value = defaultGround;

    // initial calc (do not attach DOM listeners here; they are attached
    // lazily when the summary panel is first shown via
    // initializeSummaryPanel())
    calculateTravel();
}

function onTravelToChange() {
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

function updateAirfarePreview() {
    const travelFromEl = el('travelFrom');
    const travelToEl = el('travelTo');
    const airfarePreviewEl = el('travelAirfarePerTrip');
    if (!travelFromEl || !travelToEl || !airfarePreviewEl) return;
    const from = travelFromEl.value;
    const to = travelToEl.value;
    const rate = travelRates.find(r => r.from === from && r.to === to);
    const perTrip = rate ? rate.amount : 0;
    airfarePreviewEl.textContent = formatCurrency(perTrip);
}

function calculateTravel() {
    const travelFromEl = el('travelFrom');
    const travelToEl = el('travelTo');
    const perDiemEl = el('travelPerDiem');
    const tripsEl = el('travelTrips');
    const daysEl = el('travelDays');
    const plfsEl = el('travelPLFs');
    const lodgingPerNightEl = el('travelLodgingPerNight');
    const groundPerDayEl = el('travelGroundPerDay');

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

    // find airfare amount
    const rate = travelRates.find(r => r.from === from && r.to === to);
    const airfarePerTrip = rate ? rate.amount : 0;

    const airfareTotal = airfarePerTrip * trips * plfs;
    const perDiemTotal = perDiem * (days + 1) * trips * plfs; // Per diem is for nights + 1
    const lodgingTotal = lodgingPerNight * days * trips * plfs;
    const groundTotal = groundPerDay * days * trips * plfs;

    const total = airfareTotal + perDiemTotal + lodgingTotal + groundTotal;

    const travelTotalEl = el('travelTotal');
    if (travelTotalEl) travelTotalEl.textContent = formatCurrency(total);

    // also show a preview of airfare/lodging/transport in small attributes
    const calcBtn = el('calculateTravelBtn');
    if (calcBtn) {
        calcBtn.dataset.airfare = airfareTotal.toFixed(2);
        calcBtn.dataset.lodging = lodgingTotal.toFixed(2);
        calcBtn.dataset.transport = groundTotal.toFixed(2);
        calcBtn.dataset.perdiem = perDiemTotal.toFixed(2);
    }
    // update airfare per-trip preview
    const airfarePreviewEl = el('travelAirfarePerTrip');
    if (airfarePreviewEl) airfarePreviewEl.textContent = formatCurrency(airfarePerTrip);
}

function applyTravelToSummary() {
    // Read calculated totals from the Calculate button dataset and store them
    // in the appliedTravel object. Then update the visible summary lines and
    // recalc totals.
    const calcBtn = el('calculateTravelBtn');
    const airfareTotal = parseFloat(calcBtn?.dataset.airfare) || 0;
    const lodgingTotal = parseFloat(calcBtn?.dataset.lodging) || 0;
    const transportTotal = parseFloat(calcBtn?.dataset.transport) || 0;
    const perDiemTotal = parseFloat(calcBtn?.dataset.perdiem) || 0;

    appliedTravel.airfare = airfareTotal;
    appliedTravel.lodging = lodgingTotal;
    appliedTravel.transport = transportTotal;
    appliedTravel.meals = perDiemTotal;

    // Update summary display spans (they will be used by updateTotal too)
    const airfareSummaryEl = el('airfareSummary');
    const hotelSummaryEl = el('hotelSummary');
    const transportSummaryEl = el('transportSummary');
    const mealsSummaryEl = el('mealsSummary');
    const travelSummaryEl = el('travelSummary');
    if (airfareSummaryEl) airfareSummaryEl.textContent = formatCurrency(airfareTotal);
    if (hotelSummaryEl) hotelSummaryEl.textContent = formatCurrency(lodgingTotal);
    if (transportSummaryEl) transportSummaryEl.textContent = formatCurrency(transportTotal);
    if (mealsSummaryEl) mealsSummaryEl.textContent = formatCurrency(perDiemTotal);
    if (travelSummaryEl) travelSummaryEl.textContent = formatCurrency(airfareTotal + lodgingTotal + transportTotal + perDiemTotal);

    updateTotal();
}
