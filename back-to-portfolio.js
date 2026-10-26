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

        const is_inside_iframe = (window.self !== window.top);

        const back_button = document.createElement('a');
        back_button.id = 'back_to_portfolio_button';
        back_button.href = portfolio_url;
        back_button.textContent = '\u2190 Back to Portfolio';
        back_button.setAttribute('aria-label', 'Back to main portfolio page');

        // Target the top window so it never opens inside an iframe
        back_button.target = '_top';

        // Inline styles so the button looks the same on every project page
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
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
            cursor: 'pointer',
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

        // If clicked inside the portfolio preview modal iframe,
        // close the preview modal and return to normal portfolio view!
        back_button.addEventListener('click', function (e) {
            if (is_inside_iframe) {
                e.preventDefault();

                // 1. Send postMessage to parent window
                try {
                    window.parent.postMessage({ action: 'close_preview_modal' }, '*');
                } catch (err) {}

                // 2. Direct parent function call if same-origin
                try {
                    if (window.parent && typeof window.parent.close_preview_modal === 'function') {
                        window.parent.close_preview_modal();
                        return;
                    }
                } catch (err) {}

                // 3. Top window navigation fallback
                try {
                    window.top.location.href = portfolio_url;
                } catch (err) {
                    window.location.href = portfolio_url;
                }
            }
        });

        document.body.appendChild(back_button);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', add_back_button);
    } else {
        add_back_button();
    }
})();
