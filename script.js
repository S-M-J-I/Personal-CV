const app = document.getElementById('app');
const viewSlider = document.querySelector('.view-slider');
const toAcademicBtn = document.getElementById('to-academic');
const toProfessionalBtn = document.getElementById('to-professional');

// State
let currentView = 'professional'; // 'professional' or 'academic'

// Functions
function switchToAcademic() {
    viewSlider.style.transform = 'translateX(-50%)'; // Slide to show right half (Academic)
    currentView = 'academic';
}

function switchToProfessional() {
    viewSlider.style.transform = 'translateX(0)'; // Slide to show left half (Professional)
    currentView = 'professional';
}

// Event Listeners
if (toAcademicBtn) {
    toAcademicBtn.addEventListener('click', (e) => {
        e.preventDefault();
        switchToAcademic();
    });
}

if (toProfessionalBtn) {
    toProfessionalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        switchToProfessional();
    });
}