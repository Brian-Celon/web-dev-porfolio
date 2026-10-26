// Back to Portfolio Button
// Include this script on any project page to add a floating button
// that links back to the Projects section of the main portfolio page.
(function () {
    // Resolve the portfolio index.html relative to this script's own location,
    // so it works no matter how deeply the project page is nested.
    const current_script = document.currentScript;
    const portfolio_url = current_script
        ? new URL('index.html#projects_section', current_script.src).href
        : '/index.html#projects_section';

    function add_back_button() {
        if (document.getElementById('back_to_portfolio_button')) return;

        const back_button = document.createElement('a');
        back_button.id = 'back_to_portfolio_button';
        back_button.href = portfolio_url;
        back_button.textContent = '\u2190 Back to Portfolio';
        back_button.setAttribute('aria-label', 'Back to main portfolio page');

        // Inline styles so the button looks the same on every project page
        // regardless of that page's own stylesheet.
        Object.assign(back_button.style, {
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            zIndex: '9999',
            padding: '10px 18px',
            backgroundColor: '#333333',
            color: '#ffffff',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            fontSize: '14px',
            fontWeight: '500',
            lineHeight: '1.2',
            textDecoration: 'none',
            borderRadius: '999px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
            transition: 'background-color 0.3s ease, transform 0.3s ease'
        });

        back_button.addEventListener('mouseenter', function () {
            back_button.style.backgroundColor = '#000000';
            back_button.style.transform = 'translateY(-2px)';
        });
        back_button.addEventListener('mouseleave', function () {
            back_button.style.backgroundColor = '#333333';
            back_button.style.transform = 'translateY(0)';
        });

        document.body.appendChild(back_button);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', add_back_button);
    } else {
        add_back_button();
    }
})();
