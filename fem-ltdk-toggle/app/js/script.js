document.addEventListener('DOMContentLoaded', () => {

    const darkRadio = document.getElementById('dark');
    const lightRadio = document.getElementById('light');
    const fieldset = document.querySelector('.header__toggle');
    const body = document.body;
    const STORAGE_KEY = 'themePreference';

    function setTheme(theme) {
        // Remove both classes first to ensure only one is active
        body.classList.remove('light', 'dark');

        if (theme === 'dark') {
            body.classList.add('dark');
        } else {
            body.classList.add('light');
        }

        fieldset.setAttribute('aria-label', `Theme selected: ${theme} mode`);
    }

    function loadUserPreference() {
        const savedTheme = localStorage.getItem(STORAGE_KEY);

        if (savedTheme) {
            // Apply saved theme and check the correct radio button
            setTheme(savedTheme);
            if (savedTheme === 'dark') {
                darkRadio.checked = true;
            } else {
                lightRadio.checked = true;
            }
        } else {
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const initialTheme = systemPrefersDark ? 'dark' : 'light';

            setTheme(initialTheme);
            if (systemPrefersDark) {
                darkRadio.checked = true;
            } else {
                lightRadio.checked = true;
            }
        }
    }

    // Function to handle the theme change when a radio button is clicked
    function handleThemeChange(event) {
        const selectedTheme = event.target.id; // 'dark' or 'light'
        localStorage.setItem(STORAGE_KEY, selectedTheme);
        setTheme(selectedTheme);
    }

    darkRadio.addEventListener('change', handleThemeChange);
    lightRadio.addEventListener('change', handleThemeChange);

    loadUserPreference();
});
