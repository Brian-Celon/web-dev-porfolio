// Navigation & Mobile Menu Logic
const mobile_menu_button = document.querySelector('.mobile_menu_button');
const nav_list = document.querySelector('.nav_list');
const nav_links = document.querySelectorAll('.nav_link');

// Toggle mobile menu visibility
function toggle_mobile_menu() {
    const is_expanded = mobile_menu_button.getAttribute('aria-expanded') === 'true';
    mobile_menu_button.setAttribute('aria-expanded', !is_expanded);
    
    mobile_menu_button.classList.toggle('mobile_menu_active_btn');
    nav_list.classList.toggle('mobile_menu_active');
}

if (mobile_menu_button) {
    mobile_menu_button.addEventListener('click', toggle_mobile_menu);
}

// Close mobile menu when a navigation link is clicked
nav_links.forEach(function(link) {
    link.addEventListener('click', function() {
        if (nav_list.classList.contains('mobile_menu_active')) {
            toggle_mobile_menu();
        }
    });
});


// Theme Toggle Logic
const theme_toggle = document.getElementById('theme_toggle');
const profile_image = document.getElementById('profile_image');

function swap_profile_image(new_src) {
    if (!profile_image || profile_image.getAttribute('src') === new_src) return;
    
    profile_image.classList.add('image_fading');
    
    // Wait for the fade out transition before changing src
    setTimeout(function() {
        profile_image.src = new_src;
        
        // Remove the fade class once the new image is loaded
        profile_image.onload = function() {
            profile_image.classList.remove('image_fading');
        };
        
        // Fallback timeout in case onload doesn't trigger quickly
        setTimeout(function() {
            profile_image.classList.remove('image_fading');
        }, 150);
        
    }, 300); // matches the 0.3s CSS transition
}

function set_theme(is_dark) {
    if (is_dark) {
        document.documentElement.classList.add('dark_mode');
        localStorage.setItem('theme_preference', 'dark_mode');
        swap_profile_image('assets/Dark.jpg');
        
        if (theme_toggle) {
            theme_toggle.setAttribute('aria-label', 'switch to light mode');
        }
    } else {
        document.documentElement.classList.remove('dark_mode');
        localStorage.setItem('theme_preference', 'light_mode');
        swap_profile_image('assets/me.jpg');
        
        if (theme_toggle) {
            theme_toggle.setAttribute('aria-label', 'switch to dark mode');
        }
    }
}

if (theme_toggle) {
    // Initialize aria-label on load based on current state
    const is_currently_dark = document.documentElement.classList.contains('dark_mode');
    theme_toggle.setAttribute('aria-label', is_currently_dark ? 'switch to light mode' : 'switch to dark mode');
    
    // Listen for toggle clicks
    theme_toggle.addEventListener('click', function() {
        const is_dark = document.documentElement.classList.contains('dark_mode');
        set_theme(!is_dark);
    });
}


// Intersection Observer for Smooth Section Entrances
const entrance_animation_options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const entrance_observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('is_visible');
            // Stop observing once the animation has triggered
            observer.unobserve(entry.target);
        }
    });
}, entrance_animation_options);

const fade_in_elements = document.querySelectorAll('.fade_in_element');
fade_in_elements.forEach(function(element) {
    entrance_observer.observe(element);
});


// Active Navigation Link Highlight based on Scroll Position
const page_sections = document.querySelectorAll('.page_section');

const scroll_spy_options = {
    root: null,
    // Trigger when a section takes up roughly the middle part of the screen
    rootMargin: '-40% 0px -40% 0px',
    threshold: 0
};

const scroll_spy_observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            const active_section_id = entry.target.id;
            
            nav_links.forEach(function(link) {
                // Remove active class from all links
                link.classList.remove('active_link');
                
                // Add active class if the link's href matches the current section
                if (link.getAttribute('href') === '#' + active_section_id) {
                    link.classList.add('active_link');
                }
            });
        }
    });
}, scroll_spy_options);

page_sections.forEach(function(section) {
    scroll_spy_observer.observe(section);
});


