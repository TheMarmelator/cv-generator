/* ======================== BUTTONS ======================== */

const languageButton = document.getElementById('language-button');
const downloadButton = document.getElementById('download-button');
const themeButton = document.getElementById('theme-button');

/* ======================== VARIABLE VALUES ================== */

let currentLang = document.documentElement.lang;
let darkTheme = 'dark-theme';
let darkMode = localStorage.getItem("dark-mode");

/* ======================== FUNCTIONS ======================== */

const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show-menu');
        });
    }
}

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}

async function interpolateStrings(lang) {
    const response = await fetch(`template/${lang}.json`);
    const translations = await response.json();

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.getAttribute("data-i18n");
        const textTemplate = translations[key];

        if (textTemplate) {
            element.textContent = textTemplate;
        }
    });
}

function changeLanguage() {
    if (currentLang === "en") {
        currentLang = "de";
    } else {
        currentLang = "en";
    }
    document.documentElement.lang = currentLang;
    interpolateStrings(currentLang.toUpperCase());
}

function enableDarkMode() {
    document.body.classList.add(darkTheme);
    themeButton.classList.add('fa-sun');
    themeButton.classList.remove('fa-moon');
    localStorage.setItem("dark-mode", "enabled");
};

function disableDarkMode() {
    document.body.classList.remove(darkTheme);
    themeButton.classList.add('fa-moon');
    themeButton.classList.remove('fa-sun');
    localStorage.setItem("dark-mode", "disabled");
};

function addScaleCV() {
    document.body.classList.add("scale-cv");
}

function removeScaleCV() {
    document.body.classList.remove("scale-cv");
}

function generateResume() {
    const areaCV = document.getElementById('area-cv');
    const opt = {
        margin: 0,
        filename: `IsaacRileyCV_${currentLang.toUpperCase()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 4, useCORS: true },
        jsPDF: { format: 'a4', orientation: 'portrait' }
    };
    html2pdf(areaCV, opt);
}

/* ======================== EVENT LISTENERS ======================== */

languageButton.addEventListener("click", changeLanguage);

themeButton.addEventListener("click", () => {
    darkMode = localStorage.getItem("dark-mode");
    if (darkMode === "disabled") {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});

downloadButton.addEventListener("click", () => {
    addScaleCV();
    generateResume();
    setTimeout(removeScaleCV, 1000);
});

/* ======================== SETUP ======================== */

showMenu('nav-toggle', 'nav-menu');

interpolateStrings(currentLang.toUpperCase());

if (darkMode === "enabled") {
    enableDarkMode();
}
