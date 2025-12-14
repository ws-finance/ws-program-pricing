import { programData } from './data.js';
import { 
    loadTravelData, 
    onTravelToChange, 
    updateAirfarePreview, 
    calculateTravel, 
    applyTravelToSummary
} from './travel.js';
import { 
    appliedTravel,
    populateProgramSelector, 
    exportToPDF, 
    toggleInstructions, 
    toggleTravelInstructions,
    clearTravel,
    updateTotal
} from './ui.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
    // Populate program selector and load travel data
    populateProgramSelector(programData);
    await loadTravelData();

    // Wire up export button
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => exportToPDF(programData));
    }

    // Wire up instructions toggles
    const instructionsBtn = document.getElementById('instructionsBtn');
    if (instructionsBtn) {
        instructionsBtn.addEventListener('click', toggleInstructions);
    }

    const travelInstructionsBtn = document.getElementById('travelInstructionsBtn');
    if (travelInstructionsBtn) {
        travelInstructionsBtn.addEventListener('click', toggleTravelInstructions);
    }

    // Wire up travel calculator buttons
    const calculateBtn = document.getElementById('calculateTravelBtn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateTravel);
    }

    const applyBtn = document.getElementById('applyTravelBtn');
    if (applyBtn) {
        applyBtn.addEventListener('click', () => applyTravelToSummary(appliedTravel));
    }

    const clearBtn = document.getElementById('clearTravelBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearTravel);
    }

    const travelToEl = document.getElementById('travelTo');
    const travelFromEl = document.getElementById('travelFrom');
    const lodgingRegionEl = document.getElementById('lodgingRegion');

    if (travelToEl) {
        travelToEl.addEventListener('change', onTravelToChange);
    }
    if (travelFromEl) {
        travelFromEl.addEventListener('change', () => {
            onTravelToChange();
            updateAirfarePreview();
        });
    }
    if (lodgingRegionEl) {
        lodgingRegionEl.addEventListener('change', () => {
            onTravelToChange();
            calculateTravel();
        });
    }
});

export { appliedTravel };
