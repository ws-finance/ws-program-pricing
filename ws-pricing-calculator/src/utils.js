import { hourlyRates } from './data.js';

// DOM helper utilities
export function el(id) {
    return document.getElementById(id);
}

export function show(id) {
    const e = el(id);
    if (e && e.classList) e.classList.remove('hidden');
}

export function hide(id) {
    const e = el(id);
    if (e && e.classList) e.classList.add('hidden');
}

export function setText(id, txt) {
    const e = el(id);
    if (e) e.textContent = txt;
}

export function setValue(id, val) {
    const e = el(id);
    if (e) e.value = val;
}

export function getNumber(id, fallback = 0) {
    const e = el(id);
    if (!e) return fallback;
    return (parseFloat(e.value) || fallback);
}

export function getString(id, fallback = '') {
    const e = el(id);
    if (!e) return fallback;
    return e.value;
}

// Calculate cost for a component
export function calculateComponentCost(component, quantity) {
    if (quantity === 0) return 0;
    
    // If component has a flat fee, use it
    if (component.flatFee !== undefined) {
        return component.flatFee * quantity;
    }
    
    let totalCost = 0;
    Object.entries(component.hours).forEach(([staff, hours]) => {
        if (hours > 0) {
            totalCost += hours * hourlyRates[staff] * quantity;
        }
    });
    
    return totalCost;
}

// Format currency
export function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }).format(amount);
}
