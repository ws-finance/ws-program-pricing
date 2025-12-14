## Where to look in the app
- The Travel Calculator is in the left panel under **Travel Calculator**.
- Key fields you may use:
  - `Airfare ($ per trip)` — the airfare amount for one trip (you can type a number here).
  - `# of flights` — how many flights each staff member takes per trip (for example 2 for a round-trip).
  - `Trips per person` — how many trips each staff member will make.
  - `Staff needed` — how many staff members will travel.
  - `Nights lodging` — number of nights per trip.
  - `Per Diem ($/day)` — the daily meal/incidentals rate.
  - `Lodging per night ($)` — hotel cost per night.
  - `Ground transport per person/day ($)` — local transport per day per person.
  - `# of Additional Trips` and `Avg. # of nights per Additional Trip` — extra trips (e.g., follow-up visits) and their average nights.

Buttons you will press:
- `Calculate Travel` — compute the travel totals from the numbers you entered.
- `Apply to Additional Costs` — copy the travel totals into the summary panel for the final estimate.
- `Clear Travel` — reset the travel fields and previews to zero.

---

## The simple idea
Each travel cost in the calculator is the result of multiplying: how many people (and trips) × how long (nights/days) × the price per person or per night/day. Then the calculator adds up the pieces (airfare, hotel, ground, meals, mileage) to show a travel total.

Here’s how each piece is built step-by-step.

### 1) Airfare (plane tickets)
- Airfare per trip: you can type the price in `Airfare ($ per trip)` or let the app fill it automatically from origin/destination. If you type a number, the app uses that number.
- Number of airfare tickets included in the calculation = `# of flights` × `Staff needed`.
- Airfare total = `Airfare ($ per trip)` × `# of flights` × `Staff needed`.

Example: Airfare $300, `# of flights` = 2 (round-trip), `Staff needed` = 2 → Airfare total = $300 × 2 × 2 = $1,200.

### 2) Lodging (hotel)
- Lodging per trip per person = `Lodging per night ($)` × `Nights lodging`.
- If each person makes more than one trip, multiply by `Trips per person`.
- Lodging total = `Lodging per night ($)` × `Nights lodging` × `Trips per person` × `Staff needed`.

Example: $275/night, 2 nights, 1 trip per person, 2 staff → $275 × 2 × 1 × 2 = $1,100.

### 3) Ground transport (local travel like taxis or shuttles)
- Ground transport per trip per person = `Ground transport per person/day ($)` × `Nights lodging`.
- Ground transport total = `Ground transport per person/day ($)` × `Nights lodging` × `Trips per person` × `Staff needed`.

Example: $100/day, 2 nights, 1 trip per person, 2 staff → $100 × 2 × 1 × 2 = $400.

### 4) Meals / Per Diem
- The app treats per-diem as applying to days away, and follows the common practice of giving an additional day for travel.
- Per-person per-trip per-diem = `Per Diem ($/day)` × (`Nights lodging` + 1).
- Per-diem total = `Per Diem ($/day)` × (`Nights lodging` + 1) × `Trips per person` × `Staff needed`.

Example: $100/day, 2 nights → per-person per-trip = $100 × (2 + 1) = $300. For 2 staff → $300 × 2 = $600.

### 5) Car travel / Mileage
- The calculator includes `# of miles driven for car travel` and an IRS mileage rate (the dollar per mile).
- In this app the mileage rate field is shown but disabled (gray) by default; it can be adjusted in settings if needed.
- Car mileage total = `# of miles driven` × `IRS Mileage Rate` × `Trips per person` × `Staff needed`.

Important note about carpooling: because staff often carpool, the app treats the `# of miles driven` value as the *total miles for the trip* (not miles per person). That means we do NOT multiply mileage by the number of staff. Instead, the mileage total is the trip miles times the rate, and then multiplied only by the number of trips.

Car mileage total = `# of miles driven` × `IRS Mileage Rate` × `Trips per person`.

Example: 50 miles × $0.70/mile × 1 trip = $35.

### 6) Additional Trips (follow-up or extra visits)
- Each additional trip is treated like a smaller trip that still needs lodging, ground, per-diem, and any car mileage.
- Cost per additional trip per person =
  - `Lodging per night ($)` × `Avg. # of nights per Additional Trip`
  - + `Ground transport per person/day ($)` × `Avg. # of nights per Additional Trip`
  - + `Per Diem ($/day)` × (`Avg. # of nights per Additional Trip` + 1)
  - + any car mileage for that trip (miles × rate). Note: car mileage is treated as trip-level miles (so it is not automatically multiplied by staff because staff may carpool). If the miles you enter are per-person, tell the app's user to enter the per-person value or we can change the app logic.
- Total additional trips cost = Cost per additional trip per person × `# of Additional Trips` × `Staff needed`.

Example: 1 additional trip, 1 night average, lodging $275, ground $100/day, per diem $100/day, 2 staff
- Cost per person = $275 × 1 + $100 × 1 + $100 × (1 + 1) = $275 + $100 + $200 = $575
- Total additional trips = $575 × 1 × 2 staff = $1,150

### 7) Grand travel total
Add up Airfare + Lodging + Ground + Per Diem + Car Mileage + Additional Trips = Estimated Travel Total.

The right-side preview shows:
- `Airfare per trip` — the airfare number used in calculations
- `Estimated Travel Total` — the grand total described above

When you click `Apply to Additional Costs`, the app copies the detailed totals into the estimate summary on the left so the travel costs are included in the final estimate.

---

## Short worked example (all together)
Imagine 2 staff will each make 1 trip. Each trip has:
- Airfare = $300 per trip
- # of flights = 2 (round-trip)
- Nights lodging = 2
- Lodging per night = $275
- Ground per day = $100
- Per Diem = $100/day
- No car miles

Calculations:
- Airfare total: $300 × 2 flights × 2 staff = $1,200
- Lodging total: $275 × 2 nights × 1 trip × 2 staff = $1,100
- Ground total: $100 × 2 nights × 1 trip × 2 staff = $400
- Per diem total: $100 × (2 + 1) days × 1 trip × 2 staff = $600
- Car mileage total: $0
- Grand travel total = $1,200 + $1,100 + $400 + $600 = $3,300

If you also had 1 additional trip per person averaging 1 night, add $575 × 2 staff = $1,150 more (see Additional Trips example above) → new grand total $4,450.

---

## Useful tips
- If you only need a very rough number, change only the big items: `Airfare`, `Staff needed`, and `Nights lodging`. The rest can use the defaults.
- If you want the tool to use the airfare it finds automatically from origin/destination, leave the `Airfare` field empty. If you have a specific quote, type that number to override the automatic value.
- Use `Trips per person` when staff go more than once. If each staff member takes two separate visits, set `Trips per person` to 2.
- Click `Calculate Travel` after changing numbers to see the updated preview. Click `Apply to Additional Costs` when you want travel included in your final estimate.

---

## Troubleshooting / FAQ
- Q: "I typed a number in Airfare but the preview still shows $0.00."
  - A: Make sure you clicked `Calculate Travel`. The preview updates when you type and when you press Calculate.
- Q: "Why does per diem use `nights + 1`?"
  - A: Per diem usually covers meals while traveling and often includes a travel day; `nights + 1` is a standard simple rule to cover that extra day.
- Q: "Are additional trips multiplied by staff?"
  - A: Yes. If you have 2 staff and 1 additional trip, the cost for that one trip is charged for each staff member.
- Q: "The mileage fields are gray (disabled). How do I change the mileage rate?"
  - A: The field is shown as read-only by default. It is based on the prevailing IRS mileage rate.