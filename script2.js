const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');

// Dark Mode
function darkMode(){
    nav.style.backgroundColor = 'rgb(0 0 0 / 50%)';
    toggleIcon.children[0].textContent = "Dark Mode";
    toggleIcon.children[1].classList.remove('fa-sun');
    toggleIcon.children[1].classList.add('fa-moon');
}

// Light mode
function lightMode(){
    nav.style.backgroundColor = 'rgb(255 255 255 / 50%)';
    toggleIcon.children[0].textContent = "Light Mode";
    toggleIcon.children[1].classList.remove('fa-moon');
    toggleIcon.children[1].classList.add('fa-sun');
}

// switch theme dynamically
switchTheme = (event) => {
    if(event.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        darkMode();
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        lightMode();
    }
}

// event listener
toggleSwitch.addEventListener('change', switchTheme);

// Check local storage for theme
const currentTheme = localStorage.getItem('theme');
if(currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if(currentTheme === 'dark'){
        toggleSwitch.checked = true;
        darkMode();
    }
}