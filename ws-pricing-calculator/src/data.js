export const hourlyRates = {
    'PLF': 54.28,
    'Program Coordinator': 38.82,
    'Director of Evaluation': 62.08
};
export const airfareRates = [
    { from: 'Local travel/no travel', to: 'Local travel/no travel', amount: 0, lodgingPerNight: 0 },
    { from: 'West Coast', to: 'Midwest', amount: 800, lodgingPerNight: 275 },
    { from: 'West Coast', to: 'Mountain West', amount: 250, lodgingPerNight: 275 },
    { from: 'Midwest', to: 'East Coast', amount: 700, lodgingPerNight: 375 },
    { from: 'Midwest', to: 'South', amount: 500, lodgingPerNight: 275 },
    { from: 'Midwest', to: 'West Coast', amount: 800, lodgingPerNight: 375 },
    { from: 'Midwest', to: 'Mountain West', amount: 250, lodgingPerNight: 275 },
    { from: 'Midwest', to: 'Midwest', amount: 250, lodgingPerNight: 275 },
    { from: 'Southeast', to: 'Midwest', amount: 600, lodgingPerNight: 275 },
    { from: 'East Coast', to: 'East Coast', amount: 250, lodgingPerNight: 275 },
    { from: 'US', to: 'International', amount: 1750, lodgingPerNight: 375 }
];

// Program data parsed from Pricing - Hourly Estimates.csv
export const programData = {
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