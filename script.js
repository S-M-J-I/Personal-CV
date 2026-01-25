const app = document.getElementById('app');
const viewSlider = document.querySelector('.view-slider');
const toAcademicBtn = document.getElementById('to-academic');
const toProfessionalBtn = document.getElementById('to-professional');

// State
let currentView = 'professional'; // 'professional' or 'academic'

// PDF Paths
const PROFESSIONAL_CV_PATH = './assets/cvs/0_S M Jishanul Islam_SWE_tailored_Resume.pdf';
const ACADEMIC_CV_PATH = './assets/cvs/0_S M Jishanul Islam_CV_General.pdf';

// Functions
function switchToAcademic() {
    viewSlider.style.transform = 'translateX(-50%)'; // Slide to show right half (Academic)
    currentView = 'academic';
}

function switchToProfessional() {
    viewSlider.style.transform = 'translateX(0)'; // Slide to show left half (Professional)
    currentView = 'professional';
}

function printFile(url) {
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.src = url;

    // Append to body
    document.body.appendChild(iframe);

    // Wait for load then print
    iframe.onload = function () {
        try {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
        } catch (e) {
            console.error("Print failed", e);
            // Fallback: Open in new window if iframe print fails (e.g. some cross-origin restrictions)
            window.open(url, '_blank');
        } finally {
            // Clean up after interaction (timeout to ensure print dialog launched)
            setTimeout(() => {
                document.body.removeChild(iframe);
            }, 2000);
        }
    };
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

// Intercept Ctrl+P / Cmd+P
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault(); // Stop default print dialog

        if (currentView === 'professional') {
            printFile(PROFESSIONAL_CV_PATH);
        } else {
            printFile(ACADEMIC_CV_PATH);
        }
    }
});